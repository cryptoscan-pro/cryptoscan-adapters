import cluster from "cluster";
import { logger } from "./utils/logger";

// Add structures for storing metrics in primary process
const primaryMetrics = new Map<number, number>();
let primaryTotalMessages = 0;

export function setupCluster(ports: number[]) {
    if (cluster.isPrimary) {
        logger.info(`Primary ${process.pid} is running`);

        // Clear metrics on startup
        primaryMetrics.clear();
        primaryTotalMessages = 0;

        ports.forEach((port, index) => {
            cluster.fork({ WORKER_PORT: port });
            logger.info(`Started worker for port ${port}`);
            // Initialize counters for each port
            primaryMetrics.set(port, 0);
        });

        // Handle messages from workers
        cluster.on('message', (worker, message) => {
            if (message.type === 'metrics') {
                const currentCount = primaryMetrics.get(message.port) || 0;
                primaryMetrics.set(message.port, currentCount + message.count);
                primaryTotalMessages += message.count;
            }
        });

        cluster.on("exit", (worker, code, signal) => {
            logger.info(`Worker ${worker.process.pid} died`);
        });

        // Log metrics every 5 seconds
        setInterval(() => {
            // Log metrics for each port
            for (const [port, count] of primaryMetrics.entries()) {
                logger.info('Port message processing metrics', { port, count });
            }
            
            // Log total count
            logger.info('Total message processing metrics', { count: primaryTotalMessages });

            // Reset counters
            primaryMetrics.clear();
            ports.forEach(port => primaryMetrics.set(port, 0));
            primaryTotalMessages = 0;
        }, 5000);
    }

    return !cluster.isPrimary;
}
