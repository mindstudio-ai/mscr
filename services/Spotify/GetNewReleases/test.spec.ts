import { expect, test } from "vitest";
import runConnector from "../../../src/utils/testHarness";

test("fetches new releases and saves to output variable", async () => {
  // Set up environment variables

  process.env.clientId = process.env.SPOTIFY_CLIENT_ID;
  process.env.clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  const { handler } = await import("./handler.ts");
  const ctx = await runConnector(handler, {
    limit: "10",
    offset: "0",
    outputVariable: "newReleases",
  });

  expect(ctx.outputs["newReleases"]).toBeTruthy();
  expect(ctx.outputs["newReleases"].albums).toBeDefined();
  expect(Array.isArray(ctx.outputs["newReleases"].albums.items)).toBe(true);
});
