import React from "react";
import { useRouter } from "next/router";
import projects, { Project } from "../../data/projects";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { ParsedUrlQuery } from "querystring";
import Head from "next/head";
import NavigationBar from "../../components/NavigationBar";
import { Fade } from "react-awesome-reveal";
import Footer from "../../components/Footer";
import Image from "next/image";
import { LinkIcon } from "@heroicons/react/24/solid";
import Lightbox, { SlideImage } from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
interface ParamsType extends ParsedUrlQuery {
  id: string;
}

export async function getStaticPaths() {
  const paths = projects.map((project) => ({
    params: { id: project.id },
  }));
  return {
    paths: paths,
    fallback: false, // can also be true or 'blocking'
  };
}

export const getStaticProps: GetStaticProps<{ project: Project }> = async ({
  params,
}) => {
  const { id } = params as ParamsType;
  const project = projects.find((project) => project.path === id);

  if (!project) {
    return {
      notFound: true,
    };
  }

  return {
    props: { project },
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

const WorksDetailPage = ({
  project,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();
  const id = router.query.id as string;
  const [open, setOpen] = React.useState(false);
  const [index, setIndex] = React.useState(-1);

  return (
    <div className="flex min-h-screen dark:bg-black flex-col items-center justify-center ">
      <Head>
        <title>Adam Lobler | {project.title}</title>
        <meta name="description" content={project.description} key="desc" />
        <meta property="og:title" content={"Adam Lobler | " + project.title} />
        <meta property="og:description" content={project.description} />
        <meta property="og:image" content="https://i.imgur.com/5vJ6ZN7.png" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavigationBar />
      <Lightbox
        open={open}
        index={index}
        close={() => {
          setOpen(false);
          setIndex(-1);
        }}
        slides={project.images}
        render={{
          slide: (image, offset, rect) => {
            return renderLightbox(image, rect);
          },
        }}
      />
      <Image
        src={project.desktopImage}
        alt="desktop_image"
        className="hidden md:flex mt-[76px] w-screen max-w-7xl"
      />
      <Image
        src={project.mobileImage}
        alt="mobile_image"
        className="flex md:hidden mt-[76px]"
      />
      <div className="flex flex-col max-w-5xl xl:max-w-7xl w-full  px-4 xl:px-16 py-8 pb-32">
        <Fade triggerOnce>
          <div className="pb-8 md:py-8 2xl:py-16 space-y-4 md:space-y-8">
            <h1 className="text-h3 md:text-h1 dark:text-white">
              {project.title}
            </h1>
            <div className="flex flex-wrap">
              {project.tags.map((tag) => (
                <p
                  key={tag}
                  className="text-caption uppercase text-start mr-2 text-gray-400 dark:text-gray-600"
                >
                  {tag}
                </p>
              ))}
            </div>
            <p className="text-subtitle2 md:text-subtitle1 text-gray-600 dark:text-gray-400">
              {project.description}
            </p>
            <a
              href={project.link}
              rel="noreferrer"
              target="_blank"
              className="text-primary-500 hover:text-primary-300 font-bold py-2 rounded inline-flex items-center"
            >
              <span className="text-button mr-2 hover:mr-3 transition-all duration-300">
                Link to website
              </span>
              <LinkIcon className="w-5 h-5" />
            </a>
          </div>
          {project.images?.map((image, index) => (
            <Fade triggerOnce key={id}>
              <button
                onClick={() => {
                  setOpen(true);
                  setIndex(index);
                }}
              >
                <Image src={image} alt="mobile_image" className="flex pt-8" />
              </button>
            </Fade>
          ))}
        </Fade>
      </div>
      <Footer />
    </div>
  );
};

export default WorksDetailPage;
