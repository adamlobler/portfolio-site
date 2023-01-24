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

const WorksDetailPage = ({
  project,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();
  const id = router.query.id as string;
  return (
    <div className="flex min-h-screen dark:bg-black flex-col items-center justify-center ">
      <Head>
        <title>Adam Lobler | Works</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://cdn.jsdelivr.net/npm/@tailwindcss/typography@0.2.x/dist/typography.min.css"
          rel="stylesheet"
        />
      </Head>
      <NavigationBar />
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
      <div className="flex flex-col max-w-5xl xl:max-w-7xl w-full  px-4 xl:px-16 py-8 ">
        <Fade triggerOnce>
          <div className="pt-16 pb-8 md:py-16 2xl:py-32 space-y-4">
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
          </div>
          {project.images?.map((image) => (
            <Fade triggerOnce key={id}>
              <Image src={image} alt="mobile_image" className="flex pt-8" />
            </Fade>
          ))}
        </Fade>
      </div>
      <Footer />
    </div>
  );
};

export default WorksDetailPage;
