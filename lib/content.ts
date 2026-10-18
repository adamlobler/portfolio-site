import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

/**
 * The case studies in `content/*.mdx` are now the only detail-page system.
 * `/works/[id]` is gone: nothing linked to it (the cards link to
 * `project.path`, which resolves here), and its `getStaticPaths` emitted
 * `project.id` while its `getStaticProps` looked the project up by
 * `project.path`, so every project where those differed 404'd.
 */

export type CaseStudyFrontmatter = {
  title: string;
  description: string;
  duration?: string;
  role?: string;
  client?: string;
  link?: string;
  ogimage?: string;
  desktopImage: string;
  mobileImage: string;
  tags: string[];
};

const CONTENT_DIR = path.join(process.cwd(), "content");

export async function getCaseStudySlugs(): Promise<string[]> {
  const entries = await fs.readdir(CONTENT_DIR, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".mdx"))
    .map((entry) => entry.name.replace(/\.mdx$/, ""))
    .sort();
}

export async function readCaseStudy(slug: string): Promise<{
  frontmatter: CaseStudyFrontmatter;
  body: string;
}> {
  const file = await fs.readFile(path.join(CONTENT_DIR, `${slug}.mdx`), "utf-8");
  const { data, content } = matter(file);
  return { frontmatter: data as CaseStudyFrontmatter, body: content };
}
