import { createStore } from "redux";
import CoinModel from "../Models/CoinModel";

// 1. Global State:
export class CoinsState {
    public selectedCoinsCount: number = 0;
    public selectedCoinsArray: CoinModel[] = [];
}

// 2. Action Type:
export enum CoinsActionType {
    AddSelected = "AddSelected",
    RemoveSelected = "RemoveSelected",
    ResetSelected = "ResetSelected"
}

// 3. Action:
export interface CoinsAction {
    type: CoinsActionType; // Action Type.
    payload?: any; // The data related to that action.
}

// 4. Reducer (invoked by redux library): 
export function coinsReducer(currentState = new CoinsState(), action: CoinsAction): CoinsState {

    const newState = { ...currentState }; // Duplicate the global state.

    // Change the duplicated global state according the action:
    switch (action.type) {

        case CoinsActionType.AddSelected: 
            newState.selectedCoinsCount +=  1;
            newState.selectedCoinsArray.push(action.payload);
            break;

        case CoinsActionType.RemoveSelected: 
            newState.selectedCoinsCount -= 1;
            const index = newState.selectedCoinsArray.indexOf(action.payload);
            console.warn(index);
            
            newState.selectedCoinsArray.splice(index, 1);
            break;

        case CoinsActionType.ResetSelected: 
            newState.selectedCoinsCount = 0;
            newState.selectedCoinsArray = [];
            break;
    }

    return newState; // Return the changed duplicated global state.
}

// 5. Store:
export const coinsStore = createStore(coinsReducer);
