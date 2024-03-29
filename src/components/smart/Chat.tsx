import { useEffect } from "react"
import { ChatSlot } from ".."
import { GetChats } from "../../services/chat-service"
import { useDispatch, useSelector } from "react-redux"
import { useFetchAndLoad } from "../../hooks"
import { getChats } from "../../redux/slices"
import { ChatUserAdapter } from "../../adapter"
import { StoreType } from "../../redux/store"
import { PageLoader } from "../dumb/Loaders"

export const Chat = () => {

  const { callEndpoint } = useFetchAndLoad();
  const dispatch = useDispatch();
  const { id } = useSelector(( state : StoreType ) => state.user);
  const { chat } = useSelector(( state : StoreType ) => state.chat);

  useEffect(() => {
    
    const fillChats = async () => {

    const { data } = await callEndpoint(GetChats(localStorage.getItem('jwt')!));
    dispatch(getChats(ChatUserAdapter( data, id )))
    }
    fillChats();
  },[])

  return (
    <>
      {
        chat.length === 0 ?
        (<PageLoader/>) :
        (chat.map((el) => {
          return (
          <ChatSlot
            key={el.chatId}
            name={el.userChat.name}
            message={el.userChat.messages}
            chatId={el.chatId}
            img={el.userChat.img}
          />
          )
        })) 
      }
    </>
  )
}
