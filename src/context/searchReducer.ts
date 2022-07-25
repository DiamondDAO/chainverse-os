import { SearchState } from './'


type SearchActionType = 
     | { type: '[Search] - ActionName' }


export const searchReducer = ( state: SearchState, action: SearchActionType ): SearchState => {

  switch (action.type) {
    case '[Search] - ActionName':
      return {
        ...state,
      }

    default:
      return state;
  }
}