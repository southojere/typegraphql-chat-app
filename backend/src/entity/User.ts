import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index, OneToMany, BaseEntity } from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { Message } from "./Message";
import { Team } from "./Team";
import { IsEmail } from "class-validator";
import { Note } from "./Note";



@ObjectType()
@Entity("users")
export class User extends BaseEntity{

  @Field(() => String)
  @PrimaryGeneratedColumn()
  id: string;
  
  
//   @Field(() => String)
//   @Index({ unique: true })
//   @Column()
//   user_name: string;

  @Field()
  @Column()
  password: string;

  
  @Field()
  @Index({ unique: true })
  @IsEmail()
  @Column()
  email: string;


  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  updated_at: string;

  // associations

  @Field(() => [Message])
  @OneToMany(() => Message, message => message.user)
  messages: Message[];

  @Field(() => [Team])
  @OneToMany(() => Team, team => team.owner)
  ownedTeams: Team [];

  @Field(() =>  [Note])
  @OneToMany(() => Note, note => note.user)
  notes: Note[];

  @Field()
  newToken: string
  @Field()
  newRefreshToken: string

}
