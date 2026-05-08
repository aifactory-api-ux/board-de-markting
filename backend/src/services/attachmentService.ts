import { AppDataSource } from '../config/db';
import { Attachment } from '../models/Attachment';
import { ContentCard } from '../models/ContentCard';
import { uploadFile } from '../utils/s3';

const attachmentRepository = AppDataSource.getRepository(Attachment);

export async function uploadAttachment(cardId: string, file: Buffer, filename: string, mimetype: string, uploadedBy: string): Promise<Attachment> {
  const card = await AppDataSource.getRepository(ContentCard).findOne({ where: { id: cardId } });
  if (!card) {
    throw new Error('Card not found');
  }

  const url = await uploadFile(file, `attachments/${cardId}/${filename}`, mimetype);

  const attachment = attachmentRepository.create({
    cardId,
    filename,
    url,
    uploadedBy,
  });

  return attachmentRepository.save(attachment);
}

export async function deleteAttachment(id: string): Promise<void> {
  const attachment = await attachmentRepository.findOne({ where: { id } });
  if (!attachment) {
    throw new Error('Attachment not found');
  }
  await attachmentRepository.remove(attachment);
}