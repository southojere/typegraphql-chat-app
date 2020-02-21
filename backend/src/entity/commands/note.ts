import { Note } from "../Note";

const updateNote = (note: Note, options = {}) => {
    return Note.update(note,options);
}

export {updateNote}