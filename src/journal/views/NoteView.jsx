import { SaveOutlined } from '@mui/icons-material'
import { Grid, Typography, Button, TextField } from '@mui/material'
import { ImageGallery } from '../components/ImageGallery'

export const NoteView = () => {
    return (
        <Grid
            container
            direction='row'
            justifyContent='space-between'
            alignItems='center'
          sx={{ mb: 1 }}>
          
          <Grid item>
              <Typography fontSize={39} fontWeight='light'>04 de Enero del 2023</Typography>
          </Grid>

          <Grid item>
              
              <Button color='primary' sx={{padding: 2}}>
                  <SaveOutlined sx={{ fontSize: 30, mr: 1 }}></SaveOutlined>
                  Guardar
              </Button>

            </Grid>
            <Grid container>
                <TextField
                    type='text'
                    variant='filled'
                    fullWidth
                    placeholder='Ingrese un titulo'
                    label="Titulo"
                    sx={{ border: 'none', mb: 1 }}></TextField>
                
                <TextField
                    type='text'
                    variant='filled'
                    fullWidth
                    multiline
                    placeholder='Que sucedio hoy?'
                    minRows={5}></TextField>
            </Grid>
            <ImageGallery></ImageGallery>

      </Grid>
  )
}
