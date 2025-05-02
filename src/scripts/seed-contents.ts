import { NestFactory } from '@nestjs/core';
import { Types } from 'mongoose';
import { AppModule } from 'src/app.module';
import { ContentsService } from 'src/contents/contents.service';
import { BlockDto } from 'src/contents/dto/block.dto';
import { IBlock } from 'src/contents/interfaces/block.interface';
import { UsersService } from 'src/users/users.service';

const fishImages = [
  'https://huy-bucket-intern.s3.us-east-1.amazonaws.com/upload/acb6ebc7-3fbf-400e-8564-96638ab09469.jpg',
  'https://huy-bucket-intern.s3.us-east-1.amazonaws.com/upload/bde5bbc8-6160-4012-bf58-fedfb341de1a.jpg',
  'https://huy-bucket-intern.s3.us-east-1.amazonaws.com/upload/e731fd55-3eaf-43c3-ae45-20cdbbce215c.jpg',
];

const catImages = [
  'https://huy-bucket-intern.s3.us-east-1.amazonaws.com/upload/a1792091-a325-4a26-bca3-0028f5253303.jpg',
  'https://huy-bucket-intern.s3.us-east-1.amazonaws.com/upload/44f35487-bf1f-4da7-9fd9-6c49731bee74.jpg',
  'https://huy-bucket-intern.s3.us-east-1.amazonaws.com/upload/edaedb90-afa0-4c86-8752-be5bf7990273.jpg',
];

const catVideos = [
  'https://huy-bucket-intern.s3.us-east-1.amazonaws.com/upload/e2eec40d-5330-4a14-b8ec-812be99dfe85.mp4',
  'https://huy-bucket-intern.s3.us-east-1.amazonaws.com/upload/040232cb-f1d1-490d-a857-fa985f084979.mp4',
];

const sampleParagraphs = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Fusce at metus ut sapien eleifend sollicitudin.',
  'Vivamus nec velit eu purus vestibulum lobortis.',
  'Sed ut perspiciatis unde omnis iste natus error sit voluptatem.',
];

const sampleTitles = [
  'Fish: Diverse creatures of the ocean.',
  'Cat: How cute these species!',
  'Content from the world',
  'Discover new life under water',
  'Lovely kittens and playful paws',
];

function getRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateBlocksForTitle(title: string): IBlock[] {
  const blocks: IBlock[] = [];

  const blockCount = Math.floor(Math.random() * 5) + 3; // 3–7 blocks

  const isCat = title.toLowerCase().includes('cat');
  const isFish = title.toLowerCase().includes('fish');

  const sources = {
    images: isCat
      ? catImages
      : isFish
        ? fishImages
        : [...catImages, ...fishImages],
    videos: isCat
      ? catVideos
      : isFish
        ? [] // fish không có video
        : catVideos,
  };

  while (blocks.length < blockCount) {
    const type = getRandom(['text', 'image', 'video']);

    if (type === 'text') {
      blocks.push({
        type: 'text',
        headings: [getRandom(['Intro', 'Fact', 'Note', 'Topic'])],
        paragraphs: [
          getRandom(sampleParagraphs),
          Math.random() > 0.5 ? getRandom(sampleParagraphs) : '',
        ].filter(Boolean), // tránh đoạn rỗng
      });
    } else if (type === 'image') {
      blocks.push({
        type: 'image',
        url: getRandom(sources.images),
      });
    } else if (type === 'video' && sources.videos.length > 0) {
      blocks.push({
        type: 'video',
        url: getRandom(sources.videos),
      });
    }
  }

  return blocks;
}

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const contentService = app.get(ContentsService);
  const userService = app.get(UsersService);

  const userEmails = [
    'admin@example.com',
    'admin1@example.com',
    'admin2@example.com',
    'admin3@example.com',
  ];
  const users = await Promise.all(
    userEmails.map((email) => userService.findByEmail(email)),
  );
  const userIds = users.filter(Boolean).map((u) => u!._id as Types.ObjectId);

  if (userIds.length === 0) {
    console.error('❌ Không tìm thấy user nào để seed content.');
    process.exit(1);
  }

  for (let i = 0; i < sampleTitles.length; i++) {
    const title = sampleTitles[i];
    const blocks = generateBlocksForTitle(title);
    const creator = getRandom(userIds);
    const updater = getRandom(userIds);

    const content = {
      title,
      blocks,
      createdBy: creator,
      updatedBy: updater,
    };

    await contentService.create(content);
    console.log(`✅ Seeded content: "${title}"`);
  }

  await app.close();
  process.exit(0);
}

bootstrap();
