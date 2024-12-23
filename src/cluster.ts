import cluster from "cluster";
import { logger } from "./utils/logger";
import { getAndResetMetrics } from "./utils/metrics";

export function setupCluster(ports: number[]) {
    if (cluster.isPrimary) {
        logger.info(`Primary ${process.pid} is running`);

        ports.forEach((port, index) => {
            cluster.fork({ WORKER_PORT: port });
            logger.info(`Started worker for port ${port}`);
        });

        cluster.on("exit", (worker, code, signal) => {
            logger.info(`Worker ${worker.process.pid} died`);
        });

        // Add metrics logging interval
        setInterval(() => {
            const metrics = getAndResetMetrics();
            
            // Separate log for each port
            Object.entries(metrics.byPort).forEach(([port, count]) => {
                logger.info(`Port ${port} processed ${count} messages in last 5 seconds`);
            });
            
            // Separate log for total count
            logger.info(`Total processed ${metrics.total} messages in last 5 seconds`);
        }, 5000);
    }

    return !cluster.isPrimary;
}
