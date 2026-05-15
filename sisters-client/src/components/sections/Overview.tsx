import leftTab from "../../assets/left-tab.svg";
import { YEARS } from "../../utils";
import { BookList } from "./BookList";

export const Overview = () => {
    console.log(leftTab);
    return (
        <div className="m-12">
            <div
                className="flex min-h-10 bg-no-repeat bg-size-[auto_100%] bg-bottom-left"
                style={{ backgroundImage: `url("${leftTab}")` }}
            >
                <p className="px-4 pt-2 content-center text-mono align-middle">
                    list overview
                </p>
            </div>
            <div className="bg-grey p-10 rounded-tr-lg rounded-br-lg rounded-bl-lg shadow-md">
                {YEARS.map((year) => (
                    <BookList year={year} key={year} />
                ))}
            </div>
        </div>
    );
};
