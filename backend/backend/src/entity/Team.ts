import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, ManyToMany, JoinTable, BaseEntity } from "typeorm";
import { User } from "./User";
import { Channel } from "./Channel";
import { ObjectType, Field } from "type-graphql";

@ObjectType()
@Entity("teams")
export class Team extends BaseEntity{

  @Field()
  @PrimaryGeneratedColumn()
  id: number;
  
  @Field(() => String)
  @Column()
  name: string;

  
  @Field(() => User)
  @ManyToOne(() => User, user => user.ownedTeams)
  owner: User

  
  @Field(() => [Channel])
  @OneToMany(() => Channel, channel => channel.team)
  channels: Channel[]

  
  @Field(() => [User])
  @ManyToMany(() => User)
  @JoinTable({
      name:"teamHasUsers"
  })
  members: User[];

  
  @Field()
  @CreateDateColumn()
  created_at: string;

  
  @Field()
  @UpdateDateColumn()
  updated_at: string;
}
