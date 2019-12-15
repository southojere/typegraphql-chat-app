import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

import { User } from "./User";
import { Channel } from "./Channel";

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;


  @Column()
  msg: string;

  
  @ManyToOne(() => User, user => user.messages)
  user: User;

  @ManyToOne(() => Channel, channel => channel.messages)
  channel: Channel;

}
