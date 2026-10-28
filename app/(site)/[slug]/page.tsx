import type { Metadata } from "next";
import Img from "../../../components/Img";
import { compileMDX } from "next-mdx-remote/rsc";

import Gallery from "../../../components/Gallery";
import MetaItem from "../../../components/MetaItem";
import Tag from "../../../components/ui/Tag";
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
 * `Image` stays on the server. MDX writes `<Image>`; it resolves to `Img`,
 * the quality-defaulted wrapper, so every case-study screenshot picks up
 * q90 without touching the markdown. The MDX itself is compiled per request at
 * build time and its output is static HTML.
 */
const components = { Image: Img, Fade, Gallery };

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
    <div className="max-w-page flex flex-col items-center md:mx-6">
      <Fade>
        <Img
          src={frontmatter.desktopImage}
          width={800}
          height={500}
          alt=""
          className="hidden md:flex w-screen max-w-page"
          priority
        />
        <Img
          src={frontmatter.mobileImage}
          alt=""
          width={800}
          height={500}
          className="flex md:hidden"
          priority
        />
      </Fade>
      <div className="text-h3 px-4 2xl:px-0 w-full md:mb-24 pt-8">
        <h1 className="text-h3 w-full md:text-h1 text-content-primary mb-4">
          {frontmatter.title}
        </h1>
        <div className="hidden sm:flex flex-row flex-wrap gap-inline-sm">
          {frontmatter.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
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
        className="prose max-w-prose flex flex-col items-center mb-16 md:mb-64 md:mx-6 px-4 md:px-0
         prose-p:mb-2 prose-p:w-full prose-p:text-[18px] prose-p:mt-0 prose-li:text-[18px]
         prose-headings:text-content-primary prose-headings:w-full prose-ul:w-full prose-img:mb-2 prose-img:lg:w-[1000px] prose-img:lg:max-w-none prose-em:block prose-em:w-full prose-em:text-[14px] prose-em:text-center
        text-content-secondary prose-strong:text-content-primary
         prose-a:text-accent-default prose-a:no-underline prose-video:max-w-none prose-video:lg:w-[1000px] prose-video:lg:max-w-none"
      >
        {content}
      </article>
    </div>
  );
}
