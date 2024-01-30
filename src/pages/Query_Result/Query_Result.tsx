import { useSearchParams } from "react-router-dom"
import { useFetchAndLoad } from "../../hooks";
import { GetUsersByQuery } from "../../services/query_results";
import { getQueryUsers } from "../../redux/slices";
import { useDispatch, useSelector } from "react-redux";

// Styled-components 
import { QueryResultContainer, 
         ResultULContainer,      
        } from "../../components/styled-components";
import { useEffect } from "react";
import { Query_result_slot } from "../../components";
import { StoreType } from "../../redux/store";
import { Avatars } from '../../assets';
import { PageLoader } from "../../components";
import { useNotFound } from "../../context";
import { useNavigate } from "react-router-dom";

export const Query_Result = () => {

  const [ query ] = useSearchParams();
  const { loading, callEndpoint } = useFetchAndLoad();
  const { handleText } = useNotFound();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { results } = useSelector((state : StoreType) => state.query_results);

  useEffect(() => {
    const getQueryData = async () => {
      const tk = localStorage.getItem('jwt') as string;
  
      if(query.get('name'))
      {
        const name = query.get('name');
        const { data } = await callEndpoint(GetUsersByQuery(`?name=${name}`, tk));

        if(!data.length){
          handleText(`No se encontro a el usuario ${name}`, "Prueba buscando su email")
          navigate("NotFound404");
        }

        dispatch(getQueryUsers(data))
      }
  
      if(query.get('email'))
      {
        const email = query.get('email');
        const { data } = await callEndpoint(GetUsersByQuery(`?email=${email}`, tk));

        if(!data.length){
          handleText(`No se encontro a el usuario ${email}`, "Prueba buscando por su nombre")
          navigate("NotFound404");
        }

        dispatch(getQueryUsers(data))
      }
    }

    getQueryData()
  },[])


  return (
    <QueryResultContainer>
      <ResultULContainer>
        {
          (
            loading || results.length === 0 ) 
          ? 
          (
            <PageLoader/>
          ) 
          :
          (
            <>
              {
                results.map((el) => {
                  return (  
                    <Query_result_slot
                      key={el.id} 
                      el={el} 
                      Avatars={Avatars}
                      />
                  )
                })
              }
            </>
          )
        }
      </ResultULContainer>
    </QueryResultContainer>
  )
}
