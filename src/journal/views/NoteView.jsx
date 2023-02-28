import { SaveOutlined } from "@mui/icons-material";
import { Grid, Typography, Button, TextField } from "@mui/material";
import { ImageGallery } from "../components/ImageGallery";
import {useForm} from "../../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo } from "react";
import {setActiveNote} from "../../store/journal/journaSlice";
import { startSaveNote } from "../../store/journal/thunks";
export const NoteView = () => {

  const dispatch = useDispatch();

  const  { active:note } = useSelector(state => state.journal)

  const {body, title, date, onInputChange, formState} = useForm(note);

  const dateString = useMemo(()=>{
    const newDate = new Date(date);
    return newDate.toUTCString();
  },[date])

  useEffect(()=>{
    dispatch(setActiveNote(formState));
  },[formState])

  const onSavetNote = () =>{
    dispatch(startSaveNote());
  }

  return (
    <Grid
      className="animate__animated animate__fadeIn animate__faster"
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{ mb: 1 }}
    >
      <Grid item>
        <Typography fontSize={39} fontWeight="light">
         {dateString}
        </Typography>
      </Grid>

      <Grid item>
        <Button 
        onClick={onSavetNote}
        color="primary" 
        sx={{ padding: 2 }}
        >
          <SaveOutlined sx={{ fontSize: 30, mr: 1 }}></SaveOutlined>
          Guardar
        </Button>
      </Grid>
      <Grid container>
        <TextField
          type="text"
          variant="filled"
          fullWidth
          placeholder="Ingrese un titulo"
          label="Titulo"
          sx={{ border: "none", mb: 1 }}
          name='title'
          value={title}
          onChange={onInputChange}
        ></TextField>

        <TextField
          type="text"
          variant="filled"
          fullWidth
          multiline
          placeholder="Que sucedio hoy?"
          minRows={5}
          name='body'
          value={body}
          onChange={onInputChange}
        ></TextField>
      </Grid>
      <ImageGallery></ImageGallery>
    </Grid>
  );
};
