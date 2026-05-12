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

    let monthlySeparated: BookType[][] | [] = [];

    for (let i = 12; i > 0; i--) {
        const month = i < 10 ? `0${i}` : `${i}`;
        const dateCompare = `${props.year}-${month}`;
        const monthlyBooks = books.filter((book) =>
            book.date.startsWith(dateCompare),
        );
        monthlySeparated = [...monthlySeparated, monthlyBooks];
    }

    console.log(books);
    console.log(monthlySeparated);

    return (
        <div>
            <p>{props.year}</p>
            {monthlySeparated.map((month, i) => (
                <div key={i}>
                    <p>month {12 - i}</p>
                    {month.map((book) => (
                        <div key={book.id}>
                            <img
                                alt={book.slug}
                                src={`../../public/covers/${book.slug}.png`}
                            />
                            <p key={book.id}>{book.title}</p>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};
