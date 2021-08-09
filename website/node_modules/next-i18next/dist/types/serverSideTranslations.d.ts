import { UserConfig, SSRConfig } from './types';
export declare const serverSideTranslations: (initialLocale: string, namespacesRequired?: string[] | undefined, configOverride?: UserConfig | null) => Promise<SSRConfig>;
