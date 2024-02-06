import { useRef, useEffect } from "react";
import { usePageSlider } from "../../context";
import { HomeSections } from "../../constants";

export const Home = () => {

  const { pageCurrentIndex } = usePageSlider();  
  const pagesRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if(pagesRef.current){
      const current = pagesRef.current

      if(current.querySelector("li > div")){
      const cardNode = current.querySelectorAll("li > div")[pageCurrentIndex]
        if(cardNode)
        {
          cardNode.scrollIntoView({
            behavior : "smooth"
          })
        }}
      }
  },[pageCurrentIndex])

  return (
    <>
      <ul style={{ display : "flex", overflow : "hidden"}} ref={pagesRef}>
      {
        HomeSections.map((El, i) => {
          return (
            <li key={i} style={{ minWidth : "100%"}}>
              <El/>
            </li>
          )
        })
      }
      </ul>
    </>
  )
}
