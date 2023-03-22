import fs from "fs";
import path from "path";

type Slug = {
  params: {
    slug: string;
  };
};

const contentDir = path.join(process.cwd(), "content");

}
const getSlugs = () => {
  const fileNames = fs.readdirSync(contentDir);

  return fileNames.reduce((result: Slug[], fileName: string) => {
    if (fileName !== "img") {
      result.push({
        params: {
          slug: fileName.replace(/\.mdx$/, ""),
        },
      });
    }
    return result;
  }, []);
};

export { getSlugs };
