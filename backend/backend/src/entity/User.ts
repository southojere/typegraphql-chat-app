import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index, OneToMany, BaseEntity } from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { Message } from "./Message";
import { Team } from "./Team";



@ObjectType()
@Entity("users")
export class User extends BaseEntity{

  @Field(() => String)
  @PrimaryGeneratedColumn("uuid")
  id: string;
  
  
  @Field(() => String)
  @Index({ unique: true })
  @Column()
  user_name: string;

  @Field()
  @Column()
  password: string;

  
  @Field()
  @Index({ unique: true })
  @Column()
  email: string;


  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  updated_at: string;

  // associations

  @OneToMany(() => Message, message => message.user)
  messages: Message[];

  @OneToMany(() => Team, team => team.owner)
  ownedTeams: Team [];


}
