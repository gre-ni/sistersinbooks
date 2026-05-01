export type YearType = "2024" | "2025" | "2026";

export type ReadType = "classic" | "modern";

export type BookType = {
    id: number;
    title: string;
    author: string;
    date: string;
    rating: number;
    slug: string;
    type: ReadType;
};
