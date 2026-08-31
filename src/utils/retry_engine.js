
export async function withRetry(fn, options = {}) {
  const { maxRetries = 3, baseDelayMs = 100 } = options;
  let attempt = 0;

  while (true) {
    try {
      return await fn();
    } catch (err) {
      attempt++;
      if (attempt >= maxRetries) throw err;
      if (options.signal?.aborted) {
        throw new Error("Operation aborted by AbortSignal.");
      }
      const jitter = Math.random() * 25;
      const delay = baseDelayMs * Math.pow(2, attempt) + jitter;
      await new Promise((resolve, reject) => {
        const timer = setTimeout(resolve, delay);
        if (options.signal) {
          options.signal.addEventListener("abort", () => {
            clearTimeout(timer);
            reject(new Error("Operation aborted by AbortSignal."));
          }, { once: true });
        }
      });
    }
  }
}
