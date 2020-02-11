import { Note } from "../Note";


const findNoteById = (id: number) => {
    return Note.findOne({
        where: {
            id,
        }
    })
}


export {findNoteById}