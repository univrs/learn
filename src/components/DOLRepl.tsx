import { useState, useEffect, useRef, useCallback } from 'react'
import { getHighlighter, type Highlighter } from 'shiki'
import { Play, RotateCcw, CheckCircle, XCircle, History, Copy, Check } from 'lucide-react'
import { cn } from '../lib/utils'
import '../styles/repl.css'

// Theme type for Shiki 0.14.x
type ShikiTheme = 'github-dark' | 'github-light'

// ============================================================================
// Types
// ============================================================================

interface ExecutionResult {
  output: string[]
  errors: string[]
  success: boolean
  timestamp: Date
}

interface HistoryEntry {
  code: string
  result: ExecutionResult
  timestamp: Date
}

interface DOLReplProps {
  /** Initial code to display in the editor */
  initialCode?: string
  /** Expected output for validation (optional) */
  expectedOutput?: string
  /** Whether the REPL is read-only (view-only mode) */
  readOnly?: boolean
  /** Title to display above the REPL */
  title?: string
  /** Description text */
  description?: string
  /** Custom height for the editor area */
  height?: string
  /** Callback when code is executed */
  onExecute?: (result: ExecutionResult) => void
  /** Show/hide history panel */
  showHistory?: boolean
}

// ============================================================================
// Mock DOL Evaluator
// ============================================================================

/**
 * Mock DOL evaluator for interactive tutorials
 * This will be replaced by actual DOL WASM bindings in the future
 */
function evaluateDOL(code: string): ExecutionResult {
  const output: string[] = []
  const errors: string[] = []

  try {
    const lines = code.split('\n')
    let inBlock = false
    let blockType = ''
    let blockName = ''
    let braceCount = 0

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim()
      const lineNum = i + 1

      // Skip empty lines and comments
      if (!line || line.startsWith('//') || line.startsWith('--')) {
        continue
      }

      // Handle print() statements - the REAL DOL builtin
      const printMatch = line.match(/print\s*\(\s*["'](.*)["']\s*\)/)
      if (printMatch) {
        output.push(printMatch[1])
        continue
      }

      // Handle module declarations
      const moduleMatch = line.match(/^module\s+([\w.]+)\s*@?\s*([\d.]+)?/)
      if (moduleMatch) {
        output.push(`[DOL] Module: ${moduleMatch[1]}${moduleMatch[2] ? ' v' + moduleMatch[2] : ''}`)
        continue
      }

      // Handle gen declarations
      const geneMatch = line.match(/^(?:pub\s+)?gene\s+([\w.<>]+)\s*\{?/)
      if (geneMatch) {
        inBlock = true
        blockType = 'gene'
        blockName = geneMatch[1]
        braceCount = (line.match(/\{/g) || []).length - (line.match(/\}/g) || []).length
        output.push(`[DOL] Defining gene: ${blockName}`)
        continue
      }

      // Handle trait declarations
      const traitMatch = line.match(/^(?:pub\s+)?trait\s+([\w.]+)\s*\{?/)
      if (traitMatch) {
        inBlock = true
        blockType = 'trait'
        blockName = traitMatch[1]
        braceCount = (line.match(/\{/g) || []).length - (line.match(/\}/g) || []).length
        output.push(`[DOL] Defining trait: ${blockName}`)
        continue
      }

      // Handle constraint declarations
      const constraintMatch = line.match(/^constraint\s+([\w.]+)\s*\{?/)
      if (constraintMatch) {
        inBlock = true
        blockType = 'constraint'
        blockName = constraintMatch[1]
        braceCount = (line.match(/\{/g) || []).length - (line.match(/\}/g) || []).length
        output.push(`[DOL] Adding constraint: ${blockName}`)
        continue
      }

      // Handle system declarations
      const systemMatch = line.match(/^(?:pub\s+)?system\s+([\w.]+)\s*@?([\d.]+)?\s*\{?/)
      if (systemMatch) {
        inBlock = true
        blockType = 'system'
        blockName = systemMatch[1]
        braceCount = (line.match(/\{/g) || []).length - (line.match(/\}/g) || []).length
        output.push(`[DOL] Defining system: ${blockName}${systemMatch[2] ? ' v' + systemMatch[2] : ''}`)
        continue
      }

      // Handle function declarations
      const funMatch = line.match(/^(?:pub\s+)?(?:sex\s+)?fun\s+(\w+)/)
      if (funMatch) {
        output.push(`[DOL] Defining function: ${funMatch[1]}`)
        braceCount += (line.match(/\{/g) || []).length - (line.match(/\}/g) || []).length
        continue
      }

      // Handle exegesis blocks
      const exegesisMatch = line.match(/^exegesis\s*\{?/)
      if (exegesisMatch) {
        inBlock = true
        blockType = 'exegesis'
        braceCount = (line.match(/\{/g) || []).length - (line.match(/\}/g) || []).length
        continue
      }

      // Handle test blocks
      const testMatch = line.match(/^test\s+["'](.+)["']\s*\{?/)
      if (testMatch) {
        output.push(`[DOL] Running test: ${testMatch[1]}`)
        braceCount += (line.match(/\{/g) || []).length - (line.match(/\}/g) || []).length
        continue
      }

      // Track brace depth
      const openBraces = (line.match(/\{/g) || []).length
      const closeBraces = (line.match(/\}/g) || []).length
      braceCount += openBraces - closeBraces

      if (braceCount === 0 && inBlock && closeBraces > 0) {
        if (blockType !== 'exegesis') {
          output.push(`[DOL] ${blockType.charAt(0).toUpperCase() + blockType.slice(1)} ${blockName} validated`)
        }
        inBlock = false
        blockType = ''
        blockName = ''
      }

      // Detect potential syntax errors
      if (line.includes(';;')) {
        errors.push(`Syntax warning at line ${lineNum}: Double semicolon`)
      }
    }

    // Add completion message if no output yet
    if (output.length === 0 && errors.length === 0) {
      output.push('[DOL] Code parsed successfully')
    }

  } catch (e) {
    errors.push(`Runtime error: ${e instanceof Error ? e.message : 'Unknown error'}`)
  }

  return {
    output,
    errors,
    success: errors.length === 0,
    timestamp: new Date()
  }
}

// ============================================================================
// DOL Language Definition for Shiki
// ============================================================================

// Custom DOL syntax highlighting tokens - GROUNDED in real DOL grammar
const DOL_KEYWORDS = [
  // Core declarations
  'gene', 'trait', 'constraint', 'system', 'evolves', 'exegesis',
  // Predicates
  'has', 'is', 'derives', 'from', 'requires', 'uses', 'emits', 'matches', 'never',
  // Control flow
  'if', 'else', 'match', 'for', 'while', 'loop', 'break', 'continue', 'return', 'in',
  // Functions
  'fun', 'pub', 'let', 'var', 'const', 'mut',
  // Logic
  'implies', 'forall', 'exists', 'not',
  // Other
  'module', 'use', 'impl', 'as', 'state', 'law', 'sex', 'each', 'all', 'no',
  // Built-ins
  'print', 'typeof', 'len',
  // Literals
  'true', 'false', 'null'
]

const DOL_TYPES = [
  'Int8', 'Int16', 'Int32', 'Int64',
  'UInt8', 'UInt16', 'UInt32', 'UInt64',
  'Float32', 'Float64',
  'Bool', 'String', 'Void',
  'List', 'Map', 'Option', 'Result', 'Tuple', 'Box'
]

// ============================================================================
// Component
// ============================================================================

export default function DOLRepl({
  initialCode = '// Write your DOL code here\ngene example.hello {\n  message has content\n}\n\nexegesis {\n  A simple example gene.\n}\n\nprint("Hello, DOL!")',
  expectedOutput,
  readOnly = false,
  title,
  description,
  height = '300px',
  onExecute,
  showHistory = true
}: DOLReplProps) {
  const [code, setCode] = useState(initialCode)
  const [result, setResult] = useState<ExecutionResult | null>(null)
  const [history, setHistory] = useState<HistoryEntry[]>([])
  const [showHistoryPanel, setShowHistoryPanel] = useState(false)
  const [highlighter, setHighlighter] = useState<Highlighter | null>(null)
  const [highlightedCode, setHighlightedCode] = useState<string>('')
  const [isValidated, setIsValidated] = useState<boolean | null>(null)
  const [copied, setCopied] = useState(false)
  const [isRunning, setIsRunning] = useState(false)

  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const preRef = useRef<HTMLPreElement>(null)

  // Initialize Shiki highlighter
  useEffect(() => {
    let mounted = true

    getHighlighter({
      themes: ['github-dark', 'github-light'],
      langs: ['typescript'] // Use TypeScript as base, closest to DOL
    }).then((hl) => {
      if (mounted) {
        setHighlighter(hl)
      }
    }).catch(console.error)

    return () => {
      mounted = false
    }
  }, [])

  // Update syntax highlighting when code changes
  useEffect(() => {
    if (!highlighter) {
      // Fallback without highlighting
      setHighlightedCode(escapeHtml(code))
      return
    }

    try {
      // Apply custom DOL highlighting on top of TypeScript base
      const theme: ShikiTheme = document.documentElement.getAttribute('data-theme') === 'light'
        ? 'github-light'
        : 'github-dark'

      const html = highlighter.codeToHtml(code, {
        lang: 'typescript',
        theme
      })

      // Post-process to add DOL-specific highlighting
      let processed = html

      // Highlight DOL keywords
      DOL_KEYWORDS.forEach(keyword => {
        const regex = new RegExp(`\\b(${keyword})\\b`, 'g')
        processed = processed.replace(regex, `<span class="dol-keyword">$1</span>`)
      })

      // Highlight DOL types
      DOL_TYPES.forEach(type => {
        const regex = new RegExp(`\\b(${type})\\b`, 'g')
        processed = processed.replace(regex, `<span class="dol-type">$1</span>`)
      })

      setHighlightedCode(processed)
    } catch {
      setHighlightedCode(escapeHtml(code))
    }
  }, [code, highlighter])

  // Validate output against expected
  useEffect(() => {
    if (!result || !expectedOutput) {
      setIsValidated(null)
      return
    }

    const actualOutput = result.output.join('\n').trim()
    const expected = expectedOutput.trim()
    setIsValidated(actualOutput.includes(expected) || actualOutput === expected)
  }, [result, expectedOutput])

  // Sync scroll between textarea and pre
  const handleScroll = useCallback(() => {
    if (textareaRef.current && preRef.current) {
      preRef.current.scrollTop = textareaRef.current.scrollTop
      preRef.current.scrollLeft = textareaRef.current.scrollLeft
    }
  }, [])

  // Execute code
  const runCode = useCallback(() => {
    if (readOnly) return

    setIsRunning(true)

    // Small delay to show running state
    setTimeout(() => {
      const executionResult = evaluateDOL(code)
      setResult(executionResult)

      // Add to history
      setHistory(prev => [
        { code, result: executionResult, timestamp: new Date() },
        ...prev.slice(0, 9) // Keep last 10 entries
      ])

      onExecute?.(executionResult)
      setIsRunning(false)
    }, 100)
  }, [code, readOnly, onExecute])

  // Reset code to initial
  const resetCode = useCallback(() => {
    setCode(initialCode)
    setResult(null)
    setIsValidated(null)
  }, [initialCode])

  // Copy code to clipboard
  const copyCode = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      console.error('Failed to copy code')
    }
  }, [code])

  // Load from history
  const loadFromHistory = useCallback((entry: HistoryEntry) => {
    setCode(entry.code)
    setResult(entry.result)
    setShowHistoryPanel(false)
  }, [])

  // Handle keyboard shortcuts
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    // Cmd/Ctrl + Enter to run
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault()
      runCode()
    }

    // Tab handling for indentation
    if (e.key === 'Tab' && !readOnly) {
      e.preventDefault()
      const target = e.target as HTMLTextAreaElement
      const start = target.selectionStart
      const end = target.selectionEnd

      const newCode = code.substring(0, start) + '  ' + code.substring(end)
      setCode(newCode)

      // Restore cursor position
      setTimeout(() => {
        target.selectionStart = target.selectionEnd = start + 2
      }, 0)
    }
  }, [code, readOnly, runCode])

  return (
    <div className="dol-repl">
      {/* Header */}
      {(title || description) && (
        <div className="dol-repl-header">
          {title && <h3 className="dol-repl-title">{title}</h3>}
          {description && <p className="dol-repl-description">{description}</p>}
        </div>
      )}

      {/* Toolbar */}
      <div className="dol-repl-toolbar">
        <div className="dol-repl-toolbar-left">
          <span className="dol-repl-badge">DOL</span>
          {readOnly && <span className="dol-repl-badge dol-repl-badge-muted">Read Only</span>}
          {expectedOutput && (
            <span className={cn(
              'dol-repl-badge',
              isValidated === true && 'dol-repl-badge-success',
              isValidated === false && 'dol-repl-badge-error'
            )}>
              {isValidated === null && 'Validate'}
              {isValidated === true && 'Passed'}
              {isValidated === false && 'Failed'}
            </span>
          )}
        </div>

        <div className="dol-repl-toolbar-right">
          <button
            onClick={copyCode}
            className="dol-repl-btn dol-repl-btn-icon"
            title="Copy code"
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
          </button>

          {showHistory && history.length > 0 && (
            <button
              onClick={() => setShowHistoryPanel(!showHistoryPanel)}
              className={cn('dol-repl-btn dol-repl-btn-icon', showHistoryPanel && 'active')}
              title="Show history"
            >
              <History size={16} />
            </button>
          )}

          {!readOnly && (
            <>
              <button
                onClick={resetCode}
                className="dol-repl-btn dol-repl-btn-icon"
                title="Reset code"
              >
                <RotateCcw size={16} />
              </button>

              <button
                onClick={runCode}
                disabled={isRunning}
                className="dol-repl-btn dol-repl-btn-primary"
                title="Run code (Cmd+Enter)"
              >
                <Play size={16} />
                <span>{isRunning ? 'Running...' : 'Run'}</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Editor */}
      <div className="dol-repl-editor-container" style={{ height }}>
        <div className="dol-repl-editor">
          {/* Line numbers */}
          <div className="dol-repl-line-numbers">
            {code.split('\n').map((_, i) => (
              <span key={i}>{i + 1}</span>
            ))}
          </div>

          {/* Code display with syntax highlighting */}
          <pre
            ref={preRef}
            className="dol-repl-pre"
            aria-hidden="true"
            dangerouslySetInnerHTML={{ __html: highlightedCode + '\n' }}
          />

          {/* Textarea for editing */}
          <textarea
            ref={textareaRef}
            value={code}
            onChange={(e) => !readOnly && setCode(e.target.value)}
            onScroll={handleScroll}
            onKeyDown={handleKeyDown}
            readOnly={readOnly}
            className="dol-repl-textarea"
            spellCheck={false}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            placeholder="// Write your DOL code here..."
          />
        </div>
      </div>

      {/* History Panel */}
      {showHistoryPanel && history.length > 0 && (
        <div className="dol-repl-history">
          <h4 className="dol-repl-history-title">Execution History</h4>
          <div className="dol-repl-history-list">
            {history.map((entry, i) => (
              <button
                key={i}
                onClick={() => loadFromHistory(entry)}
                className="dol-repl-history-item"
              >
                <div className="dol-repl-history-item-header">
                  {entry.result.success ? (
                    <CheckCircle size={14} className="text-success" />
                  ) : (
                    <XCircle size={14} className="text-error" />
                  )}
                  <span className="dol-repl-history-time">
                    {entry.timestamp.toLocaleTimeString()}
                  </span>
                </div>
                <code className="dol-repl-history-code">
                  {entry.code.substring(0, 50)}
                  {entry.code.length > 50 && '...'}
                </code>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Output Panel */}
      {result && (
        <div className="dol-repl-output">
          {/* Output */}
          {result.output.length > 0 && (
            <div className="dol-repl-output-section">
              <h4 className="dol-repl-output-title">
                <CheckCircle size={16} className="text-success" />
                Output
              </h4>
              <pre className="dol-repl-output-content">
                {result.output.map((line, i) => (
                  <div key={i} className="dol-repl-output-line">{line}</div>
                ))}
              </pre>
            </div>
          )}

          {/* Errors */}
          {result.errors.length > 0 && (
            <div className="dol-repl-output-section dol-repl-output-error">
              <h4 className="dol-repl-output-title">
                <XCircle size={16} className="text-error" />
                Errors
              </h4>
              <pre className="dol-repl-output-content">
                {result.errors.map((error, i) => (
                  <div key={i} className="dol-repl-error-line">{error}</div>
                ))}
              </pre>
            </div>
          )}

          {/* Validation result */}
          {expectedOutput && isValidated !== null && (
            <div className={cn(
              'dol-repl-validation',
              isValidated ? 'dol-repl-validation-success' : 'dol-repl-validation-error'
            )}>
              {isValidated ? (
                <>
                  <CheckCircle size={18} />
                  <span>Output matches expected result!</span>
                </>
              ) : (
                <>
                  <XCircle size={18} />
                  <span>Output does not match. Expected: "{expectedOutput}"</span>
                </>
              )}
            </div>
          )}
        </div>
      )}

      {/* Footer hint */}
      {!readOnly && (
        <div className="dol-repl-footer">
          <kbd>Cmd</kbd> + <kbd>Enter</kbd> to run
          <span className="dol-repl-footer-divider">|</span>
          <span className="dol-repl-footer-note">
            Mock evaluator - WASM integration coming soon
          </span>
        </div>
      )}
    </div>
  )
}

// ============================================================================
// Utility Functions
// ============================================================================

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

// ============================================================================
// Exports
// ============================================================================

export type { DOLReplProps, ExecutionResult, HistoryEntry }
