import { format, LoggerOptions, transports } from 'winston';

export function getWinstonLoggerOption(
  nodeEnv = process.env.NODE_ENV,
): LoggerOptions {
  const isLocalEnv = ['test', undefined].includes(nodeEnv);
  return {
    silent: nodeEnv === 'test',
    transports: [
      new transports.Console({
        format: isLocalEnv ? getLocalFormat() : getProductionFormat(),
      }),
    ],
  };
}

function getLocalFormat() {
  return format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    format.ms(),
    format.prettyPrint(),
  );
}

function getProductionFormat() {
  return format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    format.ms(),
    format.json(),
    format.printf(({ level, ...args }) =>
      JSON.stringify({
        level,
        ...args,
      }),
    ),
  );
}
