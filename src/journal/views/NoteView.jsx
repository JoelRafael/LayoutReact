import { DeleteOutline, SaveOutlined, UploadOutlined } from "@mui/icons-material";
import { Grid, Typography, Button, TextField, IconButton } from "@mui/material";
import { ImageGallery } from "../components/ImageGallery";
import { useForm } from "../../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useRef } from "react";
import { setActiveNote } from "../../store/journal/journaSlice";
import { startDeletingNote, startSaveNote, startUploadingFile } from "../../store/journal/thunks";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";
export const NoteView = () => {
  const dispatch = useDispatch();

  const {
    active: note,
    messageSaved,
    isSaving,
  } = useSelector((state) => state.journal);

  const { body, title, date, onInputChange, formState } = useForm(note);

  const dateString = useMemo(() => {
    const newDate = new Date(date);
    return newDate.toUTCString();
  }, [date]);

  const fileInputReft = useRef();
  useEffect(() => {
    dispatch(setActiveNote(formState));
  }, [formState]);

  useEffect(() => {
    if (messageSaved.length > 0) {
      Swal.fire("Nota actualizada", messageSaved, "success");
    }
  }, [messageSaved]);
  const onSavetNote = () => {
    dispatch(startSaveNote());
  };

  const onFileInputChange = ({ target }) => {
    if (target.files === 0) return
    
   dispatch(startUploadingFile(target.files));
  }
  const onDeleteNote = () => {
 
    dispatch(startDeletingNote());
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


      <input
        type="file"
        multiple
        ref={fileInputReft}
        onChange={onFileInputChange}
        style={{display:'none'}}>
      </input>
      
      <IconButton
        color="primary"
        disabled={isSaving}
        onClick={() => fileInputReft.current.click()}
      >
        <UploadOutlined> 
        </UploadOutlined>
      </IconButton>
      
      <Grid item>
        <Button
          disabled={isSaving}
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
          name="title"
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
          name="body"
          value={body}
          onChange={onInputChange}
        ></TextField>
      </Grid>

      <Grid container justifyContent='end'>
        <Button 
          onClick={onDeleteNote}
          sx={{ mt: 2 }}
          color='error'>
           <DeleteOutline>
          Borrar
        </DeleteOutline>
        </Button>

      </Grid>
      <ImageGallery images={ note.imageUrls}></ImageGallery>
    </Grid>
  );
};
