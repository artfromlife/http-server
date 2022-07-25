import { Entity, Column } from 'typeorm';
import { CustomBaseEntity } from '../../base/custom-base.entity';

@Entity()
export class User extends CustomBaseEntity {

  @Column({
    length: 100
  })
  firstName: string;

  @Column()
  lastName: string;

  @Column({ default: true })
  isActive: boolean;
}
