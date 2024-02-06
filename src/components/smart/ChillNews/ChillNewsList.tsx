import { ChillListCard, ChillAvatar, ChillText, ChillListContainer } from "../../styled-components/ChillNewsContainer"
import { StoreType } from "../../../redux/store"
import { useSelector } from "react-redux"
import { Avatars } from "../../../assets"
import { IChillNewApi } from "../../../interfaces"

const AvatarsObj = {
    'man1.png': 0,
    'man2.png': 1,
    'man3.png': 2,
    'women1.png': 3,
    'women2.png': 4,
    'women3.png': 5
  };

export const ChillNewsList = () => {

  const { news } = useSelector(( state : StoreType ) => state.chill_news );

  return (
    <ChillListContainer>
        {
            news.map(( el : IChillNewApi ) => {
                return (
                    <li>
                        <ChillListCard>
                            <div style={{ display : "flex", justifyContent : "flex-start"}}>
                                <ChillAvatar src={Avatars[AvatarsObj[el.avatar as keyof typeof AvatarsObj]]} alt={el.userId} />
                            </div>
                            <ChillText>
                                {el.chillNewContent}
                            </ChillText>
                        </ChillListCard>
                    </li>
                )
            })
        }
    </ChillListContainer>
  )
}
