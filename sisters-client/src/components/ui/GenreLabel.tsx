import type { BookType } from "../../types.ts";

type GenreProps = {
    book: BookType;
};

export const GenreLabel = (props: GenreProps) => {
    return (
        <div>
            <img
                alt={`read-type-${props.book.type}`}
                src={`/sticker-${props.book.type}.svg`}
            />
        </div>
    );
};
