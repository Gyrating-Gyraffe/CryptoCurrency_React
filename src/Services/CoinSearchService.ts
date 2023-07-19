import CoinModel from "../Models/CoinModel";

/** Which property in Coin Model to use in the search. */
export enum SearchBy {
    ID = "id",
    Symbol = "symbol",
    Name = "name"
}
/** Exclusive: Search returns only results that match the query *fully* (1kt = 1kt)  (1k != 1kt).
 *  Inclusive: Search returns results that match the query fully or partially (1kt = 1kt) (1k = 1kt). */
export enum SearchType {
    Inclusive = "Inclusive",
    Exclusive = "Exclusive"
}

class CoinSearchService {
    constructor(
        private searchString: string = "",
        private searchBy: SearchBy = SearchBy.Symbol,
        private searchType: SearchType = SearchType.Inclusive
        ) {}

    /** Searches through a given array and returns a new array with the search results. 
     * Uses the CoinSearchService parameters for the search.
     * @param array Coin Model array to search through.
     * @param searchString The string to use for our search.
     * @returns Filtered and (if inclusive) sorted Coin Model array. */
    public search(array: CoinModel[], searchString: string, searchBy?: SearchBy, searchType?: SearchType): CoinModel[] {
        if(!searchString) return array;
        this.searchString = searchString;
        if(searchBy) this.searchBy = searchBy;
        if(searchType) this.searchType = searchType;

        switch(this.searchType) {
            case SearchType.Exclusive:
                this.searchExclusive(array);
                break;
            case SearchType.Inclusive:
                this.searchInclusive(array);
                break;
        }
        return array;
    }

    private searchExclusive(array: CoinModel[]): CoinModel[] {
        return array.filter(coin => coin[this.searchBy] === this.searchString);
    }

    /** Searches for full or partial matches with searchString and then also sorts by percentage of match.
     *  For example when searching for "abc" anything that fully matches (abc) appears first, then everything else. */
    private searchInclusive(array: CoinModel[]): CoinModel[] {
        return array.filter(coin => { return this.searchString ? coin[this.searchBy]!.startsWith(this.searchString) : true })
                    .sort((a, b) => { return this.searchString ? (a[this.searchBy]!.startsWith(b[this.searchBy]!) ? 0 : -1) : 0 }); 
    }
}

export const coinSearchService = new CoinSearchService();