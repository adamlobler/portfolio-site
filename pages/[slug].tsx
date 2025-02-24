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
        <meta property="og:image" content={metadata.ogimage} />
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
        <div className="text-h3 px-4 2xl:px-0 w-full md:mb-24  pt-8">
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
          <div className="flex flex-row flex-wrap my-4 md:my-8">
            {metadata.duration ? (
              <Metadata title="DURATION" data={metadata.duration} />
            ) : (
              <div />
            )}
            {metadata.role ? (
              <Metadata title="ROLE" data={metadata.role} />
            ) : (
              <div />
            )}
            {metadata.client ? (
              <Metadata title="ClIENT" data={metadata.client} />
            ) : (
              <div />
            )}
          </div>
        </div>
        <article
          className="prose max-w-[750px] flex flex-col items-center mb-16 md:mb-64 md:mx-6 px-4 md:px-0
           prose-p:mb-2 prose-p:w-full prose-p:text-[18px] prose-p:mt-0 prose-li:text-[18px]
           prose-headings:dark:text-white prose-headings:w-full prose-ul:w-full prose-img:mb-2 prose-img:lg:w-[1000px] prose-img:lg:max-w-none  prose-em:block prose-em:w-full prose-em:text-[14px] prose-em:text-center
          text-gray-600 dark:text-gray-200 tracking-wide prose-strong:text-black prose-strong:dark:text-white
           prose-a:text-primary-600 prose-a:dark:text-primary-300 prose-a:no-underline prose-video:max-w-none prose-video:lg:w-[1000px] prose-video:lg:max-w-none"
        >
          <MDXRemote {...mdxcontent} components={components} />
        </article>
      </main>
    </>
  );
};

export default Slug;

export { getStaticPaths, getStaticProps };
