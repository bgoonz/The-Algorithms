export declare const defaultConfig: {
    defaultNS: string;
    errorStackTraceLimit: number;
    i18n: {
        defaultLocale: string;
        locales: string[];
    };
    readonly initImmediate: boolean;
    interpolation: {
        escapeValue: boolean;
        format: (value: string, format: string) => string;
        formatSeparator: string;
    };
    load: string;
    localeExtension: string;
    localePath: string;
    localeStructure: string;
    react: {
        useSuspense: boolean;
    };
    serializeConfig: boolean;
    strictMode: boolean;
    use: never[];
};
