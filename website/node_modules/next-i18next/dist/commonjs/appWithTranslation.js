"use strict";

require("core-js/modules/es.object.keys.js");

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.array.filter.js");

require("core-js/modules/es.object.get-own-property-descriptor.js");

require("core-js/modules/es.array.for-each.js");

require("core-js/modules/web.dom-collections.for-each.js");

require("core-js/modules/es.object.get-own-property-descriptors.js");

require("core-js/modules/es.object.define-properties.js");

require("core-js/modules/es.object.define-property.js");

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.string.iterator.js");

require("core-js/modules/es.weak-map.js");

require("core-js/modules/web.dom-collections.iterator.js");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Trans", {
  enumerable: true,
  get: function get() {
    return _reactI18next.Trans;
  }
});
Object.defineProperty(exports, "useTranslation", {
  enumerable: true,
  get: function get() {
    return _reactI18next.useTranslation;
  }
});
Object.defineProperty(exports, "withTranslation", {
  enumerable: true,
  get: function get() {
    return _reactI18next.withTranslation;
  }
});
exports.appWithTranslation = exports.globalI18n = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _hoistNonReactStatics = _interopRequireDefault(require("hoist-non-react-statics"));

var _reactI18next = require("react-i18next");

var _createConfig = require("./config/createConfig");

var _createClient2 = _interopRequireDefault(require("./createClient"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var __jsx = _react["default"].createElement;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var globalI18n = null;
exports.globalI18n = globalI18n;

var appWithTranslation = function appWithTranslation(WrappedComponent) {
  var configOverride = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  var AppWithTranslation = function AppWithTranslation(props) {
    var _props$pageProps;

    var i18n = null;
    var locale = null;

    if (props !== null && props !== void 0 && (_props$pageProps = props.pageProps) !== null && _props$pageProps !== void 0 && _props$pageProps._nextI18Next) {
      var _userConfig;

      var userConfig = props.pageProps._nextI18Next.userConfig;
      var _props$pageProps$_nex = props.pageProps._nextI18Next,
          initialI18nStore = _props$pageProps$_nex.initialI18nStore,
          initialLocale = _props$pageProps$_nex.initialLocale;

      if (userConfig === null && configOverride === null) {
        throw new Error('appWithTranslation was called without a next-i18next config');
      }

      if (configOverride !== null) {
        userConfig = configOverride;
      }

      if (!((_userConfig = userConfig) !== null && _userConfig !== void 0 && _userConfig.i18n)) {
        throw new Error('appWithTranslation was called without config.i18n');
      }

      locale = initialLocale;

      var _createClient = (0, _createClient2["default"])(_objectSpread(_objectSpread({}, (0, _createConfig.createConfig)(_objectSpread(_objectSpread({}, userConfig), {}, {
        lng: initialLocale
      }))), {}, {
        lng: initialLocale,
        resources: initialI18nStore
      }));

      i18n = _createClient.i18n;
      (0, _react.useMemo)(function () {
        exports.globalI18n = globalI18n = i18n;
      }, [i18n]);
    }

    return i18n !== null ? __jsx(_reactI18next.I18nextProvider, {
      i18n: i18n
    }, __jsx(WrappedComponent, (0, _extends2["default"])({
      key: locale
    }, props))) : __jsx(WrappedComponent, (0, _extends2["default"])({
      key: locale
    }, props));
  };

  return (0, _hoistNonReactStatics["default"])(AppWithTranslation, WrappedComponent);
};

exports.appWithTranslation = appWithTranslation;