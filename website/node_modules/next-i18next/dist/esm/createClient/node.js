import _defineProperty from "@babel/runtime/helpers/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import i18n from 'i18next';
import i18nextFSBackend from 'i18next-fs-backend';
var globalInstance;
export default (function (config) {
  var instance;

  if (!globalInstance) {
    globalInstance = i18n.createInstance(config);
    instance = globalInstance;
  } else {
    instance = globalInstance.cloneInstance(_objectSpread(_objectSpread({}, config), {}, {
      initImmediate: false
    }));
  }

  var initPromise;

  if (!instance.isInitialized) {
    var _config$use, _config$use2;

    var hasCustomBackend = config === null || config === void 0 ? void 0 : (_config$use = config.use) === null || _config$use === void 0 ? void 0 : _config$use.some(function (b) {
      return b.type === 'backend';
    });

    if (!hasCustomBackend) {
      instance.use(i18nextFSBackend);
    }

    config === null || config === void 0 ? void 0 : (_config$use2 = config.use) === null || _config$use2 === void 0 ? void 0 : _config$use2.forEach(function (x) {
      return instance.use(x);
    });
    initPromise = instance.init(config);
  } else {
    initPromise = Promise.resolve(i18n.t);
  }

  return {
    i18n: instance,
    initPromise: initPromise
  };
});