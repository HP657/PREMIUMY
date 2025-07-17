import { Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Content {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  relatedUrl: string;

  @Column({ type: "text" })
  description: string;

  // @Column({ default: false })
  // isPaid: boolean;
  //
  // @Column({ type: 'int', default: 0 })
  // price: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToMany(() => User, (user) => user.contents, {onDelete: "CASCADE"})
  user: User;
}
