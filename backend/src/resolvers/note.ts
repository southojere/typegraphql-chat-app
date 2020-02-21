import {
  Resolver,
  Mutation,
  Arg,
  Ctx,
  Root,
  FieldResolver,
  InputType,
  Field
} from "type-graphql";
import { User } from "../entity/User";
import { Note } from "../entity/Note";
import { findUserById } from "../entity/queries/user";
import { findNoteById } from "../entity/queries/note";

@InputType()
class NoteInput {
  @Field({
    nullable: true
  })
  complete?: boolean;
  @Field({
    nullable: true
  })
  text?: string;
}

@Resolver(of => Note)
class NoteResolver {
  @Mutation(() => Note)
  async createNote(@Ctx("user") user: User, @Arg("text") text: string) {
    return Note.create({
      text,
      user: user
    }).save();
  }

  @Mutation(() => Note)
  async updateNote(
    @Ctx("user") user: User,
    @Arg("noteId") noteId: number,
    @Arg("options", () => NoteInput) options: NoteInput
  ) {
    if (!user) throw new Error("No user found");
    const noteToEdit = await findNoteById(noteId);
    if (!noteToEdit) {
      throw new Error(`Could not find note (${noteId}) to edit.`);
    }
    if (`${noteToEdit.userId}` !== `${user.id}`) {
      throw new Error("Cannot edit someone elses note");
    }
    await Note.update(noteToEdit, options);
    return await findNoteById(noteId);
  }

  @Mutation(() => Boolean)
  async deleteNote(@Ctx("user") user: User, @Arg("noteId") noteId: number) {
    const noteToRemove = await Note.findOne({
      where: {
        id: noteId
      }
    });
    if (!noteToRemove) {
      throw new Error(`Could not find note (${noteId}) to remove.`);
    }
    if (`${noteToRemove.userId}` !== `${user.id}`) {
      throw new Error("Cannot remove someone elses note");
    }
    return !!(await Note.remove(noteToRemove));
  }

  @FieldResolver()
  async user(@Root() note: Note): Promise<User | undefined> {
    return await findUserById(note.userId);
  }
}

export { NoteResolver };
