import winston from 'winston';
import { WinstonTransport as AxiomTransport } from '@axiomhq/winston';

const transports: any[] = [
    new winston.transports.Console(),
];

if (process.env.AXIOM_DATASET) {
  transports.push(
    new AxiomTransport({
      dataset: process.env.AXIOM_DATASET!,
      token: process.env.AXIOM_TOKEN!,
    }),
  )
}

export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports,
});

export default logger;