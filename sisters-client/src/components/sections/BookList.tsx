import type { YearType, BookType } from "../../types.ts";
import { useEffect, useState } from "react";
import { MONTHS } from "../../utils.ts";
import { BookThumbnail } from "../ui/BookThumbnail.tsx";
import { GenreLabel } from "../ui/GenreLabel.tsx";

type ListProps = {
    year: YearType;
    key: YearType;
};

type MonthBooks = {
    month: string;
    books: BookType[];
};

export const BookList = (props: ListProps) => {
    const [books, setBooks] = useState<BookType[]>([]); // TODO: Fix types and default value
    useEffect(() => {
        const FetchBooks = async (year: YearType): Promise<void> => {
            const response = await fetch(
                `http://127.0.0.1:5000/books/year?year=${year}`,
            );
            if (!response.ok) {
                // TODO: Handle Error
                return;
            }
            setBooks((await response.json()) as BookType[]);
        };
        FetchBooks(props.year);
    }, [props.year]); // TODO: Check for this dependency, should I store in state instead?

    let monthlySeparated: MonthBooks[] = []; // TODO: Retype this

    for (let i = 12; i > 0; i--) {
        const month = i < 10 ? `0${i}` : `${i}`;
        const dateCompare = `${props.year}-${month}`;
        const monthlyBooks = books.filter((book) =>
            book.date.startsWith(dateCompare),
        );
        if (monthlyBooks[0] !== undefined) {
            monthlySeparated = [
                ...monthlySeparated,
                { month: MONTHS[i - 1], books: monthlyBooks },
            ];
        }
    }

    console.log(monthlySeparated);

    return (
        <div>
            <p>{props.year}</p>
            <div className="grid grid-cols-3 gap-0">
                {monthlySeparated.map((month, i) => (
                    <div key={i} className="p-5 border">
                        <p>{month.month}</p>
                        <div className="flex row gap-2">
                            {month.books.map((book) => (
                                <div>
                                    <BookThumbnail book={book} />
                                    <GenreLabel book={book} />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
