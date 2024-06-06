module.exports = function (req, res, next) {
  res.formattedResponse = function (
    statusCode,
    message,
    data,
    error = undefined
  ) {
    return res.status(statusCode).json({
      statusCode,
      message,
      error,
      data,
    });
  };
  next();
};
