import { useMemo, useState } from "react";
import { Button, Grid, TextField, Typography, Link, Alert } from "@mui/material"
import { Link as routerLink } from "react-router-dom"
import { AuthLayout } from "../layout/AuthLayout"
import { useForm } from "../../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import { startCreatingUserWithEmailPassword } from "../../store/thunks";


const formData = {
  email: '',
  password: '',
  displayName: ''
}

 const formValidations = {
    email: [(value) => value.includes("@"), "El correo debe de tener un @"],
    password: [
      (value) => value.length >= 6,
      "El password debe tener mas de 6 letras",
    ],
    displayName: [(value) => value.length >= 1, "El nombre es obligatorio"],
  };

export const RegisterPage = () => {

  const dispatch = useDispatch();
  const [formSubmitted, setFormSubmitted] = useState(false);

  const { formState, displayName, email, password, onInputChange,
    isFormValid, displayNameValid, emailValid, passwordValid } = useForm(formData, formValidations);
  
  const { status, errorMessage } = useSelector((state) => state.auth);
  const isCheckingAuthentication = useMemo(() => status === 'checking', [status]);
  
  const onSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true);
    if (!isFormValid) return;
    
    dispatch(startCreatingUserWithEmailPassword(formState));
  }
  
  return (
    <AuthLayout title="Crear Cuenta">
      <form onSubmit={onSubmit} className="animate__animated animate__fadeIn animate__faster">
          <Grid container>
            <Grid item xs={12} sx={{mt:2}}>
              <TextField
                label="Nombre Completo"
                type="text"
                placeholder="Juan Herrera"
                fullWidth
                name="displayName"
                value={displayName}
                onChange={onInputChange}
                error={!!displayNameValid && formSubmitted}
                helperText={displayNameValid}>
                </TextField>
            </Grid>
            <Grid item xs={12} sx={{mt:2}}>
              <TextField
                label="Correo"
                type="email"
                placeholder="correo@google.com"
                fullWidth
                name="email"
                value={email}
                onChange={onInputChange}
                error={!!emailValid && formSubmitted}
                helperText={emailValid}></TextField>
            </Grid>
            
             <Grid item xs={12} sx={ {mt:2}}>
              <TextField
                label="Contrasena"
                type="password"
                placeholder="Contrasena"
                fullWidth
                name="password"
                value={password}
                onChange={onInputChange}
                error={!!passwordValid && formSubmitted}
                helperText={passwordValid}></TextField>
            </Grid>

            <Grid container spacing={2} sx={ {mb:2, mt:1}}>
              <Grid item xs={12} display={!!errorMessage ? '' : 'none'}>
              <Alert severity="error">{errorMessage}</Alert>
             </Grid>
              <Grid item xs={12}>
              <Button type="submit" variant='contained' fullWidth disabled={ isCheckingAuthentication } >Crear cuenta</Button>
             </Grid>
           
            </Grid>
          <Grid container direction='row' justifyContent='end'>
            <Typography sx={{mr:1}}>Ya tienes cuenta?</Typography>
              <Link component={routerLink} color="inherit" to="/auth/login">
                ingresar
              </Link>
            </Grid>
          </Grid>

        </form>
   </AuthLayout>
        

  )
}
