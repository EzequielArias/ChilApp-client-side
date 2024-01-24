import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Paper from '@mui/material/Paper';
import { LeftArrow, RightArrow, AuthModal, ModalAvatars } from '../../components/styled-components';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Copyright } from '../../components';
import { Modal } from '../../components';

import { useState, useRef, useEffect } from "react"
import { Avatars } from '../../assets'
import { useFetchAndLoad, useForm } from "../../hooks";
import { LogIn, Register } from "../../services";
import { login } from "../../redux/slices";
import { useDispatch } from "react-redux";
import { AuthAdapter } from "../../adapter";
import { useNavigate } from "react-router-dom";

export const Auth = () => {

  const [ auth, setAuth ] = useState(false);
  const [ modal , setModal ] = useState(false)
  const [ currentIndexCard, setCurrentIndexCard] = useState(0)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialState = {
    password : "",
    email : "",
    avatar : "",
    name : ""
  }

  const { form, formChange, setForm } = useForm(initialState);
  const { callEndpoint } = useFetchAndLoad();
  const listRef = useRef<HTMLUListElement>(null);
  /**
   Crear un slider con fotos a modo de demostracion de la aplicacion en donde esta
   el gif japones del auth
   que sea unidireccional (
   que no importa a que lado vaya siempre agarre el siguiente o anterios)
   */
  useEffect(() => {
    if(listRef.current){
      let listCurrent = listRef.current

      if(listCurrent.querySelector("li > img")){
      let cardNode = listCurrent.querySelectorAll("li > img")[currentIndexCard]
        if(cardNode)
        {
          cardNode.scrollIntoView({
            behavior : "smooth"
          })
        }}
      }
  },[currentIndexCard])

  const succesfullLogIn = () => navigate("/");

  const handleIndexCard = (action : string) => {
    if(action === 'foward')
    {
      if(currentIndexCard + 1 >= Avatars.length) return;
      setCurrentIndexCard(currentIndexCard + 1);
    }
  
    if(action === 'back')
    {
      if(currentIndexCard <= 0) return;
      setCurrentIndexCard(currentIndexCard - 1);
    }
  }

  const handleImage = (e : any) => {
    if(!e.target.name){
      setForm((prev) => {
        return {
          ...prev,
          avatar : Avatars[currentIndexCard]
        }
      })
      setModal(false)
    }
  }

  const handleSubmit = async (e : any) => {
    e.preventDefault();
    
    const formData = {
        name : form.email.split("@")[0],
        email: form.email,
        password: form.password,
        img : form.avatar.split("/").at(-1) as string
      };

    const jsonData = JSON.stringify(formData);

    let tk : string;
    if(auth)
    {
      const { data } = await callEndpoint(Register(formData));
      dispatch(login(AuthAdapter(data)));
      tk = data.token;
    }else{
      const { data } = await callEndpoint(LogIn(jsonData))
      dispatch(login(AuthAdapter(data)));
      tk = data.token;
    }
    localStorage.setItem('jwt', tk);
    return succesfullLogIn();
  }

  const theme = createTheme();

  return (
    <>
      <Modal
        isOpen={modal}
        onClose={() => setModal(false)}
      >
        <LeftArrow onClick={() => handleIndexCard('back')} />
        <RightArrow onClick={() => handleIndexCard('foward')} />
        <AuthModal ref={listRef} >
          {
            Avatars.map((el, i) => {
              return (<>
              ( 
              <li key={i}>
                <ModalAvatars src={el} alt="" onClick={handleImage}/>
              </li> 
              )</>)
            })
          }  
        </AuthModal>
      </Modal>
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://i.pinimg.com/originals/19/d8/39/19d8394829eea19e19d1f3524052101e.gif)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              { auth ? "Registrarse" : "Iniciar sesion"}
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={formChange}
                value={form.email}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={formChange}
                value={form.password}
              />
              { auth && <>
              <Button 
                variant="contained"
                fullWidth
                sx={{ backgroundColor : 'purple'}}
                onClick={() => setModal(true)}
                >
                Elige un Avatar
              </Button>
              </>
              }
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Recuerdame"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, backgroundColor : 'purple' }}
              >
                  { auth ? "Registrarse" : "Iniciar Sesion"}
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Olvidaste tu contraseña ?
                  </Link>
                </Grid>
                <Grid item>
                  <Link variant="body2">
                    <span onClick={() => setAuth(!auth)}>
                      {
                      auth ?
                      "Tienes una cuenta ? Inicia sesion" 
                      : 
                      "No tienes una cuenta ? Registrarse."
                      }
                    </span>
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
    </>
  );
}

 /* return (
    <AuthContainer>
      { modal && 
      <ModalContainer>
        <LeftArrow onClick={() => handleIndexCard('back')} />
        <RightArrow onClick={() => handleIndexCard('foward')} />
       <AuthModal ref={listRef} >
        {
          Avatars.map((el, i) => {
            return (<>
            ( 
            <li key={i}>
              <ModalAvatars src={el} alt="" onClick={handleImage}/>
            </li> 
            )</>)
          })
        }  
       </AuthModal>
      </ModalContainer>
      }
      <AuthForm>
        {
          auth && 
          <AuthInputs
          type="text"
          name="name"
          placeholder="Tu nombre"
          onChange={formChange}
          value={form.name}
          />
        }
        <AuthInputs 
          type="email" 
          name="email" 
          placeholder=" Email"
          onChange={formChange}
          value={form.email}
          />
        <AuthInputs
         type="password" 
         name="password"
         placeholder="Password"
         onChange={formChange}
         value={form.password}
         />
        <AuthButton onClick={handleSubmit} >{auth ? 'Registrarse'  : 'Iniciar sesion' }</AuthButton>
        <AuthAdvice 
          onClick={() => setModal(true)}
          style={auth ? { display : 'block' } : { display : 'none' }}
          >Selecciona tu Avatar !</AuthAdvice>
        <AuthAdvice onClick={() => setAuth(!auth)}>
          {auth ? 'Ya tienes una cuenta ? Iniciar sesion' : 'No tienes una cuenta ? Registrarse'}
        </AuthAdvice>
      </AuthForm>
    </AuthContainer>
  )
*/