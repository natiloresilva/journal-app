import { db } from "../firebase/firebase-config"
import { collection, addDoc, doc, updateDoc } from "firebase/firestore";
import { types } from "../types/types";
import { loadNotes } from "../helpers/loadNotes";
import Swal from "sweetalert2";


export const startNewNote = () => {
    return async (dispatch, getState) => {

        // getState es una función que nos va a permitir recuperar el estate de nuestra app
        const { uid } = getState().auth

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        }

        const doc = await addDoc(collection(db, `${uid}`, "journal/notes"), {
            title: '',
            body: '',
            date: new Date().getTime()
        })

        dispatch(activeNote(doc.id, newNote))
    }
}

export const activeNote = (id, note) => ({
    type: types.notesActive,
    payload: {
        id,
        ...note
    }
})

export const startLoadingNotes = (uid) => {
    return async (dispatch) => {
        const notes = await loadNotes(uid)
        dispatch(setNotes(notes))
    }
}

export const setNotes = (notes) => ({
    type: types.notesLoad,
    payload: notes
})

export const startSaveNote = (note) => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth

        if (!note.url) {
            delete note.url
        }

        const noteToFirestore = { ...note }
        delete noteToFirestore.id
        const noteRef = doc(db, `${uid}/journal/notes/${note.id}`)
        await updateDoc(noteRef, noteToFirestore)

        dispatch(refreshNote(note.id, noteToFirestore))

        Swal.fire('Saved', note.title, 'success')
    }
}

export const refreshNote = (id, note) => ({
    type: types.notesUpdated,
    payload: {
        id,
        note: {
            id,
            ...note
        }
    }
})