import i18n from 'i18next';
export default (config => {
  const instance = i18n.createInstance(config);
  let initPromise;

  if (!instance.isInitialized) {
    var _config$use;

    config === null || config === void 0 ? void 0 : (_config$use = config.use) === null || _config$use === void 0 ? void 0 : _config$use.forEach(x => instance.use(x));
    initPromise = instance.init(config);
  } else {
    initPromise = Promise.resolve(i18n.t);
  }

  return {
    i18n: instance,
    initPromise
  };
});