module.exports = validateMethod => {
  return async (req, res, next) => {
    const errors = await validateMethod(req);
    let nextStep = true;
    Object.keys(errors).forEach(key => {
      const length = errors[key].length;
      if (length !== 0) {
        nextStep = false;
      } else {
        delete errors[key];
      }
    });
    if (nextStep) {
      return next();
    }
    return res.status(400).json({ errors });
  };
};
