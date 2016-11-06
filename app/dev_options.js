

module.exports = {
  loggerOptions: {
    active: false,
    level: process.env.LOGGER_ENV || (
      (action) => console.log(`actionName:${action.type}`) // eslint-disable-line
    )
  }
};
