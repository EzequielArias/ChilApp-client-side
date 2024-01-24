import { Chat, News, Call } from "../../components"
import styled from 'styled-components';

const Test = styled.div 
`
overflow : hidden;
width : 100%;
height : 84vh;
display : flex;

& > ul {
  display : flex;
  flex-direction : center;
  width : 100%;
  height : 100%;
}
`

export const Home = () => {

  const FC = [Chat, News, Call];

  return (
    <>
      <ul style={{ display : "flex", height : "100%"}}>
      {
        FC.map((El, i) => {
          return (
            <li key={i} style={{ minWidth : "100%", height : "100%"}}>
              <El/>
            </li>
          )
        })
      }
      </ul>
    </>
  )
}
