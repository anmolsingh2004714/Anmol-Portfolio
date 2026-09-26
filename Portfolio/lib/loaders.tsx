import 'server-only';
import type { Locale } from "./i18n";
import type enDict from "@/dictionaries/en.json";
import type hiDict from "@/dictionaries/hi.json";
import type enContent from "@/contents/en.json";
import type hiContent from "@/contents/hi.json";
import type sharedContent from "@/contents/shared.json";

export type DictionaryType = typeof enDict | typeof hiDict;
export type ContentLanguageType = typeof enContent | typeof hiContent;
export type SharedDataType = typeof sharedContent;

type loader<T> = () => Promise<T>;

const dictionaries: Record<Locale, loader<DictionaryType>> = {
    en: async () => import('@/dictionaries/en.json').then((m) => m.default),
    hi: async () => import("@/dictionaries/hi.json").then((m) => m.default),
};

const contents: Record<Locale, loader<ContentLanguageType>> = {
    en: async () => import("@/contents/en.json").then((m) => m.default),
    hi: async () => import("@/contents/hi.json").then((m) => m.default),
};

export const getDictionary = (locale: Locale): Promise<DictionaryType> => dictionaries[locale]();
export const getContents = (locale: Locale): Promise<ContentLanguageType> => contents[locale]();
export const getSharedData = (): Promise<SharedDataType> => import("@/contents/shared.json").then((m) => m.default);