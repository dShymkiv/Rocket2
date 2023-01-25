const getErrorMessage = (req, schema) => {
  const keys = Object.keys(schema);
  let errorMessage = '';

  for (const key of keys) {
    const validationResult = schema[key].validate(req[key]);
    console.log(validationResult);

    if (validationResult.error) {
      errorMessage = errorMessage.concat(validationResult.error.details);
    }

    req[key] = validationResult.value;
  }
  console.log(errorMessage);

  return { message: errorMessage };
};

const validate = (schema) => {
  return (req, _, next) => {
    const { message } = getErrorMessage(req, schema);

    if (message) return next({ status: 400, message });

    next();
  };
};

module.exports = {
  validate
};
