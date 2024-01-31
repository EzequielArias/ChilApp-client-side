import React, { ReactNode, createContext, useContext, useState } from "react";

interface IPageSliderContext {
    pageCurrentIndex : number;
    handlePageIndex : ( pageIndex : number ) => void;
}

interface IPageSliderProps {
    children : ReactNode
}

const PageSliderContext = createContext<IPageSliderContext>(null!);

export const usePageSlider = () => useContext(PageSliderContext);

export const PageSliderProvider : React.FC<IPageSliderProps> = ({children}) => {

   const [pageCurrentIndex, setPageCurrentIndex] = useState(0);

    const handlePageIndex = ( pageIndex : number ) => {
        setPageCurrentIndex(pageIndex);
       /* if(action === 'foward')
        {
          if(pageCurrentIndex + 1 >= pages) return;
          setPageCurrentIndex(pageCurrentIndex + 1);
        }
      
        if(action === 'back')
        {
          if(pageCurrentIndex <= 0) return;
          setPageCurrentIndex(pageCurrentIndex - 1);
        }*/
    }

    return (
        <PageSliderContext.Provider value={{
            pageCurrentIndex,
            handlePageIndex
        }}>
            { children }
        </PageSliderContext.Provider>
    )
}