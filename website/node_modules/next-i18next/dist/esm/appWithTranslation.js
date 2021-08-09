import _extends from "@babel/runtime/helpers/extends";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
var __jsx = React.createElement;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import React, { useMemo } from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import { I18nextProvider } from 'react-i18next';
import { createConfig } from './config/createConfig';
import createClient from './createClient';
export { Trans, useTranslation, withTranslation } from 'react-i18next';
export var globalI18n = null;
export var appWithTranslation = function appWithTranslation(WrappedComponent) {
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

      var _createClient = createClient(_objectSpread(_objectSpread({}, createConfig(_objectSpread(_objectSpread({}, userConfig), {}, {
        lng: initialLocale
      }))), {}, {
        lng: initialLocale,
        resources: initialI18nStore
      }));

      i18n = _createClient.i18n;
      useMemo(function () {
        globalI18n = i18n;
      }, [i18n]);
    }

    return i18n !== null ? __jsx(I18nextProvider, {
      i18n: i18n
    }, __jsx(WrappedComponent, _extends({
      key: locale
    }, props))) : __jsx(WrappedComponent, _extends({
      key: locale
    }, props));
  };

  return hoistNonReactStatics(AppWithTranslation, WrappedComponent);
};