import React from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import type { AppProps as NextJsAppProps } from 'next/app';
import { SSRConfig, UserConfig } from './types';
import { i18n as I18NextClient } from 'i18next';
export { Trans, useTranslation, withTranslation } from 'react-i18next';
declare type AppProps = NextJsAppProps & {
    pageProps: SSRConfig;
};
export declare let globalI18n: I18NextClient | null;
export declare const appWithTranslation: (WrappedComponent: React.ComponentType<AppProps> | React.ElementType<AppProps>, configOverride?: UserConfig | null) => ((props: AppProps) => JSX.Element) & hoistNonReactStatics.NonReactStatics<React.ComponentClass<AppProps, any> | React.FunctionComponent<AppProps>, {}>;
