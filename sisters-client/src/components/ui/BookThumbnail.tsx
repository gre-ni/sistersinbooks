import type { BookType } from "../../types";

type bookProps = {
    book: BookType;
};

export const BookThumbnail = (props: bookProps) => {
    return (
        <div key={props.book.id} className="max-w-25">
            <img alt={props.book.slug} src={`covers/${props.book.slug}.png`} />
            <p key={props.book.id}>{props.book.title}</p>
        </div>
    );
};
