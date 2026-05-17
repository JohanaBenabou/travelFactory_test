import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from "typeorm";

import { VacationRequest } from "./VacationRequest";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  role!: string;

  @OneToMany(
    () => VacationRequest,
    (request) => request.user
  )
  requests!: VacationRequest[];
}