function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useMemo } from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import { I18nextProvider } from 'react-i18next';
import { createConfig } from './config/createConfig';
import createClient from './createClient';
export { Trans, useTranslation, withTranslation } from 'react-i18next';
export let globalI18n = null;
export const appWithTranslation = (WrappedComponent, configOverride = null) => {
  const AppWithTranslation = props => {
    var _props$pageProps;

    let i18n = null;
    let locale = null;

    if (props !== null && props !== void 0 && (_props$pageProps = props.pageProps) !== null && _props$pageProps !== void 0 && _props$pageProps._nextI18Next) {
      var _userConfig;

      let {
        userConfig
      } = props.pageProps._nextI18Next;
      const {
        initialI18nStore,
        initialLocale
      } = props.pageProps._nextI18Next;

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
      ({
        i18n
      } = createClient({ ...createConfig({ ...userConfig,
          lng: initialLocale
        }),
        lng: initialLocale,
        resources: initialI18nStore
      }));
      useMemo(() => {
        globalI18n = i18n;
      }, [i18n]);
    }

    return i18n !== null ? /*#__PURE__*/React.createElement(I18nextProvider, {
      i18n: i18n
    }, /*#__PURE__*/React.createElement(WrappedComponent, _extends({
      key: locale
    }, props))) : /*#__PURE__*/React.createElement(WrappedComponent, _extends({
      key: locale
    }, props));
  };

  return hoistNonReactStatics(AppWithTranslation, WrappedComponent);
};