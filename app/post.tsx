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
  if (fs.existsSync(filepath)) {
    file = await fsPromises.readFile(filepath);
  } else if (fs.existsSync(folderPath)) {
    file = await fsPromises.readFile(path.join(folderPath, "index.md"));
  } else {
    return {
      slug: 404,
      title: "Not Found",
      html: "404 not found",
    };
  }
  const { attributes, body } = parseFrontMatter(file.toString());
  invariant(
    isValidPostAttributes(attributes),
    `Post ${filepath} is missing attributes`
  );
  const puclicImagePath = "/posts/" + slug + "/";
  const regex = /\(.\//gi;
  return {
    slug,
    title: attributes.title,
    html: marked(body.replace(regex, "(" + puclicImagePath), {
      baseUrl: puclicImagePath,
      headerIds: true,
    }),
  };
}
