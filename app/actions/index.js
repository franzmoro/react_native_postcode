module.exports = ({ reactModules }) => {
  return {
    ...require('./addresses.js')({ reactModules }),
    ...require('./form.js')({ reactModules })
  };
};
