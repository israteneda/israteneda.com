import Head from 'next/head'
import Link from 'next/link'
import Layout, { siteTitle } from '../components/layout'
import { GetStaticProps } from 'next'
import { getSortedPostsData } from '../lib/posts'
import Date from '../components/date'
import resumeStyles from '../styles/resume.module.css'
import utilStyles from '../styles/utils.module.css'

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

type Props = {
  allPostsData: {
    date: string
    title: string
    id: string
  }[]
}

export default function Resume({ allPostsData }: Props) {
  return (
    <Layout>
      <Head>
        <title>Resume - {siteTitle}</title>
      </Head>
      <div className={resumeStyles.container}>
        <button
          className={resumeStyles.downloadButton}
          onClick={() => window.print()}
        >
          Download PDF
        </button>
        <header className={resumeStyles.header}>
          <h1 className={resumeStyles.name}>Israel Teneda</h1>
          <p>Software Engineer</p>
          <p>
            <a className={resumeStyles.link} href="https://israteneda.com">israteneda.com</a>
            {' '}|
            <a className={resumeStyles.link} href="https://www.linkedin.com/in/israteneda/">LinkedIn</a>
            {' '}|
            <a className={resumeStyles.link} href="https://github.com/israteneda">GitHub</a>
          </p>
          <p>Ecuador · israteneda@gmail.com · +593995691344</p>
        </header>

        <section className={resumeStyles.section}>
          <h2 className={resumeStyles.subheading}>Summary</h2>
          <p>
            Frontend developer specializing in e-commerce, with experience on high-traffic platforms like Shopify Plus. I have worked with international companies such as Brandable, Pair Eyewear, and Warby Parker, focusing on performance, UX, and scalability. Passionate about technology and continuous learning, I actively contribute to the tech community and apply best practices in agile development, testing, and interdisciplinary collaboration.
          </p>
        </section>

        <section className={resumeStyles.section}>
          <h2 className={resumeStyles.subheading}>Professional Experience</h2>
          <h3>Shopify Developer – Lyra Collective - January 2025 – Present · Remote (USA)</h3>
          <ul className={resumeStyles.list}>
            <li>Developed custom Shopify apps.</li>
            <li>Theme customization, third-party software integration, and UX/UI improvements.</li>
            <li>Fixed bugs and optimized performance across multiple brand storefronts.</li>
          </ul>

          <h3>Frontend Engineer – Brandable - August 2023 – December 2024 · Remote (New York, USA)</h3>
          <ul className={resumeStyles.list}>
            <li>Maintained and improved the frontend of Brandable, an Amazon analytics platform.</li>
            <li>Implemented new features, resolved bugs, made technical estimates, and wrote documentation.</li>
          </ul>

          <h3>React / Python Developer – Ioet - January 2021 – August 2023 · Remote</h3>
          <ul className={resumeStyles.list}>
            <li>Contractor for Pair Eyewear (React): developed and maintained the e-commerce headless site based on Shopify.</li>
            <li>Contractor for Warby Parker (Python): built features for the finance department to integrate insurance providers.</li>
            <li>Applied best practices (Clean Code, TDD) and participated in internal projects and hiring processes.</li>
          </ul>

          <h3>Software Consultant – Freelance - February 2020 – December 2020 · Remote</h3>
          <ul className={resumeStyles.list}>
            <li>Freelance development with Django, Flutter, Unity, Node.js.</li>
            <li>Contributed to open-source projects, including the electronic invoicing system “Verónica”.</li>
          </ul>

          <h3>Software Developer – Mivilsoft – February 2019 – February 2020 · Ambato, Ecuador</h3>
          <ul className={resumeStyles.list}>
            <li>Developed mobile apps with Android and Flutter for public transport.</li>
            <li>Backend development with Java and Python.</li>
            <li>Participated in launching and presenting internal product initiatives.</li>
          </ul>
        </section>

        <section className={resumeStyles.section}>
          <h2 className={resumeStyles.subheading}>Education & Certifications</h2>
          <p>Software Engineering – Universidad de las Fuerzas Armadas – ESPE (2015–2020)</p>
          <p>Master’s candidate in Information Technology – UNEMI (expected 2026)</p>
          <h3>Relevant Certifications</h3>
          <ul className={resumeStyles.list}>
            <li>Liquid Storefronts for Theme Developers - Shopify Academy</li>
            <li>Meta Front-End Developer</li>
            <li>Scrum Master – Certmind</li>
            <li>Agile Clean Coding Practices</li>
            <li>Web Security: OAuth and OpenID Connect</li>
          </ul>
        </section>

        <section className={resumeStyles.section}>
          <h2 className={resumeStyles.subheading}>Academic Papers</h2>
          <p>Conversational Agent for Industrial Processes through Virtual Environments</p>
        </section>

        <section className={resumeStyles.section}>
          <h2 className={resumeStyles.subheading}>Languages</h2>
          <ul className={resumeStyles.list}>
            <li>Spanish – Native</li>
            <li>English – Professional</li>
          </ul>
        </section>

        <section className={resumeStyles.section}>
          <h2 className={resumeStyles.subheading}>Technical Skills</h2>
          <p>
            Shopify & Shopify Plus · Replo · Liquid · Polaris · React · Angular · JavaScript · TypeScript · Python · Django · Node.js · Figma · Git · Docker · TDD · Clean Code · QA · OAuth 2.0 · Web Security
          </p>
        </section>

        <section className={resumeStyles.section}>
          <h2 className={resumeStyles.subheading}>Blog</h2>
          <ul className={resumeStyles.list}>
            {allPostsData.map(({ id, date, title }) => (
              <li key={id} className={utilStyles.listItem}>
                <Link href={`/posts/${id}`}>{title}</Link>
                {' '}
                <small className={utilStyles.lightText}>
                  <Date dateString={date} />
                </small>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </Layout>
  )
}
