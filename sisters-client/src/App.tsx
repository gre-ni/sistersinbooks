import { YEARS } from "./utils.ts";
import { BookList } from "./components/sections/BookList.tsx";

function App() {
    return (
        <div>
            {YEARS.map((year) => (
                <BookList year={year} key={year} />
            ))}
        </div>
    );
}

export default App;
