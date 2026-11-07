import * as readline from 'readline';
import * as util from 'util';
import * as vm from 'vm';

const PROMPT = '> ';
const CONTINUE_PROMPT = '... ';

class Repl {
  private rl: readline.Interface;
  private buffer: string[] = [];
  private context: vm.Context;
  private braceDepth = 0;

  constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: PROMPT,
      terminal: true,
    });

    // Persistent context so variables survive between evaluations
    this.context = vm.createContext({
      console,
      process,
      require,
      setTimeout,
      setInterval,
      clearTimeout,
      clearInterval,
      Buffer,
      __dirname: process.cwd(),
      __filename: 'repl',
    });

    // Expose a helper to clear context
    vm.runInContext(
      `globalThis.clearCtx = () => { for (const k of Object.keys(globalThis)) { if (!['console','process','require','setTimeout','setInterval','clearTimeout','clearInterval','Buffer','clearCtx'].includes(k)) { try { delete globalThis[k]; } catch {} } } };`,
      this.context
    );

    this.rl.on('line', (line) => this.handleLine(line));
    this.rl.on('close', () => {
      console.log('\nGoodbye!');
      process.exit(0);
    });
  }

  public start(): void {
    console.log('TypeScript/Node REPL — type .help for commands, .exit to quit.');
    this.rl.prompt();
  }

  private handleLine(line: string): void {
    // Meta-commands only when buffer is empty
    if (this.buffer.length === 0 && line.startsWith('.')) {
      this.handleCommand(line.trim());
      return;
    }

    this.buffer.push(line);
    this.braceDepth += this.countBraces(line);

    // If we still have unclosed braces/brackets/parens, keep reading
    if (this.braceDepth > 0) {
      this.rl.setPrompt(CONTINUE_PROMPT);
      this.rl.prompt();
      return;
    }

    const source = this.buffer.join('\n');
    this.buffer = [];
    this.braceDepth = 0;
    this.rl.setPrompt(PROMPT);

    this.evaluate(source);
    this.rl.prompt();
  }

  private handleCommand(cmd: string): void {
    switch (cmd) {
      case '.help':
        console.log(`Commands:
  .help   show this help
  .exit   quit the REPL
  .clear  clear the execution context
  .reset  same as .clear
Note: press Ctrl+C to interrupt, Ctrl+D to exit.`);
        break;
      case '.exit':
      case '.quit':
        this.rl.close();
        return;
      case '.clear':
      case '.reset':
        vm.runInContext('clearCtx()', this.context);
        console.log('Context cleared.');
        break;
      default:
        console.log(`Unknown command: ${cmd}`);
    }
    this.rl.prompt();
  }

  private evaluate(source: string): void {
    try {
      const script = new vm.Script(source, { filename: 'repl' });
      const result = script.runInContext(this.context, { displayErrors: true });

      if (result !== undefined) {
        console.log(util.inspect(result, { colors: true, depth: 4 }));
      }
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.stack ?? err.message);
      } else {
        console.error(err);
      }
    }
  }

  /** Count unbalanced braces/brackets/parens (crude but effective for multiline). */
  private countBraces(line: string): number {
    let depth = 0;
    let inString: string | null = null;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      const prev = i > 0 ? line[i - 1] : '';
      if (inString) {
        if (ch === inString && prev !== '\\') inString = null;
        continue;
      }
      if (ch === '"' || ch === "'" || ch === '`') {
        inString = ch;
      } else if (ch === '{' || ch === '[' || ch === '(') {
        depth++;
      } else if (ch === '}' || ch === ']' || ch === ')') {
        depth--;
      }
    }
    return depth;
  }
}

new Repl().start();