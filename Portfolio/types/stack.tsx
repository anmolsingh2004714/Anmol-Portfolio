export type StackItem = {
    name: string;
    icon: string;
    featured?: boolean;
};
export type StacCategories = {
    frontend: StackItem[];
    backend: StackItem[];
    database: StackItem[];
    tools: StackItem[];
};