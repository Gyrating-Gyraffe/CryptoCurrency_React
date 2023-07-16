import { createStore } from "redux";
import CoinModel from "../Models/CoinModel";

// 1. Global State:
export class SearchState {
    public searchString: string = "";
}

// 2. Action Type:
export enum SearchActionType {
    UpdateSearchString = "UpdateSearchString"
}

// 3. Action:
export interface SearchAction {
    type: SearchActionType; // Action Type.
    payload?: any; // The data related to that action.
}

// 4. Reducer (invoked by redux library): 
export function searchReducer(currentState = new SearchState(), action: SearchAction): SearchState {

    const newState = JSON.parse(JSON.stringify(currentState)); // Duplicate the global state.

    // Change the duplicated global state according the action:
    switch (action.type) {
        case SearchActionType.UpdateSearchString: 
            newState.searchString = action.payload;
            break;
    }

    return newState; // Return the changed duplicated global state.
}

// 5. Store:
export const searchStore = createStore(searchReducer);
