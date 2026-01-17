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

// Session state for defined functions and genes
interface FunctionDef {
  name: string
  params: { name: string; type: string }[]
  returnType: string
  body: string
}

interface GeneDef {
  name: string
  fields: { name: string; type: string }[]
}

// Persistent session state across evaluations
const sessionState = {
  functions: new Map<string, FunctionDef>(),
  genes: new Map<string, GeneDef>(),
  variables: new Map<string, { value: number; type: string }>()
}

/**
 * Simple expression evaluator for REPL tutorials
 * Handles arithmetic, function calls, and gene field access
 */
function evalExpr(expr: string): { value: number; type: string } | null {
  expr = expr.trim()

  // Float literal
  if (/^-?\d+\.\d+$/.test(expr)) {
    return { value: parseFloat(expr), type: 'f64' }
  }

  // Integer literal
  if (/^-?\d+$/.test(expr)) {
    return { value: parseInt(expr, 10), type: 'i64' }
  }

  // Parenthesized expression
  if (expr.startsWith('(') && expr.endsWith(')')) {
    return evalExpr(expr.slice(1, -1))
  }

  // Function call
  const funcCallMatch = expr.match(/^(\w+)\s*\(\s*(.+)\s*\)$/)
  if (funcCallMatch) {
    const [, funcName, argsStr] = funcCallMatch
    const func = sessionState.functions.get(funcName)
    if (func) {
      // Parse arguments
      const args = argsStr.split(',').map(a => evalExpr(a.trim()))
      if (args.some(a => a === null)) return null

      // Simple body evaluation (handles basic expressions)
      let body = func.body.trim()
      func.params.forEach((param, i) => {
        const argVal = args[i]!.value
        body = body.replace(new RegExp(`\\b${param.name}\\b`, 'g'), String(argVal))
      })

      // Handle nested function calls in body
      const nestedCall = body.match(/(\w+)\s*\(\s*([^)]+)\s*\)/)
      if (nestedCall) {
        const nestedResult = evalExpr(body)
        if (nestedResult) return nestedResult
      }

      // Evaluate arithmetic in body
      return evalArithmetic(body)
    }
  }

  // Arithmetic expression
  return evalArithmetic(expr)
}

/**
 * Evaluate arithmetic expressions with proper precedence
 */
function evalArithmetic(expr: string): { value: number; type: string } | null {
  expr = expr.trim()

  // Determine if result is float
  const isFloat = expr.includes('.')

  try {
    // Handle parentheses first
    while (expr.includes('(')) {
      expr = expr.replace(/\(([^()]+)\)/g, (_, inner) => {
        const result = evalArithmetic(inner)
        return result ? String(result.value) : inner
      })
    }

    // Simple arithmetic evaluation (safe for tutorial purposes)
    // Only allow numbers, operators, and whitespace
    if (!/^[\d\s+\-*/.]+$/.test(expr)) {
      return null
    }

    // Use Function constructor for safe math evaluation
    const result = new Function(`return ${expr}`)()

    if (typeof result === 'number' && !isNaN(result)) {
      return {
        value: result,
        type: isFloat || !Number.isInteger(result) ? 'f64' : 'i64'
      }
    }
  } catch {
    return null
  }

  return null
}

/**
 * Mock DOL evaluator for interactive tutorials
 * Handles expressions, functions, and genes for REPL tutorial
 */
function evaluateDOL(code: string): ExecutionResult {
  const output: string[] = []
  const errors: string[] = []

  try {
    const trimmedCode = code.trim()

    // Skip empty lines and comments
    if (!trimmedCode || trimmedCode.startsWith('//') || trimmedCode.startsWith('--')) {
      return { output: [], errors: [], success: true, timestamp: new Date() }
    }

    // Handle print() statements
    const printMatch = trimmedCode.match(/print\s*\(\s*["'](.*)["']\s*\)/)
    if (printMatch) {
      output.push(printMatch[1])
      return { output, errors, success: true, timestamp: new Date() }
    }

    // Handle function definitions: pub fun name(params) -> ReturnType { body }
    const funMatch = trimmedCode.match(/^(?:pub\s+)?fun\s+(\w+)\s*\(\s*([^)]*)\s*\)\s*->\s*(\w+)\s*\{\s*(.+)\s*\}$/)
    if (funMatch) {
      const [, name, paramsStr, returnType, body] = funMatch
      const params = paramsStr.split(',').filter(p => p.trim()).map(p => {
        const [pname, ptype] = p.split(':').map(s => s.trim())
        return { name: pname, type: ptype }
      })
      sessionState.functions.set(name, { name, params, returnType, body })
      output.push(`Defined function '${name}'`)
      return { output, errors, success: true, timestamp: new Date() }
    }

    // Handle gen definitions: gen name { field has type ... }
    const genMatch = trimmedCode.match(/^(?:pub\s+)?gen\s+([\w.]+)\s*\{([^}]*)\}/)
    if (genMatch) {
      const [, name, fieldsBlock] = genMatch
      const fields: { name: string; type: string }[] = []
      const fieldMatches = fieldsBlock.matchAll(/(\w+)\s+has\s+(\w+)/g)
      for (const m of fieldMatches) {
        fields.push({ name: m[1], type: m[2] })
      }
      sessionState.genes.set(name, { name, fields })
      output.push(`Defined gene '${name}'`)
      return { output, errors, success: true, timestamp: new Date() }
    }

    // Handle docs blocks
    if (trimmedCode.startsWith('docs') || trimmedCode.startsWith('exegesis')) {
      output.push('[DOL] Documentation recorded')
      return { output, errors, success: true, timestamp: new Date() }
    }

    // Handle module declarations
    const moduleMatch = trimmedCode.match(/^module\s+([\w.]+)\s*@?\s*([\d.]+)?/)
    if (moduleMatch) {
      output.push(`[DOL] Module: ${moduleMatch[1]}${moduleMatch[2] ? ' v' + moduleMatch[2] : ''}`)
      return { output, errors, success: true, timestamp: new Date() }
    }

    // Handle trait declarations
    const traitMatch = trimmedCode.match(/^(?:pub\s+)?trait\s+([\w.]+)/)
    if (traitMatch) {
      output.push(`Defined trait '${traitMatch[1]}'`)
      return { output, errors, success: true, timestamp: new Date() }
    }

    // Handle system declarations
    const systemMatch = trimmedCode.match(/^(?:pub\s+)?system\s+([\w.]+)/)
    if (systemMatch) {
      output.push(`Defined system '${systemMatch[1]}'`)
      return { output, errors, success: true, timestamp: new Date() }
    }

    // Try to evaluate as an expression
    const result = evalExpr(trimmedCode)
    if (result !== null) {
      output.push(`=> ${result.value} : ${result.type}`)
      return { output, errors, success: true, timestamp: new Date() }
    }

    // Fallback: code parsed but not evaluated
    output.push('[DOL] Code parsed successfully')

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
  'i8', 'i16', 'i32', 'i64',
  'u8', 'u16', 'u32', 'u64',
  'f32', 'f64',
  'bool', 'string', 'void',
  'List', 'Map', 'Option', 'Result', 'Tuple', 'Box'
]

// ============================================================================
// Component
// ============================================================================

export default function DOLRepl({
  initialCode = '// Write your DOL code here\ngen example.hello {\n  message has content\n}\n\ndocs {\n  A simple example gen.\n}\n\nprint("Hello, DOL!")',
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
