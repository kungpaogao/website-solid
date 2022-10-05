import { Client } from "@notionhq/client";
import { Router } from "itty-router";
import { Env } from "./env";
import { Request } from "itty-router";
import { getBlock, jsonResponse } from "./utils";
import { blocksToHtml } from "./parse";

const router = Router();

router.get("/", async (_request: Request, env: Env): Promise<Response> => {
  const notion = new Client({
    auth: env.NOTION_TOKEN,
  });

  // https://www.notion.so/kungpaogao/29a961655aef4251a872e2772e224d3b?v=b053b46b69594bc58957b735b62d5cdc

  // const databaseId = "9e108442735a4e52940277f6e11ae2c1";
  const databaseId = "29a961655aef4251a872e2772e224d3b";
  const response = await notion.databases.retrieve({
    database_id: databaseId,
  });

  return jsonResponse(response);
});

router.get(
  "/projects",
  async (_request: Request, env: Env): Promise<Response> => {
    const notion = new Client({
      auth: env.NOTION_TOKEN,
    });

    const databaseId = "29a961655aef4251a872e2772e224d3b";
    const response = await notion.databases.query({
      database_id: databaseId,
    });

    return jsonResponse(response);
  }
);

router.get("/content/:path?", async (request: Request, env: Env) => {
  const { params } = request;
  const path = `/${params?.path ?? ""}`;

  const pagesDatabaseId = "9e108442735a4e52940277f6e11ae2c1";

  const notion = new Client({
    auth: env.NOTION_TOKEN,
  });

  const response = await notion.databases.query({
    database_id: pagesDatabaseId,
    filter: {
      and: [
        {
          property: "public",
          checkbox: {
            equals: true,
          },
        },
        {
          property: "path",
          rich_text: {
            equals: path,
          },
        },
      ],
    },
  });

  if (response.results.length === 0) {
    // TODO: throw some error
    throw new Error("no!");
  }

  const page = response.results[0] as any;
  const pageId = page.id;
  const lastEditedTime = page.last_edited_time;

  const content = await getBlock(notion, pageId);

  const html = blocksToHtml(content);
  console.log(html);

  return jsonResponse(response);
  // return jsonResponse(content);
});

export default {
  fetch: router.handle,
};
