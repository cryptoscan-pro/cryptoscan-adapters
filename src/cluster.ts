import cluster from "cluster";

export function setupCluster(ports: number[]) {
  if (cluster.isPrimary) {
    console.log(`Primary ${process.pid} is running`);

    ports.forEach((port, index) => {
      cluster.fork({ WORKER_PORT: port });
      console.log(`Started worker for port ${port}`);
    });

    cluster.on("exit", (worker, code, signal) => {
      console.log(`Worker ${worker.process.pid} died`);
    });
  }

  return !cluster.isPrimary;
}
