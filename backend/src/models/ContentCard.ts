import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Board } from './Board';
import { KanbanColumn } from './KanbanColumn';
import { Attachment } from './Attachment';

@Entity('content_cards')
export class ContentCard {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  boardId!: string;

  @ManyToOne(() => Board, (board) => board.cards)
  @JoinColumn({ name: 'boardId' })
  board!: Board;

  @Column()
  columnId!: string;

  @ManyToOne(() => KanbanColumn, (column) => column.cards)
  @JoinColumn({ name: 'columnId' })
  column!: KanbanColumn;

  @Column()
  title!: string;

  @Column({ type: 'text' })
  description!: string;

  @Column({ type: 'enum', enum: ['idea', 'en_redaccion', 'en_revision', 'aprobado', 'publicado', 'bloqueado'], default: 'idea' })
  status!: 'idea' | 'en_redaccion' | 'en_revision' | 'aprobado' | 'publicado' | 'bloqueado';

  @Column({ nullable: true })
  assigneeId!: string | null;

  @Column({ nullable: true, type: 'timestamp' })
  dueDate!: string | null;

  @Column({ type: 'simple-array', nullable: true })
  tags!: string[];

  @OneToMany(() => Attachment, (attachment) => attachment.card)
  attachments!: Attachment[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}