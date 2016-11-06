module.exports = ({ reactModules }) => {
  return {
    addresses: require('./addresses.js')(reactModules),
  };
};
