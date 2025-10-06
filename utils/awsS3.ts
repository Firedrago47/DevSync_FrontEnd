// utils/awsS3.ts
import AWS from 'aws-sdk';

const s3 = new AWS.S3({
  accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
  region: process.env.NEXT_PUBLIC_AWS_REGION,
});

export const getFileContentFromS3 = async (fileId: string): Promise<string> => {
  try {
    const { Body } = await s3.getObject({
      Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME!,
      Key: `${fileId}.txt`,
    }).promise();

    return Body?.toString() || '';
  } catch (err) {
    console.error('S3 fetch error', err);
    return ''; // Return empty if file does not exist
  }
};
