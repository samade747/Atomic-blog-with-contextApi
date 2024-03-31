export const initialState = {
    isFakeDark: false,
}

export const actionTypes = {
    TOGGLE_FAKE_DARK: 'TOGGLE_FAKE_DARK',
}

export const reducer = (state, action) => {

    switch (action.type) {
        case actionTypes.TOGGLE_FAKE_DARK:
            return {
                ...state,
                isFakeDark: !state.isFakeDark
            }
        default:
            return state;
    }
};



