import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index, OneToMany } from "typeorm";

import { Message } from "./Message";
import { Team } from "./Team";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: number;
  
  @Index({ unique: true })
  @Column()
  userName: string;

  @Column()
  firstName: string;

  @Column()
  password: string;

  @Index({ unique: true })
  @Column()
  email: string;

  // associations

  @OneToMany(() => Message, message => message.user)
  messages: Message[];

  @OneToMany(() => Team, team => team.owner)
  ownedTeams: Team [];

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  updated_at: string;
}
