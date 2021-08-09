import _regeneratorRuntime from "@babel/runtime/regenerator";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _asyncToGenerator from "@babel/runtime/helpers/asyncToGenerator";
import _toConsumableArray from "@babel/runtime/helpers/toConsumableArray";
import _typeof from "@babel/runtime/helpers/typeof";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

import fs from 'fs';
import path from 'path';
import { createConfig } from './config/createConfig';
import createClient from './createClient';
var DEFAULT_CONFIG_PATH = './next-i18next.config.js';

var getFallbackLocales = function getFallbackLocales(fallbackLng) {
  if (typeof fallbackLng === 'string') {
    return [fallbackLng];
  }

  if (Array.isArray(fallbackLng)) {
    return fallbackLng;
  }

  if (_typeof(fallbackLng) === 'object' && fallbackLng !== null) {
    return Object.values(fallbackLng).reduce(function (all, locales) {
      return [].concat(_toConsumableArray(all), _toConsumableArray(locales));
    }, []);
  }

  return [];
};

var flatNamespaces = function flatNamespaces(namespacesByLocale) {
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

  return Array.from(new Set(allNamespaces));
};

export var serverSideTranslations = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(initialLocale) {
    var namespacesRequired,
        configOverride,
        userConfig,
        config,
        localeExtension,
        localePath,
        fallbackLng,
        _createClient,
        i18n,
        initPromise,
        initialI18nStore,
        getLocaleNamespaces,
        namespacesByLocale,
        _args = arguments;

    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            namespacesRequired = _args.length > 1 && _args[1] !== undefined ? _args[1] : undefined;
            configOverride = _args.length > 2 && _args[2] !== undefined ? _args[2] : null;

            if (!(typeof initialLocale !== 'string')) {
              _context.next = 4;
              break;
            }

            throw new Error('Initial locale argument was not passed into serverSideTranslations');

          case 4:
            userConfig = configOverride;

            if (!(!userConfig && fs.existsSync(path.resolve(DEFAULT_CONFIG_PATH)))) {
              _context.next = 9;
              break;
            }

            _context.next = 8;
            return import(path.resolve(DEFAULT_CONFIG_PATH));

          case 8:
            userConfig = _context.sent;

          case 9:
            if (!(userConfig === null)) {
              _context.next = 11;
              break;
            }

            throw new Error('next-i18next was unable to find a user config');

          case 11:
            config = createConfig(_objectSpread(_objectSpread({}, userConfig), {}, {
              lng: initialLocale
            }));
            localeExtension = config.localeExtension, localePath = config.localePath, fallbackLng = config.fallbackLng;
            _createClient = createClient(_objectSpread(_objectSpread({}, config), {}, {
              lng: initialLocale
            })), i18n = _createClient.i18n, initPromise = _createClient.initPromise;
            _context.next = 16;
            return initPromise;

          case 16:
            initialI18nStore = _defineProperty({}, initialLocale, {});
            getFallbackLocales(fallbackLng).forEach(function (lng) {
              initialI18nStore[lng] = {};
            });

            if (!Array.isArray(namespacesRequired)) {
              getLocaleNamespaces = function getLocaleNamespaces(path) {
                return fs.readdirSync(path).map(function (file) {
                  return file.replace(".".concat(localeExtension), '');
                });
              };

              namespacesByLocale = Object.keys(initialI18nStore).map(function (locale) {
                return getLocaleNamespaces(path.resolve(process.cwd(), "".concat(localePath, "/").concat(locale)));
              });
              namespacesRequired = flatNamespaces(namespacesByLocale);
            }

            namespacesRequired.forEach(function (ns) {
              for (var locale in initialI18nStore) {
                initialI18nStore[locale][ns] = (i18n.services.resourceStore.data[locale] || {})[ns] || {};
              }
            });
            return _context.abrupt("return", {
              _nextI18Next: {
                initialI18nStore: initialI18nStore,
                initialLocale: initialLocale,
                userConfig: config.serializeConfig ? userConfig : null
              }
            });

          case 21:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function serverSideTranslations(_x) {
    return _ref.apply(this, arguments);
  };
}();