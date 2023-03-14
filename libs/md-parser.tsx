import fs from "fs";
import path from "path";
import matter from "gray-matter";

type Slug = {
  params: {
    slug: string;
  };
};

const contentDir = path.join(process.cwd(), "content");

{
  /*
const getContent = async (slug: string) => {
  const fullPath = path.join(contentDir, `${slug}.md`);

  const fileContent = fs.readFileSync(fullPath, "utf8");

  const { data: frontmatter, content } = matter(fileContent);

  return {
    frontmatter,
    content,
  };
};
*/
}
const getSlugs = () => {
  const fileNames = fs.readdirSync(contentDir);

  return fileNames.reduce((result: Slug[], fileName: string) => {
    if (fileName !== "img") {
      result.push({
        params: {
          slug: fileName.replace(/\.md$/, ""),
        },
      });
    }
    return result;
  }, []);
};

export { getSlugs };
