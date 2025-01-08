import cluster from "cluster";
import { logger } from "./utils/logger";

export function setupCluster(ports: number[]) {
    if (cluster.isPrimary) {
        logger.info(`Primary ${process.pid} is running`);

        ports.forEach((port, index) => {
            cluster.fork({ WORKER_PORT: port });
            logger.info(`Started worker for port ${port}`);
        });

        // Handle messages from workers
        cluster.on('message', (worker, message) => {
            if (message.type === 'metrics') {
                logger.info('Received message', { 
                    port: message.port, 
                    count: message.count,
                    workerPid: worker.process.pid 
                });
            }
        });

        cluster.on("exit", (worker, code, signal) => {
            logger.info(`Worker ${worker.process.pid} died`);
        });
    }

    return !cluster.isPrimary;
}
