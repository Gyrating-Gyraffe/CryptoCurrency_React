import { ChangeEventHandler, useEffect, useState } from "react";
import "./SearchBar.css";
import { SearchActionType, searchStore } from "../../../Redux/SearchStates";

function SearchBar(): JSX.Element {
    const [searchString, setSearchString] = useState<string>("");

    useEffect(() => {
        const unsubscribe = searchStore.subscribe(() => {
            setSearchString(searchStore.getState().searchString);
        })
        return unsubscribe;
    }, []);

    function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
        searchStore.dispatch({type: SearchActionType.UpdateSearchString, payload: event.target.value});
    }
    
    return (
        <div className="SearchBar">
			<input className="SearchBar"
                type="text"
                placeholder=" Search  . . ."
                onChange={handleSearch} />
        </div>
    );
}

export default SearchBar;
