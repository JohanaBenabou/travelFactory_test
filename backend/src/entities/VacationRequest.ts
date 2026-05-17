import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from "typeorm";

import { User } from "./User";

@Entity()
export class VacationRequest {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(
    () => User,
    (user) => user.requests
  )
  user!: User;

  @Column()
  start_date!: string;

  @Column()
  end_date!: string;

  @Column({
    nullable: true,
  })
  reason!: string;

  @Column({
    default: "Pending",
  })
  status!: string;

  @Column({
    nullable: true,
  })
  comments!: string;

  @CreateDateColumn()
  created_at!: Date;
}