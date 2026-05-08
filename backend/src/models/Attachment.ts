import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ContentCard } from './ContentCard';

@Entity('attachments')
export class Attachment {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  cardId!: string;

  @ManyToOne(() => ContentCard, (card) => card.attachments)
  @JoinColumn({ name: 'cardId' })
  card!: ContentCard;

  @Column()
  filename!: string;

  @Column()
  url!: string;

  @Column()
  uploadedBy!: string;

  @CreateDateColumn()
  uploadedAt!: Date;
}