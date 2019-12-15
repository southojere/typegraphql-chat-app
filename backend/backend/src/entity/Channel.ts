import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm";
import { Message } from "./Message";
import { Team } from "./Team";


@Entity()
export class Channel {
  @PrimaryGeneratedColumn()
  id: number;


  @Column()
  name: string;

  
  @Column()
  public: boolean;

  
  @OneToMany(() => Message, message => message.channel)
  messages: Message[];

  @ManyToOne(() => Team, team => team.channels)
  team:Team;

}
