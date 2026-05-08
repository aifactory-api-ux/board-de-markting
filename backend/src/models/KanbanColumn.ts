import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Board } from './Board';
import { ContentCard } from './ContentCard';

@Entity('kanban_columns')
export class KanbanColumn {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  boardId!: string;

  @ManyToOne(() => Board, (board) => board.columns)
  @JoinColumn({ name: 'boardId' })
  board!: Board;

  @Column()
  name!: string;

  @Column({ type: 'int' })
  order!: number;

  @OneToMany(() => ContentCard, (card) => card.column)
  cards!: ContentCard[];
}