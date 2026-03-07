import type { NotionBlock } from "@/lib/notion";
import type {
  RichTextItemResponse,
  BlockObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
import Image from "next/image";

type BlockWithChildren = NotionBlock & { _children?: NotionBlock[] };

function renderRichText(items: RichTextItemResponse[]): React.ReactNode[] {
  return items.map((item, i) => {
    let node: React.ReactNode = item.plain_text;
    const ann = item.annotations;

    if (ann.code) {
      node = <code>{node}</code>;
    }
    if (ann.bold) {
      node = <strong>{node}</strong>;
    }
    if (ann.italic) {
      node = <em>{node}</em>;
    }
    if (ann.strikethrough) {
      node = <s>{node}</s>;
    }
    if (ann.underline) {
      node = <u>{node}</u>;
    }

    if (item.type === "text" && item.text.link) {
      node = (
        <a
          href={item.text.link.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {node}
        </a>
      );
    }

    return <span key={i}>{node}</span>;
  });
}

function getPlainText(items: RichTextItemResponse[]): string {
  return items.map((item) => item.plain_text).join("");
}

function ListWrapper({
  type,
  children,
}: {
  type: "bulleted" | "numbered";
  children: React.ReactNode;
}) {
  if (type === "numbered") {
    return <ol>{children}</ol>;
  }
  return <ul>{children}</ul>;
}

function renderListItems(
  blocks: BlockWithChildren[],
  startIdx: number,
  listType: "bulleted_list_item" | "numbered_list_item"
): { element: React.ReactNode; endIdx: number } {
  const items: React.ReactNode[] = [];
  let idx = startIdx;

  while (idx < blocks.length && blocks[idx].type === listType) {
    const block = blocks[idx] as BlockWithChildren;
    const richText =
      listType === "bulleted_list_item"
        ? (block as Extract<BlockObjectResponse, { type: "bulleted_list_item" }>)
            .bulleted_list_item.rich_text
        : (block as Extract<BlockObjectResponse, { type: "numbered_list_item" }>)
            .numbered_list_item.rich_text;

    items.push(
      <li key={block.id}>
        {renderRichText(richText)}
        {block._children && block._children.length > 0 && (
          <NotionBlocks blocks={block._children} />
        )}
      </li>
    );
    idx++;
  }

  const wrapperType = listType === "numbered_list_item" ? "numbered" : "bulleted";

  return {
    element: (
      <ListWrapper
        key={`list-${blocks[startIdx].id}`}
        type={wrapperType}
      >
        {items}
      </ListWrapper>
    ),
    endIdx: idx,
  };
}

function RenderBlock({ block }: { block: BlockWithChildren }) {
  switch (block.type) {
    case "paragraph": {
      const text = block.paragraph.rich_text;
      if (text.length === 0) return <br />;
      return <p>{renderRichText(text)}</p>;
    }

    case "heading_1":
      return <h2>{renderRichText(block.heading_1.rich_text)}</h2>;

    case "heading_2":
      return <h2>{renderRichText(block.heading_2.rich_text)}</h2>;

    case "heading_3":
      return <h3>{renderRichText(block.heading_3.rich_text)}</h3>;

    case "quote":
      return (
        <blockquote>{renderRichText(block.quote.rich_text)}</blockquote>
      );

    case "callout": {
      const icon =
        block.callout.icon?.type === "emoji" ? block.callout.icon.emoji : "";
      return (
        <div className="bg-[#f7f6f3] border-l-4 border-pine rounded-r-lg p-4 my-6">
          <p>
            {icon && <span className="mr-2">{icon}</span>}
            {renderRichText(block.callout.rich_text)}
          </p>
          {block._children && block._children.length > 0 && (
            <NotionBlocks blocks={block._children} />
          )}
        </div>
      );
    }

    case "code": {
      const lang = block.code.language || "plain text";
      return (
        <pre data-language={lang}>
          <code>{getPlainText(block.code.rich_text)}</code>
        </pre>
      );
    }

    case "divider":
      return (
        <div className="article-divider" aria-hidden="true">
          <span>·</span>
          <span>·</span>
          <span>·</span>
        </div>
      );

    case "image": {
      const src =
        block.image.type === "external"
          ? block.image.external.url
          : block.image.file.url;
      const caption = block.image.caption;
      return (
        <figure className="my-8">
          <Image
            src={src}
            alt={caption.length > 0 ? getPlainText(caption) : ""}
            width={728}
            height={400}
            className="w-full h-auto rounded-lg"
            unoptimized={block.image.type === "file"}
          />
          {caption.length > 0 && (
            <figcaption className="image-caption mt-3">
              {renderRichText(caption)}
            </figcaption>
          )}
        </figure>
      );
    }

    case "video": {
      const videoUrl =
        block.video.type === "external"
          ? block.video.external.url
          : block.video.file.url;
      if (
        videoUrl.includes("youtube.com") ||
        videoUrl.includes("youtu.be")
      ) {
        const embedUrl = videoUrl
          .replace("watch?v=", "embed/")
          .replace("youtu.be/", "youtube.com/embed/");
        return (
          <div className="aspect-video my-8 rounded-lg overflow-hidden">
            <iframe
              src={embedUrl}
              title="Video"
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        );
      }
      return (
        <div className="my-8">
          <video src={videoUrl} controls className="w-full rounded-lg" />
        </div>
      );
    }

    case "embed": {
      return (
        <div className="my-8">
          <iframe
            src={block.embed.url}
            title="Embed"
            className="w-full min-h-[400px] border-0 rounded-lg"
            allowFullScreen
          />
        </div>
      );
    }

    case "bookmark": {
      return (
        <div className="my-4 border border-[#e5e5e5] rounded-lg p-4 hover:bg-[#fafafa] transition-colors">
          <a
            href={block.bookmark.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-pine hover:underline text-sm break-all"
          >
            {block.bookmark.caption.length > 0
              ? getPlainText(block.bookmark.caption)
              : block.bookmark.url}
          </a>
        </div>
      );
    }

    case "toggle": {
      return (
        <details className="my-4">
          <summary className="cursor-pointer font-medium">
            {renderRichText(block.toggle.rich_text)}
          </summary>
          <div className="pl-4 mt-2">
            {block._children && <NotionBlocks blocks={block._children} />}
          </div>
        </details>
      );
    }

    case "table": {
      if (!block._children || block._children.length === 0) return null;
      const hasHeader = block.table.has_column_header;
      return (
        <table className="my-6">
          {hasHeader && block._children.length > 0 && (
            <thead>
              <tr>
                {(
                  block._children[0] as Extract<
                    BlockObjectResponse,
                    { type: "table_row" }
                  >
                ).table_row.cells.map((cell, i) => (
                  <th key={i}>{renderRichText(cell)}</th>
                ))}
              </tr>
            </thead>
          )}
          <tbody>
            {block._children.slice(hasHeader ? 1 : 0).map((row) => {
              const tableRow = row as Extract<
                BlockObjectResponse,
                { type: "table_row" }
              >;
              return (
                <tr key={row.id}>
                  {tableRow.table_row.cells.map((cell, i) => (
                    <td key={i}>{renderRichText(cell)}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      );
    }

    case "to_do": {
      return (
        <div className="flex items-start gap-2 my-1">
          <input
            type="checkbox"
            checked={block.to_do.checked}
            readOnly
            className="mt-1.5"
          />
          <span className={block.to_do.checked ? "line-through text-[#757575]" : ""}>
            {renderRichText(block.to_do.rich_text)}
          </span>
        </div>
      );
    }

    case "column_list": {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
          {block._children?.map((col) => (
            <div key={col.id}>
              {(col as BlockWithChildren)._children && (
                <NotionBlocks
                  blocks={(col as BlockWithChildren)._children!}
                />
              )}
            </div>
          ))}
        </div>
      );
    }

    default:
      return null;
  }
}

export function NotionBlocks({ blocks }: { blocks: BlockWithChildren[] }) {
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < blocks.length) {
    const block = blocks[i];

    if (
      block.type === "bulleted_list_item" ||
      block.type === "numbered_list_item"
    ) {
      const { element, endIdx } = renderListItems(blocks, i, block.type);
      elements.push(element);
      i = endIdx;
      continue;
    }

    elements.push(<RenderBlock key={block.id} block={block} />);
    i++;
  }

  return <>{elements}</>;
}
