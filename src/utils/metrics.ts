let messageCounters = new Map<number, number>();
let totalMessages = 0;

export function incrementCounter(port: number) {
    const current = messageCounters.get(port) || 0;
    messageCounters.set(port, current + 1);
    totalMessages++;
}

export function getAndResetMetrics() {
    const metrics = {
        byPort: Object.fromEntries(messageCounters),
        total: totalMessages
    };
    
    messageCounters = new Map<number, number>();
    totalMessages = 0;
    
    return metrics;
}
