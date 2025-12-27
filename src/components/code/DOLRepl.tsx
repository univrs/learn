import { useState, useCallback } from 'react';
import { Play, RotateCcw, Copy, Check } from 'lucide-react';

interface DOLReplProps {
  code: string;
  title?: string;
  output?: string;
  editable?: boolean;
  showLineNumbers?: boolean;
}

export default function DOLRepl({
  code,
  title = 'DOL REPL',
  output = '',
  editable = true,
  showLineNumbers = true,
}: DOLReplProps) {
  const [source, setSource] = useState(code);
  const [result, setResult] = useState(output);
  const [isRunning, setIsRunning] = useState(false);
  const [copied, setCopied] = useState(false);

  // Simulate DOL execution
  const runCode = useCallback(() => {
    setIsRunning(true);

    // Simulate processing delay
    setTimeout(() => {
      try {
        // Parse and simulate DOL execution
        const lines = source.split('\n');
        const outputs: string[] = [];

        for (const line of lines) {
          const trimmed = line.trim();

          // Skip comments and empty lines
          if (trimmed.startsWith('//') || trimmed === '') continue;

          // Handle log() statements
          const logMatch = trimmed.match(/log\s*\(\s*(.+)\s*\)/);
          if (logMatch) {
            let value = logMatch[1].trim();
            // Handle string literals
            if ((value.startsWith('"') && value.endsWith('"')) ||
                (value.startsWith("'") && value.endsWith("'"))) {
              outputs.push(value.slice(1, -1));
            } else {
              // Handle expressions
              outputs.push(`=> ${value}`);
            }
            continue;
          }

          // Handle let bindings
          const letMatch = trimmed.match(/let\s+(\w+)\s*(?::\s*\w+)?\s*=\s*(.+)/);
          if (letMatch) {
            outputs.push(`${letMatch[1]} = ${letMatch[2].replace(/;$/, '')}`);
            continue;
          }

          // Handle function definitions (just acknowledge)
          if (trimmed.startsWith('fn ') || trimmed.startsWith('pub fn ')) {
            const fnMatch = trimmed.match(/(?:pub\s+)?fn\s+(\w+)/);
            if (fnMatch) {
              outputs.push(`fn ${fnMatch[1]} defined`);
            }
            continue;
          }

          // Handle entity definitions
          if (trimmed.startsWith('entity ')) {
            const entityMatch = trimmed.match(/entity\s+(\w+)/);
            if (entityMatch) {
              outputs.push(`entity ${entityMatch[1]} defined`);
            }
            continue;
          }
        }

        setResult(outputs.length > 0 ? outputs.join('\n') : '// No output');
      } catch (err) {
        setResult(`Error: ${err instanceof Error ? err.message : 'Unknown error'}`);
      }
      setIsRunning(false);
    }, 300);
  }, [source]);

  const resetCode = useCallback(() => {
    setSource(code);
    setResult(output);
  }, [code, output]);

  const copyCode = useCallback(async () => {
    await navigator.clipboard.writeText(source);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [source]);

  const formatLineNumbers = (text: string) => {
    return text.split('\n').map((_, i) => i + 1).join('\n');
  };

  return (
    <div
      className="rounded-xl overflow-hidden my-6"
      style={{
        backgroundColor: 'var(--bg-tertiary)',
        border: '1px solid var(--border-subtle)',
      }}
    >
      {/* Header */}
      <div
        className="px-4 py-2 flex items-center justify-between"
        style={{ borderBottom: '1px solid var(--border-subtle)' }}
      >
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#ff5f56' }} />
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#ffbd2e' }} />
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#27c93f' }} />
          </div>
          <span
            className="text-xs font-mono"
            style={{ color: 'var(--soft-gray)' }}
          >
            {title}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={copyCode}
            className="p-1.5 rounded hover:bg-white/10 transition-colors"
            title="Copy code"
          >
            {copied ? (
              <Check className="w-4 h-4" style={{ color: 'var(--glow-cyan)' }} />
            ) : (
              <Copy className="w-4 h-4" style={{ color: 'var(--soft-gray)' }} />
            )}
          </button>
          <button
            onClick={resetCode}
            className="p-1.5 rounded hover:bg-white/10 transition-colors"
            title="Reset code"
          >
            <RotateCcw className="w-4 h-4" style={{ color: 'var(--soft-gray)' }} />
          </button>
          <button
            onClick={runCode}
            disabled={isRunning}
            className="flex items-center gap-1.5 px-3 py-1 rounded text-xs font-medium transition-all"
            style={{
              backgroundColor: isRunning ? 'var(--glow-cyan-dim)' : 'var(--glow-cyan)',
              color: 'var(--void)',
            }}
          >
            <Play className="w-3 h-3" />
            {isRunning ? 'Running...' : 'Run'}
          </button>
        </div>
      </div>

      {/* Code Editor */}
      <div className="flex">
        {showLineNumbers && (
          <pre
            className="py-4 pl-4 pr-2 text-xs font-mono text-right select-none"
            style={{ color: 'var(--soft-gray)', opacity: 0.5 }}
          >
            {formatLineNumbers(source)}
          </pre>
        )}
        <textarea
          value={source}
          onChange={(e) => editable && setSource(e.target.value)}
          readOnly={!editable}
          className="flex-1 p-4 text-sm font-mono bg-transparent resize-none focus:outline-none"
          style={{
            color: 'var(--glow-cyan)',
            minHeight: '120px',
            caretColor: 'var(--glow-cyan)',
          }}
          spellCheck={false}
        />
      </div>

      {/* Output */}
      {result && (
        <div
          style={{
            borderTop: '1px solid var(--border-subtle)',
            backgroundColor: 'var(--void)',
          }}
        >
          <div
            className="px-4 py-1 text-xs"
            style={{ color: 'var(--soft-gray)', borderBottom: '1px solid var(--border-subtle)' }}
          >
            Output
          </div>
          <pre
            className="p-4 text-sm font-mono overflow-x-auto"
            style={{ color: 'var(--glow-gold)' }}
          >
            {result}
          </pre>
        </div>
      )}
    </div>
  );
}
