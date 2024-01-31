import {
    NavbarContainer,
    LogoText,
    InfoContainer,
    SectionContainer,
    SectionItem,
    ToolsContainer,
    DivIcon,
    DivInput,
    SubInfoContainer
} from '../styled-components';
import { KeyboardEvent, useEffect, useState, MouseEvent } from 'react';
//import { BsThreeDotsVertical } from 'react-icons/bs';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { useForm } from '../../hooks';
import { useNavigate, useLocation } from 'react-router-dom';
import { PositionedMenu } from '../dumb';
import { useNotFound, usePageSlider } from '../../context';

export const Navbar = () => {

  /**
    Cambiar la logica del PageSlider porque si en un futuro tengo mas pages no va a funcionar
   */

  const { text } = useNotFound();
  const { handlePageIndex } = usePageSlider();

  const [selected, setSelected] = useState({
    chats : true,
    novedades : false,
    llamadas : false
  })

  const [ search, setSearch ] = useState(false);
  const [ result, setResult ] = useState(false);
  const { form, formChange } = useForm({
    query_search : ""
  });

  const navigate = useNavigate();
  const location = useLocation();

  const handleSelected = (item : string) => {
    if(item === 'chat')
    {
      handlePageIndex(0);
      setSelected(() => {
        return {
          chats : true,
          novedades : false,
          llamadas : false
        }
      })
    }

    if(item === 'novedades')
    {
      handlePageIndex(1);
      setSelected(() => {
        return {
          chats : false,
          novedades : true,
          llamadas : false
        }
      })
    }

    if(item === 'llamadas')
    {
      setSelected(() => {
        return {
          chats : false,
          novedades : false,
          llamadas : true
        }
      })
    }

    if(location.pathname !== "/") navigate("/");
    setResult(false)
  }
  
  const handleSearchBar = (e : MouseEvent<HTMLInputElement>) => {
    e.stopPropagation()
    setSearch(!search)
  }

  const searchPerson = (e : KeyboardEvent<HTMLInputElement> ) =>{
    setSelected({
      chats : false,
      novedades : false,
      llamadas : false
    })

    if(e.key === 'Enter'){
      
      const regExEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

      if(regExEmail.test(form.query_search)){
        
      setResult(true)
      return navigate(`/query-result?email=${form.query_search}`);
      }

      setResult(true)
      return navigate(`/query-result?name=${form.query_search}`);
    }
  }

  const arrowNavigate = () => {
    setResult(false)
    navigate('/') 
  }

  useEffect(() => {
    text.length === 0 ? setResult(false) : ""
  },[text]);

  return (
    <>
    <NavbarContainer>
        <InfoContainer>
          <LogoText to={"/"}>ChillApp</LogoText>
          <SubInfoContainer>
          {
            result
            ? 
            (
              <AiOutlineArrowLeft onClick={arrowNavigate}/>
            )
            : 
            (
              <ToolsContainer 
              onClick={handleSearchBar}
              active={search}
              >
                <DivIcon></DivIcon>
                <DivInput>
                  <input
                  type='text'
                  placeholder='search'
                  name='query_search'
                  onClick={(e) => e.stopPropagation()}
                  onChange={formChange}
                  onKeyDown={searchPerson}
                  />
                </DivInput>
            </ToolsContainer>
            ) 
          }
          <PositionedMenu/>
          </SubInfoContainer>
        </InfoContainer>
        
        <SectionContainer>
            <SectionItem 
              isactive={selected.chats}
              onClick={() => handleSelected('chat')}
              >
              Chats
            </SectionItem>
            <SectionItem 
              isactive={selected.novedades}
              onClick={() => handleSelected('novedades')}
              >
              Novedades
            </SectionItem>
        </SectionContainer>
    </NavbarContainer>

  </>
  )
}
