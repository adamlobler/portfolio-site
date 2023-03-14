//markdown-blog/pages/[slug].js
// @ts-nocheck

import { getSlugs } from "../libs/md-parser";
import fs from "fs";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";

import Head from "next/head";

const getStaticPaths = async () => {
  const paths = getSlugs();

  return {
    paths,
    fallback: false,
  };
};

//define this to return specific blog conent to next-js
//and remember to return all you need back - this will go the default function.
const getStaticProps = async ({ params }) => {
  const slug = params.slug;
  const fileName = fs.readFileSync(`content/${slug}.md`, "utf-8");

  const { data: frontmatter, content } = matter(fileName);

  //const siders = await getSiderSlugs();

  return {
    props: {
      slug,
      frontmatter,
      content,
      // siders,
    },
  };
};

//render your dynamic content here
const Slug = ({ title, description, content }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="description" content={description} />
      </Head>
      <main className="max-w-7xl mt-[80px] mx-6">
        <article className="prose prose-lg flex flex-col max-w-none prose-headings:dark:text-white dark:text-gray-400 prose-p:max-w-2xl prose-img:max-w-none prose-p:flex prose-p:justify-center prose-img:w-full 2xl:prose-img:w-[1344px]">
          <ReactMarkdown remarkPlugins={[gfm]}>{content}</ReactMarkdown>
        </article>
      </main>
    </>
  );
};

export default Slug;

//it will not work unless you export these two.
export { getStaticPaths, getStaticProps };
