import * as React from "react";
import {settingsInitialState, settingsReducer} from "../../reducers/SettingsReducer";
import {useReducer} from "react";

export const SettingsContext = React.createContext(settingsInitialState);

export function SettingsContextProvider(props) {
    const [state, dispatch] = useReducer(settingsReducer, settingsInitialState);

    return (
        <SettingsContext.Provider value={state} >
            {props.children}
        </SettingsContext.Provider>
    )
}