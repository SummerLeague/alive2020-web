module.exports = function (app) {

  function provideLocal (name, value) {
    if (name) {
      app.locals[name] = value;
    }
  }

  return {
    title : "Alive2020",
    provideLocal : provideLocal
  };
};
