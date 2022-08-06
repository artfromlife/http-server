import { Entity, Column } from 'typeorm';
import { CustomBaseEntity } from '../../common/custom-base.entity';

@Entity({
  synchronize: true,
  orderBy: {
    // 每次查表都会默认的排序
    updateTime: "DESC"
  }
})
export class User extends CustomBaseEntity {

  @Column({comment: '用户名'})
  userName: string;

  @Column({comment: '真实姓名',default: ''})
  realName: string;

  @Column({comment: '用户密码'})
  password: string;

}
