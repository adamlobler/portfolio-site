//markdown-blog/pages/[slug].js
// @ts-nocheck

import { getSlugs } from "../libs/md-parser";
import fs from "fs";
import matter from "gray-matter";
import Image from "next/image";
import Head from "next/head";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { Fade } from "react-awesome-reveal";

const handleClick = () => {
  setOpen(true);
};

const components = {
  Image,
  handleClick,
  Fade,
};

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
  const fileName = fs.readFileSync(`content/${slug}.mdx`, "utf-8");

  const { data: frontmatter, content } = matter(fileName);
  const mdxSource = await serialize(content, { parseFrontmatter: true });

  //const siders = await getSiderSlugs();

  return {
    props: {
      slug,
      metadata: frontmatter,
      content,
      mdxcontent: mdxSource,
      // siders,
    },
  };
};

export function renderLightbox(
  image: SlideImage,
  rect: {
    width: number;
    height: number;
  }
) {
  const width = Math.round(
    image.height && image.width
      ? Math.min(rect.width, (rect.height / image.height) * image.width)
      : 0
  );
  const height = Math.round(
    image.height && image.width
      ? Math.min(rect.height, (rect.width / image.width) * image.height)
      : 0
  );

  return (
    <div style={{ position: "relative", width, height }}>
      <Image
        fill
        src={image.src}
        loading="eager"
        alt={image.alt ? image.alt : ""}
        sizes={
          typeof window !== "undefined"
            ? `${Math.ceil((width / window.innerWidth) * 100)}vw`
            : `${width}px`
        }
      />
    </div>
  );
}

//render your dynamic content here
const Slug = ({ metadata, mdxcontent }) => {
  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta property="description" content={metadata.description} />
      </Head>
      <main className="max-w-7xl flex flex-col items-center md:mx-6">
        <Image
          src={metadata.desktopImage}
          width={800}
          height={500}
          alt="desktop_image"
          className="hidden md:flex w-screen max-w-7xl"
          priority
        />
        <Image
          src={metadata.mobileImage}
          alt="mobile_image"
          width={800}
          height={500}
          className="flex md:hidden"
          priority
        />
        <h1 className="text-h3 px-6 xl:px-0 w-full md:text-h1 md:mb-32 dark:text-white py-8">
          {metadata.title}
        </h1>
        {/*
        <article className="prose mb-64 prose-lg flex flex-col prose-headings:dark:text-white prose-headings:w-full text-gray-600 dark:text-gray-400 prose-p:max-w-2xl prose-img:max-w-none prose-p:flex prose-p:justify-center prose-img:w-full 2xl:prose-img:w-[1344px]">
          <ReactMarkdown remarkPlugins={[gfm]}>{content}</ReactMarkdown>
        </article>*/}
        <article className="prose mb-64 mx-6 prose-lg flex flex-col items-center prose-headings:dark:text-white prose-headings:w-full text-gray-600 dark:text-gray-300 prose-img:max-w-none prose-p:flex prose-p:justify-center prose-img:w-full 2xl:prose-img:w-[1344px]">
          <MDXRemote {...mdxcontent} components={components} />
        </article>
      </main>
    </>
  );
};

export default Slug;

//it will not work unless you export these two.
export { getStaticPaths, getStaticProps };
