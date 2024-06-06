module.exports = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const errorMessage = err.message || "Internal Server Error";

  res.formattedResponse(statusCode, errorMessage, undefined, errorMessage);
};
