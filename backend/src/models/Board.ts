import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { User } from './User';
import { KanbanColumn } from './KanbanColumn';
import { ContentCard } from './ContentCard';

@Entity('boards')
export class Board {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column()
  description!: string;

  @Column()
  ownerId!: string;

  @ManyToOne(() => User, (user) => user.boards)
  @JoinColumn({ name: 'ownerId' })
  owner!: User;

  @OneToMany(() => KanbanColumn, (column) => column.board)
  columns!: KanbanColumn[];

  @OneToMany(() => ContentCard, (card) => card.board)
  cards!: ContentCard[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}