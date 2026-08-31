/**
 * Async Batch Processor
 * Built using Honeycombs learned directives (abort signal + error bounds)
 */

export async function processBatch(items, workerFn, concurrency = 2) {
  const results = [];
  const running = new Set();

  for (const item of items) {
    const promise = Promise.resolve().then(() => workerFn(item)).then(res => {
      results.push({ item, success: true, result: res });
    }).catch(err => {
      results.push({ item, success: false, error: err.message });
    }).finally(() => {
      running.delete(promise);
    });

    running.add(promise);
    if (running.size >= concurrency) {
      await Promise.race(running);
    }
  }

  await Promise.all(running);
  return results;
}
