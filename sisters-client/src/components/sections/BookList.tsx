import type { YearType, BookType } from "../../types.ts";
import { useEffect, useState } from "react";

type ListProps = {
    year: YearType;
    key: YearType;
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

    return (
        <div>
            <p>{props.year}</p>
            {books.map((book) => (
                <div>
                    <img
                        key={book.id}
                        alt={book.slug}
                        src={`../../public/covers/${book.slug}.png`}
                    />
                    <p key={book.id}>{book.title}</p>
                </div>
            ))}
        </div>
    );
};
