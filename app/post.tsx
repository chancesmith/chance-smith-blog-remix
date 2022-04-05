import path from "path";
import fsPromises from "fs/promises";
import fs from "fs";
import parseFrontMatter from "front-matter";
import invariant from "tiny-invariant";
import { postsPath, isValidPostAttributes } from "./posts";
import { marked } from "marked";

export async function getPost(slug: string) {
  const filepath = path.join(postsPath, slug + ".md");
  const folderPath = path.join(postsPath, slug);
  let file;
  if (fs.statSync(folderPath).isDirectory()) {
    console.log({ filePath: path.join(folderPath, "index.md") });
    file = await fsPromises.readFile(path.join(folderPath, "index.md"));
  } else {
    // is an md file
    file = await fsPromises.readFile(filepath);
  }
  const { attributes, body } = parseFrontMatter(file.toString());
  invariant(
    isValidPostAttributes(attributes),
    `Post ${filepath} is missing attributes`
  );
  return { slug, title: attributes.title, html: marked(body) };
}
