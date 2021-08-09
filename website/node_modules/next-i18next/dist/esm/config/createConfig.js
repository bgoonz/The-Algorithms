import _typeof from "@babel/runtime/helpers/typeof";
import _toConsumableArray from "@babel/runtime/helpers/toConsumableArray";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import { defaultConfig } from './defaultConfig';
var deepMergeObjects = ['backend', 'detection'];
export var createConfig = function createConfig(userConfig) {
  var _userConfig$use;

  if (typeof (userConfig === null || userConfig === void 0 ? void 0 : userConfig.lng) !== 'string') {
    throw new Error('config.lng was not passed into createConfig');
  } //
  // Initial merge of default and user-provided config
  //


  var userI18n = userConfig.i18n,
      userConfigStripped = _objectWithoutProperties(userConfig, ["i18n"]);

  var defaultI18n = defaultConfig.i18n,
      defaultConfigStripped = _objectWithoutProperties(defaultConfig, ["i18n"]);

  var combinedConfig = _objectSpread(_objectSpread(_objectSpread(_objectSpread({}, defaultConfigStripped), userConfigStripped), defaultI18n), userI18n);

  var defaultNS = combinedConfig.defaultNS,
      lng = combinedConfig.lng,
      locales = combinedConfig.locales,
      localeExtension = combinedConfig.localeExtension,
      localePath = combinedConfig.localePath,
      localeStructure = combinedConfig.localeStructure;
  /**
   * Skips translation file resolution while in cimode
   * https://github.com/isaachinman/next-i18next/pull/851#discussion_r503113620
  */

  if (lng === 'cimode') {
    return combinedConfig;
  }

  if (typeof combinedConfig.fallbackLng === 'undefined') {
    combinedConfig.fallbackLng = combinedConfig.defaultLocale;
  }

  var hasCustomBackend = userConfig === null || userConfig === void 0 ? void 0 : (_userConfig$use = userConfig.use) === null || _userConfig$use === void 0 ? void 0 : _userConfig$use.some(function (b) {
    return b.type === 'backend';
  });

  if (!process.browser && typeof window === 'undefined') {
    combinedConfig.preload = locales;

    if (!hasCustomBackend) {
      var fs = require('fs');

      var path = require('path');

      var serverLocalePath = localePath; //
      // Validate defaultNS
      // https://github.com/isaachinman/next-i18next/issues/358
      //

      if (typeof defaultNS === 'string' && typeof lng !== 'undefined') {
        var _userConfig$interpola, _userConfig$interpola2, _userConfig$interpola3, _userConfig$interpola4;

        var prefix = (_userConfig$interpola = userConfig === null || userConfig === void 0 ? void 0 : (_userConfig$interpola2 = userConfig.interpolation) === null || _userConfig$interpola2 === void 0 ? void 0 : _userConfig$interpola2.prefix) !== null && _userConfig$interpola !== void 0 ? _userConfig$interpola : '{{';
        var suffix = (_userConfig$interpola3 = userConfig === null || userConfig === void 0 ? void 0 : (_userConfig$interpola4 = userConfig.interpolation) === null || _userConfig$interpola4 === void 0 ? void 0 : _userConfig$interpola4.suffix) !== null && _userConfig$interpola3 !== void 0 ? _userConfig$interpola3 : '}}';
        var defaultLocaleStructure = localeStructure.replace("".concat(prefix, "lng").concat(suffix), lng).replace("".concat(prefix, "ns").concat(suffix), defaultNS);
        var defaultFile = "/".concat(defaultLocaleStructure, ".").concat(localeExtension);
        var defaultNSPath = path.join(localePath, defaultFile);
        var defaultNSExists = fs.existsSync(defaultNSPath);

        if (!defaultNSExists && process.env.NODE_ENV !== 'production') {
          throw new Error("Default namespace not found at ".concat(defaultNSPath));
        }
      } //
      // Set server side backend
      //


      combinedConfig.backend = {
        addPath: path.resolve(process.cwd(), "".concat(serverLocalePath, "/").concat(localeStructure, ".missing.").concat(localeExtension)),
        loadPath: path.resolve(process.cwd(), "".concat(serverLocalePath, "/").concat(localeStructure, ".").concat(localeExtension))
      }; //
      // Set server side preload (namespaces)
      //

      if (!combinedConfig.ns && typeof lng !== 'undefined') {
        var unique = function unique(list) {
          return Array.from(new Set(list));
        };

        var getNamespaces = function getNamespaces(locales) {
          var getLocaleNamespaces = function getLocaleNamespaces(p) {
            return fs.readdirSync(p).map(function (file) {
              return file.replace(".".concat(localeExtension), '');
            });
          };

          var namespacesByLocale = locales.map(function (locale) {
            return getLocaleNamespaces(path.resolve(process.cwd(), "".concat(serverLocalePath, "/").concat(locale)));
          });
          var allNamespaces = [];

          var _iterator = _createForOfIteratorHelper(namespacesByLocale),
              _step;

          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var localNamespaces = _step.value;
              allNamespaces.push.apply(allNamespaces, _toConsumableArray(localNamespaces));
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }

          return unique(allNamespaces);
        };

        var getAllLocales = function getAllLocales(lng, fallbackLng) {
          if (typeof fallbackLng === 'string') {
            return unique([lng, fallbackLng]);
          }

          if (Array.isArray(fallbackLng)) {
            return unique([lng].concat(_toConsumableArray(fallbackLng)));
          }

          if (_typeof(fallbackLng) === 'object') {
            var flattenedFallbacks = Object.values(fallbackLng).reduce(function (all, fallbackLngs) {
              return [].concat(_toConsumableArray(all), _toConsumableArray(fallbackLngs));
            }, []);
            return unique([lng].concat(_toConsumableArray(flattenedFallbacks)));
          }

          return [lng];
        };

        combinedConfig.ns = getNamespaces(getAllLocales(lng, combinedConfig.fallbackLng));
      }
    }
  } else {
    var clientLocalePath = localePath; //
    // Remove public prefix from client site config
    //

    if (localePath.match(/^\.?\/public\//)) {
      clientLocalePath = localePath.replace(/^\.?\/public/, '');
    } //
    // Set client side backend, if there is no custom backend
    //


    if (!hasCustomBackend) {
      combinedConfig.backend = {
        addPath: "".concat(clientLocalePath, "/").concat(localeStructure, ".missing.").concat(localeExtension),
        loadPath: "".concat(clientLocalePath, "/").concat(localeStructure, ".").concat(localeExtension)
      };
    }

    if (typeof combinedConfig.ns !== 'string' && !Array.isArray(combinedConfig.ns)) {
      combinedConfig.ns = [defaultNS];
    }
  } //
  // Deep merge with overwrite - goes last
  //


  deepMergeObjects.forEach(function (obj) {
    if (userConfig[obj]) {
      combinedConfig[obj] = _objectSpread(_objectSpread({}, combinedConfig[obj]), userConfig[obj]);
    }
  });
  return combinedConfig;
};