/**
 * Robust error handling and error wrapping for Drizzle ORM
 * Preserves the original cause, query SQL, parameters, and full stack trace.
 */

export class DrizzleError extends Error {
  readonly cause?: unknown;

  constructor(message: string, cause?: unknown) {
    super(message);
    this.name = 'DrizzleError';
    this.cause = cause;

    if (cause instanceof Error && cause.stack) {
      this.stack = `${this.stack}\nCaused by: ${cause.stack}`;
    }
  }
}

export class DrizzleQueryError extends DrizzleError {
  readonly query?: string;
  readonly params?: unknown[];

  constructor(message: string, options: { cause?: unknown; query?: string; params?: unknown[] }) {
    super(message, options.cause);
    this.name = 'DrizzleQueryError';
    this.query = options.query;
    this.params = options.params;
  }
}

export class DrizzleTransactionError extends DrizzleError {
  constructor(message: string, cause?: unknown) {
    super(message, cause);
    this.name = 'DrizzleTransactionError';
  }
}