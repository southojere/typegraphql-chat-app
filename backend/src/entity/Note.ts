import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity } from "typeorm";

import { User } from "./User";
import { ObjectType, Field } from "type-graphql";

@ObjectType()
@Entity("notes")
export class Note extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;


  @Column()
  userId: number;

  @Field()
  @Column()
  text: string;

  @Field()
  @Column({default: false})
  complete: boolean;
  
  @Field(() => User)
  @ManyToOne(() => User, user => user.notes)
  user: User;

}
