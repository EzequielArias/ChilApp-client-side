import React, { ReactNode, createContext, useContext, useState } from "react";

interface INotFoundContext {
    text : string;
    handleText : ( value : string, value2 : string ) => void;
    advice : string;
}

interface INotFoundProps {
    children : ReactNode
}

const NotFoundContext = createContext<INotFoundContext>(null!);

export const useNotFound = () => useContext(NotFoundContext);

export const NotFoundProvider : React.FC<INotFoundProps> = ({children}) => {

    const [text, setText] = useState("");
    const [advice, setAdvice] = useState("");

    const handleText = (value : string, value2 : string) => {
        setText(value)
        setAdvice(value2)
    };

    return (
        <NotFoundContext.Provider value={{
            text,
            handleText,
            advice
        }}>
            { children }
        </NotFoundContext.Provider>
    )
}