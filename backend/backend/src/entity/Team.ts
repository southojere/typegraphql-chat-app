import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, ManyToMany, JoinTable } from "typeorm";
import { User } from "./User";
import { Channel } from "./Channel";


@Entity("teams")
export class Team {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  name: string;

  @ManyToOne(() => User, user => user.ownedTeams)
  owner: User

  @OneToMany(() => Channel, channel => channel.team)
  channels: Channel[]

  @ManyToMany(() => User)
  @JoinTable({
      name:"teamHasUsers"
  })
  members: User[];

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  updated_at: string;
}
