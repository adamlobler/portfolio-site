import type { Metadata } from "next";
import Image from "next/image";
import { compileMDX } from "next-mdx-remote/rsc";

import Gallery from "../../../components/Gallery";
import MetaItem from "../../../components/MetaItem";
import { Fade } from "../../../components/client/Reveal";
import { getCaseStudySlugs, readCaseStudy } from "../../../lib/content";

/** Every slug is known at build time, so anything else is a 404, not a render. */
export const dynamicParams = false;

export async function generateStaticParams() {
  const slugs = await getCaseStudySlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { frontmatter } = await readCaseStudy(slug);

  return {
    title: frontmatter.title,
    description: frontmatter.description,
    openGraph: {
      title: `Adam Lobler | ${frontmatter.title}`,
      description: frontmatter.description,
      images: [frontmatter.ogimage ?? "/img/og_image.png"],
    },
  };
}

/**
 * `Fade` and `Gallery` are client components handed to the MDX compiler;
 * `Image` stays on the server. The MDX itself is compiled per request at
 * build time and its output is static HTML.
 */
const components = { Image, Fade, Gallery };

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { frontmatter, body } = await readCaseStudy(slug);
  const { content } = await compileMDX({
    source: body,
    components,
    options: {
      /**
       * next-mdx-remote 6 blocks JS expressions in MDX by default, and that
       * includes JSX *attribute* expressions — it would silently strip every
       * `width={1200}` in `content/*.mdx` and leave `next/image` without
       * dimensions. These case studies are repo files, not user input, so
       * expressions are allowed. `blockDangerousJS` stays on (its default) and
       * still blocks `eval`, `Function`, `require`, `process` and friends.
       */
      blockJS: false,
    },
  });

  return (
    <div className="max-w-7xl flex flex-col items-center md:mx-6">
      <Fade>
        <Image
          src={frontmatter.desktopImage}
          width={800}
          height={500}
          alt=""
          className="hidden md:flex w-screen max-w-7xl"
          priority
        />
        <Image
          src={frontmatter.mobileImage}
          alt=""
          width={800}
          height={500}
          className="flex md:hidden"
          priority
        />
      </Fade>
      <div className="text-h3 px-4 2xl:px-0 w-full md:mb-24 pt-8">
        <h1 className="text-h3 w-full md:text-h1 dark:text-white mb-4">
          {frontmatter.title}
        </h1>
        <div className="hidden sm:flex flex-row flex-wrap">
          {frontmatter.tags.map((tag) => (
            <p
              className="text-button p-2 border rounded-sm mr-4 my-2 whitespace-nowrap"
              key={tag}
            >
              {tag}
            </p>
          ))}
        </div>
        <div className="flex flex-row flex-wrap my-4 md:my-8">
          {frontmatter.duration ? (
            <MetaItem title="DURATION" data={frontmatter.duration} />
          ) : null}
          {frontmatter.role ? (
            <MetaItem title="ROLE" data={frontmatter.role} />
          ) : null}
          {frontmatter.client ? (
            <MetaItem title="CLIENT" data={frontmatter.client} />
          ) : null}
        </div>
      </div>
      <article
        className="prose max-w-[750px] flex flex-col items-center mb-16 md:mb-64 md:mx-6 px-4 md:px-0
         prose-p:mb-2 prose-p:w-full prose-p:text-[18px] prose-p:mt-0 prose-li:text-[18px]
         prose-headings:dark:text-white prose-headings:w-full prose-ul:w-full prose-img:mb-2 prose-img:lg:w-[1000px] prose-img:lg:max-w-none prose-em:block prose-em:w-full prose-em:text-[14px] prose-em:text-center
        text-gray-600 dark:text-gray-200 tracking-wide prose-strong:text-black prose-strong:dark:text-white
         prose-a:text-primary-600 prose-a:dark:text-primary-300 prose-a:no-underline prose-video:max-w-none prose-video:lg:w-[1000px] prose-video:lg:max-w-none"
      >
        {content}
      </article>
    </div>
  );
}
