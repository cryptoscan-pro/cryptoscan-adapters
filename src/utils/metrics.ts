let messageCounters = new Map<number, number>();
let totalMessages = 0;

export function incrementCounter(port: number) {
    const current = messageCounters.get(port) || 0;
    messageCounters.set(port, current + 1);
    totalMessages++;

    // Send metrics to primary process
    if (process.send) {
        process.send({ type: 'metrics', port, count: 1 });
    }
}

export function getAndResetMetrics() {
    const metrics = {
        byPort: Object.fromEntries(messageCounters),
        total: Number(totalMessages)
    };
    
    messageCounters = new Map<number, number>();
    totalMessages = 0;
    
    return metrics;
}
