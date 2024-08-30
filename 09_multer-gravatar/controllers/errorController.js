import { serverConfig } from '../configs/index.js';

// Global error handler
export const globalErrorHandler = (err, req, res, next) => {
  console.log(`Error: ${err.message}`);

  console.log({ conf: serverConfig.environment });
  if (serverConfig.environment === 'production') {
    res.status(err.status ?? 500).json({
      msg: !err.message || err.status === 500 ? 'Internal server error' : err.message,
    });

    return;
  }

  res.status(err.status ?? 500).json({
    msg: err.message,
    data: err.data,
    stack: err.stack,
  });
};
