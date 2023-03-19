import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { CloudFireStore } from "../../firebase/config";
import {
  addNewEmtyNote,
  setActiveNote,
  savingNewNote,
  setNotes,
  setSaving,
  updateNote,
  setPhotosToActiveNote,
  deleteNoteById,
} from "./journaSlice";
import { loadNotes } from "../../helpers/loadNotes";
import { fileUpload } from "../../helpers/fileUpload";

export const startNewNote = () => {
  return async (dispatch, getState) => {
    dispatch(savingNewNote());

    const { uid } = getState().auth;
    const newNote = {
      title: "",
      body: "",
      date: new Date().getTime(),
    };

    const newDoc = doc(collection(CloudFireStore, `${uid}/journal/notes`));
    await setDoc(newDoc, newNote);
    newNote.id = newDoc.id;

    dispatch(addNewEmtyNote(newNote));
    dispatch(setActiveNote(newNote));
  };
};

export const startLoadingNotes = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    if (!uid) throw new Error("El UID del usuario no existe");
    const notes = await loadNotes(uid);
    dispatch(setNotes(notes));
  };
};

export const startSaveNote = () => {
  return async (dispatch, getState) => {
    dispatch(setSaving());
    const { uid } = getState().auth;
    const { active: note } = getState().journal;

    const noteToFireStore = { ...note };
    delete noteToFireStore.id;
    const docRef = doc(CloudFireStore, `${uid}/journal/notes/${note.id}`);
    await setDoc(docRef, noteToFireStore, { merge: true });
    dispatch(updateNote(note));
  };
};

export const startUploadingFile = (files = []) => {
  return async (dispatch) => {
    dispatch(setSaving());
    //await fileUpload(files[0]);
    const fileUploadPromise = [];
    for (const file of files) {
      fileUploadPromise.push(fileUpload(file));
    }
    const photosUrls = await Promise.all(fileUploadPromise);

    dispatch(setPhotosToActiveNote(photosUrls));
  };
};

export const startDeletingNote = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    const { active: note } = getState().journal;

    const docRef = doc(CloudFireStore, `${uid}/journal/notes/${note.id}`);
    await deleteDoc(docRef);
    console.log(note);
    dispatch(deleteNoteById(note.id));
    console.log(note);
  };
};
