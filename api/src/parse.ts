import { NotionBlocksMarkdownParser } from "@notion-stuff/blocks-markdown-parser";
import { ListBlockChildrenResponse } from "@notionhq/client/build/src/api-endpoints";
import { marked } from "marked";

export function blocksToMd(blocks: ListBlockChildrenResponse) {
  const instance = NotionBlocksMarkdownParser.getInstance();
  const md = instance.parse(blocks.results);
  return md;
}

export function blocksToHtml(blocks: ListBlockChildrenResponse) {
  const md = blocksToMd(blocks);
  const html = marked.parse(md);
  return html;
}
