import { YEARS } from "./utils.ts";
import { BookList } from "./components/sections/BookList.tsx";
import { Overview } from "./components/sections/Overview.tsx";

function App() {
    return (
        <div>
            <Overview />
            {YEARS.map((year) => (
                <BookList year={year} key={year} />
            ))}
        </div>
    );
}

export default App;
