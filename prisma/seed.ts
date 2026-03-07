import {
  Category as PrismaCategory,
  Prisma,
  PostStatus as PrismaPostStatus,
} from "@prisma/client";
import { prisma } from "../src/lib/prisma";
import type { ResourceLink } from "../src/lib/post-types";
import { posts } from "../src/lib/seed-posts";

function toPrismaCategory(category: string): PrismaCategory {
  switch (category) {
    case "insurance":
      return PrismaCategory.insurance;
    case "taxes":
      return PrismaCategory.taxes;
    case "real-estate":
      return PrismaCategory.real_estate;
    case "immigration":
      return PrismaCategory.immigration;
    case "tech":
      return PrismaCategory.tech;
    case "life":
      return PrismaCategory.life;
    default:
      throw new Error(`Unsupported category: ${category}`);
  }
}

function toPrismaStatus(status?: string): PrismaPostStatus | undefined {
  return status as PrismaPostStatus | undefined;
}

function toResourcesJson(resources?: ResourceLink[]) {
  return resources
    ? (resources as unknown as Prisma.InputJsonValue)
    : Prisma.DbNull;
}

async function main() {
  for (const post of posts) {
    await prisma.post.upsert({
      where: { slug: post.slug },
      update: {
        title: post.title,
        description: post.description,
        category: toPrismaCategory(post.category),
        date: post.date,
        readTime: post.readTime,
        status: toPrismaStatus(post.status),
        reelUrl: post.reelUrl,
        videoUrl: post.videoUrl,
        image: post.image,
        isDashboard: post.isDashboard ?? false,
        dashboardSrc: post.dashboardSrc,
        resources: toResourcesJson(post.resources),
      },
      create: {
        id: post.id,
        slug: post.slug,
        title: post.title,
        description: post.description,
        category: toPrismaCategory(post.category),
        date: post.date,
        readTime: post.readTime,
        status: toPrismaStatus(post.status),
        reelUrl: post.reelUrl,
        videoUrl: post.videoUrl,
        image: post.image,
        isDashboard: post.isDashboard ?? false,
        dashboardSrc: post.dashboardSrc,
        resources: toResourcesJson(post.resources),
      },
    });
  }

  console.log(`Seeded ${posts.length} posts.`);
}

main()
  .catch((error) => {
    console.error("Prisma seed failed.");
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
