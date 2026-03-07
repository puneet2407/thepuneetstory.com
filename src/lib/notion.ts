import "server-only";
import { Client } from "@notionhq/client";
import type {
  BlockObjectResponse,
  PartialBlockObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";

const globalForNotion = globalThis as unknown as {
  notion?: Client;
};

function createNotionClient() {
  const token = process.env.NOTION_TOKEN;
  if (!token) {
    return null;
  }
  return new Client({ auth: token });
}

export const notion = globalForNotion.notion ?? createNotionClient();

if (process.env.NODE_ENV !== "production" && notion) {
  globalForNotion.notion = notion;
}

export type NotionBlock = BlockObjectResponse;

function isFullBlock(
  block: BlockObjectResponse | PartialBlockObjectResponse
): block is BlockObjectResponse {
  return "type" in block;
}

export async function getNotionBlocks(
  pageId: string
): Promise<NotionBlock[]> {
  if (!notion) {
    return [];
  }

  const blocks: NotionBlock[] = [];
  let cursor: string | undefined;

  do {
    const response = await notion.blocks.children.list({
      block_id: pageId,
      start_cursor: cursor,
      page_size: 100,
    });

    for (const block of response.results) {
      if (isFullBlock(block)) {
        blocks.push(block);

        if (block.has_children && block.type !== "child_page") {
          const children = await getNotionBlocks(block.id);
          (block as NotionBlock & { _children: NotionBlock[] })._children =
            children;
        }
      }
    }

    cursor = response.has_more ? (response.next_cursor ?? undefined) : undefined;
  } while (cursor);

  return blocks;
}
