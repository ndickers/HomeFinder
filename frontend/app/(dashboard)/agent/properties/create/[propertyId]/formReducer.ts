export function formReducer(state: any, action: any) {

    switch (action.type) {
        case "UPDATE_BASIC":
            return { ...state, ...action.payload }
        case "UPDATE_LOCATION":
            return { ...state, ...action.payload }
        default:
            return state;
    }
}