"use client";

import { createContext, useContext, useMemo, ReactNode } from "react";
import type { Locale } from "@/lib/i18n";
import { parseMarkdown } from "@/lib/markdown";
import { deepMerge } from "@/lib/utils";
import type { DictionaryType, ContentLanguageType, SharedDataType } from "@/lib/loaders";

export type ContentType = SharedDataType & ContentLanguageType;

interface LanguageContextType {
    language: Locale;
    dict: DictionaryType;
    content: ContentType;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
    children: ReactNode;
    lang: Locale;
    dict: DictionaryType;
    contents: ContentLanguageType;
    shared: SharedDataType;
}

export function LanguageProvider({
    children,
    lang,
    dict: dictionary = {} as DictionaryType,
    contents = {} as ContentLanguageType,
    shared = {} as SharedDataType
}: LanguageProviderProps) {

    // Safely parse markdown dictionary
    const dict = useMemo(() => {
        if (!dictionary) return {} as DictionaryType;
        return parseMarkdown(dictionary) as DictionaryType;
    }, [dictionary]);

    // Safely merge and parse markdown content
    const content = useMemo(() => {
        const merged = deepMerge(
            (shared || {}) as unknown as Record<string, unknown>,
            (contents || {}) as unknown as Record<string, unknown>
        );
        return parseMarkdown(merged) as unknown as ContentType;
    }, [contents, shared]);

    return (
        <LanguageContext.Provider value={{ language: lang, dict, content }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) throw new Error("useLanguage must be used within a LanguageProvider");
    return context;
}