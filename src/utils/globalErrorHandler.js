const globalErrorHandler = (err, req, res, next) => {
  res.status(err.status || 500).send({
    message: err.message,
    errors: err.errors,
  });
};

export default globalErrorHandler;
