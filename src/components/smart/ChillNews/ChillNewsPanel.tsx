import { useEffect, useState } from 'react'
import { Modal } from '../..';

// Services & Actions
import { 
  getChillnews as getAllDataFromApi,
  addChillNew as addToApi,
  updateChillNew as updateToApi, 
  removeChillNew as removeFromApi 
  } from '../../../services';
import { getChillNews } from '../../../redux/slices';

// Hooks
import { useFetchAndLoad, useForm } from '../../../hooks';
import { useDispatch } from 'react-redux';

// Styled Components
import { ChillNewsContainer, ChillNewsInputContainer, ChillNewsSubmitButton } from '../../styled-components/ChillNewsContainer';

// Components 
import { ChillNewsForm } from './ChillNewsForm';
import { ChillNewsList } from './ChillNewsList';
import { TextField } from '@mui/material';

export const ChillNewsPanel = () => {

  const formData = { content : "" }

  const dispatch = useDispatch();

  const { form, formChange } = useForm(formData);
  const { callEndpoint } = useFetchAndLoad();

  const [ IsFormOpen, setIsFormOpen ] = useState<boolean>(false);
  
  const handleList = async () => {
    const { data } = await callEndpoint(getAllDataFromApi()) 
    dispatch(getChillNews(data))
  };

  const handleRemove = () => {}

  const handleSubmit = () => {};

  useEffect(() => {
    handleList();
  },[])

  return (
    <ChillNewsContainer>
      <ChillNewsInputContainer>

        <TextField
          id="outlined-multiline-static"
          label="Sube una ChillNews"
          multiline
          rows={4}
          defaultValue="ChillNews"
          sx={{ backgroundColor : "white", width : "100%"}}
        />
        <ChillNewsSubmitButton>Publicar</ChillNewsSubmitButton>
      </ChillNewsInputContainer>

      <ChillNewsForm 
        submit={handleSubmit}
        remove={handleRemove}
      />
      <ChillNewsList
      
      />
    </ChillNewsContainer>
  )
}
 