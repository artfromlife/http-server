import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class CustomBaseEntity {
  @PrimaryGeneratedColumn('uuid', {comment: '主键'})
  id: string

  @CreateDateColumn({comment: '创建时间'})
  createTime: Date

  @UpdateDateColumn({comment: '更新时间'})
  updateTime: Date

  @DeleteDateColumn({comment: '删除时间'})
  deleteTime: Date

  @Column({ type: 'uuid', comment: '创建者ID' })
  creator: string;

  @Column({ type: 'uuid', comment: '修改者ID' })
  lastUpdater: string;
}
