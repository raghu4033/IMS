module.exports = function (req, res) {
  const errorMessage = "URL not found";

  res.formattedResponse(404, errorMessage, undefined, errorMessage);
};
