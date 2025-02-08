import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ unique: true })
  email: string;

  //OAuth로 가입한 유저는 null
  @Column({ nullable: true })
  password: string;

  @Column()
  username: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdDt: Date = new Date();

  //id, 비번으로 가입한 유저는 null
  @Column({ nullable: true })
  providerId: string;
}
