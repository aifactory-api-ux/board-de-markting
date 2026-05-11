import AWS from 'aws-sdk';
import { config } from '../../shared/config';

const s3 = new AWS.S3({
  region: config.s3.region,
  accessKeyId: config.s3.accessKeyId,
  secretAccessKey: config.s3.secretAccessKey,
});

export async function uploadFile(file: Buffer, filename: string, mimetype: string): Promise<string> {
  const result = await s3.upload({
    Bucket: config.s3.bucket,
    Key: filename,
    Body: file,
    ContentType: mimetype,
  }).promise();

  return result.Location;
}

export async function deleteFile(filename: string): Promise<void> {
  await s3.deleteObject({
    Bucket: config.s3.bucket,
    Key: filename,
  }).promise();
}

export function getSignedUrl(filename: string): string {
  return s3.getSignedUrl('getObject', {
    Bucket: config.s3.bucket,
    Key: filename,
    Expires: 3600,
  });
}

export { s3 };