import { Google } from "@mui/icons-material"
import { Button, Grid, TextField, Typography, Link } from "@mui/material"
import { Link as routerLink } from "react-router-dom"
import { AuthLayout } from "../layout/AuthLayout"

export const RegisterPage = () => {
  return (
   <AuthLayout title="Crear Cuenta">
      <form>
          <Grid container>
            <Grid item xs={12} sx={{mt:2}}>
              <TextField
                label="Nombre Completo"
                type="text"
                placeholder="Juan Herrera"
                fullWidth></TextField>
            </Grid>
            <Grid item xs={12} sx={{mt:2}}>
              <TextField
                label="Correo"
                type="email"
                placeholder="correo@google.com"
                fullWidth></TextField>
            </Grid>
            
             <Grid item xs={12} sx={ {mt:2}}>
              <TextField
                label="Contrasena"
                type="password"
                placeholder="Contrasena"
                fullWidth></TextField>
            </Grid>

            <Grid container spacing={2} sx={ {mb:2, mt:1}}>
              <Grid item xs={12}>
                <Button variant='contained' fullWidth >Crear cuenta</Button>
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
