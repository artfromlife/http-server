import { Entity, Column } from 'typeorm';
import { CustomBaseEntity } from '../../common/custom-base.entity';

@Entity()
export class User extends CustomBaseEntity {

  @Column()
  userName: string;

  @Column()
  realName: string;

  @Column({
    type: 'uuid'
  })
  creator: string;
}
