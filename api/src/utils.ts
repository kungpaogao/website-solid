import { Client } from "@notionhq/client";

export async function getBlockChildrenRecursively(notion: Client, id: any) {
  const blocks = await getBlockChildren(notion, id);

  const results = await Promise.all(
    blocks.map((block) => {
      if (block.has_children) getBlockChildrenRecursively(notion, block.id);
    })
  );
}

export async function getBlockChildren(notion: Client, id: any) {
  const query = {
    block_id: id,
    page_size: 100,
  };

  let children = [];
  let block = await notion.blocks.children.list(query);
  children = [...block.results];

  while (block.has_more) {
    block = await notion.blocks.children.list({
      ...query,
      start_cursor: block.next_cursor ?? undefined,
    });
    children = [...children, ...block.results];
  }

  return children;
}

export async function getBlock(notion: Client, id: any) {
  const query = {
    block_id: id,
    page_size: 100,
  };

  // let results = [];
  let block = await notion.blocks.children.list(query);
  // results = [...block.results];

  while (block.has_more) {
    block = await notion.blocks.children.list({
      ...query,
      start_cursor: block.next_cursor ?? undefined,
    });
    // results = [...results, ...block.results];
  }

  // console.log(results);
  console.log(block);

  return block;
}

export const jsonResponse = (data: any) =>
  new Response(JSON.stringify(data, null, 2), {
    headers: {
      "content-type": "application/json;charset=UTF-8",
    },
  });
