import winston from 'winston';
import { WinstonTransport as AxiomTransport } from '@axiomhq/winston';

const consoleFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp(),
  winston.format.printf(({ level, message, timestamp }) => {
    return `${timestamp} ${level}: ${message}`;
  })
);

const transports: winston.transport[] = [
  new winston.transports.Console({
    format: consoleFormat
  })
];

if (process.env.AXIOM_TOKEN) {
  transports.push(
    new AxiomTransport({
      token: process.env.AXIOM_TOKEN,
      dataset: process.env.AXIOM_DATASET,
      orgId: process.env.AXIOM_ORG_ID
    })
  );
}

export const logger = winston.createLogger({
  level: 'info',
  transports
});
