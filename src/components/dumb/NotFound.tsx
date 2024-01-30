import { NotFoundContainer } from "../styled-components/NotFound"
import { Button } from "@mui/material"


export const NotFound = ({ text, fn, advice } : { text : string, fn : () => void, advice : string }) => {
  return (
    <NotFoundContainer>
        <h1>{text}</h1>
        <p style={{ margin : "10px"}}>{advice}</p>
        <Button onClick={fn} sx={{ background : "violet", color : "white", ":hover" : { color : "black"}}}>
          Volver al Inicio
        </Button>
    </NotFoundContainer>
  )
}
