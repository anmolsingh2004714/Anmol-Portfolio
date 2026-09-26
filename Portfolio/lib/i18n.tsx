export type Locale = 'en' | 'hi';

const SUPPORTED_LOCALES: readonly Locale[] = ['en', 'hi'] as const;
export const DEFAULT_LOCALE: Locale = 'en';

export function isValidLocale(locale: string): locale is Locale {

  return (SUPPORTED_LOCALES as readonly string[]).includes(locale);
}