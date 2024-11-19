// @ts-nocheck

import { getSlugs } from "../libs/md-parser";
import fs from "fs";
import matter from "gray-matter";
import Image from "next/image";
import Head from "next/head";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { Fade } from "react-awesome-reveal";
import Metadata from "../components/Metadata";

const components = {
  Image,
  Fade,
};

const getStaticPaths = async () => {
  const paths = getSlugs();

  return {
    paths,
    fallback: false,
  };
};

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

const Slug = ({ metadata, mdxcontent }) => {
  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta property="description" content={metadata.description} />
        <meta property="og:image" content="/img/og_image.png" />
      </Head>
      <main className="max-w-7xl flex flex-col items-center md:mx-6">
        <Fade>
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
        </Fade>
        <div className="text-h3 px-4 2xl:px-0 w-full md:mb-32  pt-8">
          <h1 className="text-h3 w-full md:text-h1  dark:text-white mb-4">
            {metadata.title}
          </h1>
          <div className="hidden sm:flex flex-row flex-wrap">
            {metadata.tags.map((tag) => (
              <p
                className="text-button p-2 border rounded mr-4 my-2 whitespace-nowrap"
                key={tag}
              >
                {tag}
              </p>
            ))}
          </div>
          <div className="flex flex-row flex-wrap md:space-x-16 my-4 md:my-8">
            <Metadata title="DURATION" data={metadata.duration} />
            <Metadata title="ROLE" data={metadata.role} />
            <Metadata title="ClIENT" data={metadata.client} />
          </div>
        </div>
        <article
          className="prose max-w-[750px] flex flex-col items-center mb-16 md:mb-64 md:mx-6
          prose-p:px-4 prose-p:mb-6 prose-p:text-[18px] prose-p:mt-0 prose-p:flex prose-p:justify-center
          prose-headings:px-4 prose-headings:dark:text-white prose-headings:w-full
          prose-h1:text-h4 prose-h1:mb-0 prose-h1:mt-12
          text-gray-600 dark:text-gray-300
          prose-img:max-w-none prose-img:w-full 2xl:prose-img:w-[1344px]"
        >
          <MDXRemote {...mdxcontent} components={components} />
        </article>
      </main>
    </>
  );
};

export default Slug;

export { getStaticPaths, getStaticProps };
