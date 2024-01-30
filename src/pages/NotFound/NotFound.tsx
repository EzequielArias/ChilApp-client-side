import { NotFound as  NotFoundComponent } from "../../components/dumb/NotFound"
import { useNotFound } from "../../context"
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const NotFound = () => {

  const { text, handleText, advice } = useNotFound();
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      handleText("", "");
    }
  },[])

  return (
      <NotFoundComponent text={text} fn={() => navigate("/")} advice={advice}></NotFoundComponent>
    )
}
