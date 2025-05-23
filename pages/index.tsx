import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import { getSortedPostsData } from "../lib/posts";
import Link from "next/link";
import Date from "../components/date";
import { GetStaticProps } from 'next'

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

export default function Home({ 
  allPostsData 
}: {
  allPostsData: {
    date: string
    title: string
    id: string
  }[]
}) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section>
        <p>
          I&apos;m a software developer with 5 years of experience. I&apos;m passionate
          about learning and sharing knowledge with the engineering community
          through my personal blog and my YouTube channel. Furthermore, I have
          skills in a broad variety of technologies, methodologies, platforms
          and programming languages like Python, JavaScript, Docker, Git, TDD,
          QA, among others.
        </p>
        <p>
          Moreover, I like to contribute with the growth of the software
          community, contributing to open source and answer questions on Stack
          Overflow. Constantly I&apos;m learning new agile methodologies, good
          practices for coding or soft skills to improve myself as a
          professional.
        </p>
        <p>Read my <Link href="/resume">resume</Link>.</p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                {title}
              </Link>
              <br />
              <small>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
