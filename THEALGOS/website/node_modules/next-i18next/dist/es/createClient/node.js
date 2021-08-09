import i18n from 'i18next';
import i18nextFSBackend from 'i18next-fs-backend';
let globalInstance;
export default (config => {
  let instance;

  if (!globalInstance) {
    globalInstance = i18n.createInstance(config);
    instance = globalInstance;
  } else {
    instance = globalInstance.cloneInstance({ ...config,
      initImmediate: false
    });
  }

  let initPromise;

  if (!instance.isInitialized) {
    var _config$use, _config$use2;

    const hasCustomBackend = config === null || config === void 0 ? void 0 : (_config$use = config.use) === null || _config$use === void 0 ? void 0 : _config$use.some(b => b.type === 'backend');

    if (!hasCustomBackend) {
      instance.use(i18nextFSBackend);
    }

    config === null || config === void 0 ? void 0 : (_config$use2 = config.use) === null || _config$use2 === void 0 ? void 0 : _config$use2.forEach(x => instance.use(x));
    initPromise = instance.init(config);
  } else {
    initPromise = Promise.resolve(i18n.t);
  }

  return {
    i18n: instance,
    initPromise
  };
});