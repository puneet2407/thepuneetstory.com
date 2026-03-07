import "server-only";
import {
  Category as PrismaCategory,
  Prisma,
  PostStatus as PrismaPostStatus,
} from "@prisma/client";
import type { Category, Post, PostStatus, ResourceLink } from "@/lib/post-types";
import { prisma } from "@/lib/prisma";

const postSelect = {
  id: true,
  slug: true,
  title: true,
  description: true,
  category: true,
  date: true,
  readTime: true,
  status: true,
  reelUrl: true,
  videoUrl: true,
  image: true,
  isDashboard: true,
  dashboardSrc: true,
  resources: true,
  notionPageId: true,
} satisfies Prisma.PostSelect;

type PostRecord = Prisma.PostGetPayload<{ select: typeof postSelect }>;

function toPrismaCategory(category: Category): PrismaCategory {
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
  }
}

function fromPrismaCategory(category: PrismaCategory): Category {
  switch (category) {
    case PrismaCategory.insurance:
      return "insurance";
    case PrismaCategory.taxes:
      return "taxes";
    case PrismaCategory.real_estate:
      return "real-estate";
    case PrismaCategory.immigration:
      return "immigration";
    case PrismaCategory.tech:
      return "tech";
    case PrismaCategory.life:
      return "life";
  }
}

function fromPrismaStatus(
  status: PrismaPostStatus | null
): PostStatus | undefined {
  return status ?? undefined;
}

function parseResources(resources: Prisma.JsonValue | null): ResourceLink[] | undefined {
  if (!Array.isArray(resources)) {
    return undefined;
  }

  const parsed = resources
    .map((resource) => {
      if (!resource || typeof resource !== "object" || Array.isArray(resource)) {
        return null;
      }

      const candidate = resource as Record<string, unknown>;
      if (typeof candidate.label !== "string" || typeof candidate.url !== "string") {
        return null;
      }

      return {
        label: candidate.label,
        url: candidate.url,
      };
    })
    .filter((resource): resource is ResourceLink => resource !== null);

  return parsed.length > 0 ? parsed : undefined;
}

function mapPostFromRecord(record: PostRecord): Post {
  return {
    id: record.id,
    slug: record.slug,
    title: record.title,
    description: record.description,
    category: fromPrismaCategory(record.category),
    date: record.date,
    readTime: record.readTime ?? undefined,
    status: fromPrismaStatus(record.status),
    reelUrl: record.reelUrl ?? undefined,
    videoUrl: record.videoUrl ?? undefined,
    image: record.image ?? undefined,
    isDashboard: record.isDashboard,
    dashboardSrc: record.dashboardSrc ?? undefined,
    resources: parseResources(record.resources),
    notionPageId: record.notionPageId ?? undefined,
  };
}

async function getPosts(where?: Prisma.PostWhereInput, limit?: number) {
  const records = await prisma.post.findMany({
    where,
    select: postSelect,
    orderBy: [{ date: "desc" }, { createdAt: "desc" }],
    ...(typeof limit === "number" ? { take: limit } : {}),
  });

  return records.map(mapPostFromRecord);
}

export async function getAllPosts() {
  return getPosts();
}

export async function getAllPostSlugs() {
  const records = await prisma.post.findMany({
    select: { slug: true },
    orderBy: [{ date: "desc" }, { createdAt: "desc" }],
  });

  return records.map((record) => record.slug);
}

export async function getPostsByCategory(category: Category) {
  return getPosts({ category: toPrismaCategory(category) });
}

export async function getPostBySlug(slug: string) {
  const record = await prisma.post.findUnique({
    where: { slug },
    select: postSelect,
  });

  return record ? mapPostFromRecord(record) : undefined;
}

export async function getFeaturedPosts() {
  return getPosts(undefined, 3);
}

export async function getLatestPosts(limit: number = 6) {
  return getPosts(undefined, limit);
}

