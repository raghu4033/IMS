const validateBody = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    console.log(error);
    const errorMessage = error.details.map((e) => e.message.replace(
      /[&\/\\#,+()$~%.'":*?<>{}]/g,
      ""
    ));
    return res.formattedResponse(400, errorMessage, undefined, errorMessage);
  }

  next();
};

module.exports = {
  validateBody,
};
