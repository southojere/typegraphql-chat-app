import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity } from "typeorm";

import { User } from "./User";
import { Channel } from "./Channel";
import { ObjectType, Field } from "type-graphql";

@ObjectType()
@Entity("messages")
export class Message extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;


  @Field()
  @Column()
  msg: string;

  
  @Field(() => User)
  @ManyToOne(() => User, user => user.messages)
  user: User;


  @Field(() => Channel)
  @ManyToOne(() => Channel, channel => channel.messages)
  channel: Channel;

}
