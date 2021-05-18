import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity('chats')
export class Chat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  text: string;

  @Column()
  lang: string;
}
