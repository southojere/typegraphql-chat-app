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
    const note = await findNoteById(noteId);
    if (!note) throw new Error(`No note found with id of ${noteId}`);
    await Note.update(note, options);
    return await findNoteById(noteId);
  }

  @FieldResolver()
  async user(@Root() note: Note): Promise<User | undefined> {
    return await findUserById(note.userId);
  }
}

export { NoteResolver };
