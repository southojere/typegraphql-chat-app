import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, BaseEntity } from "typeorm";
import { Message } from "./Message";
import { Team } from "./Team";
import { ObjectType, Field } from "type-graphql";


@ObjectType()
@Entity("channels")
export class Channel extends BaseEntity{
  
  @Field()
  @PrimaryGeneratedColumn()
  id: number;


  @Field()
  @Column()
  name: string;

  
  @Field()
  @Column({
    default: false
  })
  public: boolean;

  
  @OneToMany(() => Message, message => message.channel)
  messages: Message[];

  @ManyToOne(() => Team, team => team.channels)
  team:Team;

}
