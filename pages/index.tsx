import React from "react";
import {
  Page,
  Layout,
  Card,
  Text,
  Button,
  Frame,
  AppProvider,
  List,
  BlockStack,
  FooterHelp,
  Grid,
  Thumbnail,
  Scrollable,
  MediaCard,
  Divider,
  Tag,
  VideoThumbnail,
  Form,
  FormLayout,
  TextField,
  Box,
  Badge,
} from "@shopify/polaris";
import "@shopify/polaris/build/esm/styles.css";
import Space from "../components/Space";

const projects = [
  {
    title: "Lyra Collective Brand Storefronts",
    description: "Developed and maintained Shopify brand storefronts (such as ever.com or mylola.com) for Lyra Collective, including theme customization, third-party software integration, and UX/UI improvements.",
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
    url: "https://lyracollective.com",
    technologies: ["Liquid", "CSS", "JavaScript", "GraphQL", "Shopify Plus"],
    status: "attention" as const
  },
  {
    title: "Brandable Analytics Platform",
    description: "Maintained and improved the frontend for Brandable, an Amazon analytics platform, focusing on performance and scalability.",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80",
    url: "https://brandable.com",
    technologies: ["React", "Shopify Polaris", "TypeScript"],
    status: "success" as const
  },
  {
    title: "Pair Eyewear E-commerce",
    description: "Developed and maintained a headless Shopify site for Pair Eyewear, enhancing the e-commerce experience.",
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
    url: "https://paireyewear.com",
    technologies: ["React", "Shopify", "Node.js"],
    status: "success" as const
  },
  {
    title: "Warby Parker Finance Integration",
    description: "Built features for the finance department to integrate insurance providers using Python.",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    url: "https://warbyparker.com",
    technologies: ["Python", "Django", "APIs"],
    status: "attention" as const
  },
  {
    title: "Electronic Invoicing System 'Verónica'",
    description: "Contributed to an open-source electronic invoicing system for the Ecuadorian market.",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80",
    url: "https://github.com/israteneda/veronica",
    technologies: ["SQL", "Node.js", "JavaScript"],
    status: "success" as const
  },
];

const clients = [
  "/clients/lyracollective-logo.jpeg",
  "/clients/ioet-logo.png",
  "/clients/andes-logo.webp",
  "/clients/brandable-logo.png",
  "/clients/veronica-logo.png",
];

const testimonials = [
  {
    name: "Mike Kuerschner",
    title: "Engineering Manager at Birdy Grey",
    testimonial: `Israel has a strong passion for development and writing clean, modern code, which translates to building exceptional user experiences. In my time working with Israel he was always willing to take on more challenging tasks, learn something new, and lend a helping hand to fellow team members...`,
    image: "/testimonials/Mike-Kuerschner.jpeg",
  },
  {
    name: "Tzu-Hao (Tony) Huang",
    title: "Engineering Manager at Warby Parker",
    testimonial: `Israel is one of the best engineers that I have had the pleasures to work with. He took no time at all to ramp up in Warby Parker's Findev team and is a super fast learner. I am also impressed with how Israel is always on top any bug or defect that show up on production before anyone else...`,
    image: "/testimonials/Tony-Huang.jpeg",
  },
  {
    name: "Edwin Hidalgo",
    title: "Product Lead | AI, Web3, Creative Consumer | ex. Story, JPM, Warby Parker",
    testimonial: `Israel has been an amazing key contributor to our team, taking initiative on both internal and user facing client synchronous projects while simultaneously taking the time to support his teammates across other projects...`,
    image: "/testimonials/Edwin-Hidalgo.jpeg",
  },
  {
    name: "Jonathan Andrés Naranjo",
    title: "Senior Front-end Developer | Team Lead at ioet",
    testimonial: `Israel is truly one of a kind. He quickly adapts, delivers great results, and stands out for his strong development skills and exceptional interpersonal abilities. His communication, delegation, and leadership make a real difference in any team...`,
    image: "/testimonials/Andres-Naranjo.jpeg",
  },
];

function LetsBuildSection() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
  };

  return (
    <Card>
      <BlockStack gap="400">
        <Text variant="headingLg" as="h2">Let's Build Something Amazing</Text>
        <Text as="p">Ready to take your e-commerce experience to the next level? Send me a message and let's get started!</Text>
        {submitted ? (
          <Text as="p" tone="success">Thank you for your request! I'll be in touch soon.</Text>
        ) : (
          <Form onSubmit={handleSubmit}>
            <FormLayout>
              <TextField label="Name" value={name} onChange={setName} autoComplete="name" />
              <TextField label="Email" value={email} onChange={setEmail} autoComplete="email" type="email" />
              <TextField label="Message" value={message} onChange={setMessage} multiline={5} autoComplete="off" />
              <Button submit variant="primary">Send Request</Button>
            </FormLayout>
          </Form>
        )}
      </BlockStack>
    </Card>
  );
}

export default function ResumePage() {
  return (
    <AppProvider i18n={{}}>
      <Frame>
        <Page
          title="Israel Teneda"
          primaryAction={{
            content: "Download Resume",
            url: "/Israel_Teneda_CV.pdf",
            external: true,
          }}
          secondaryActions={[
            {
              content: "LinkedIn",
              icon: () => (
                <svg width="20" height="20" viewBox="0 0 382 382" fill="none" xmlns="http://www.w3.org/2000/svg" style={{paddingRight: '4px'}}>
                  <rect width="382" height="382" rx="0" fill="#fff"/>
                  <path style={{fill:'#0077B7'}} d="M347.445,0H34.555C15.471,0,0,15.471,0,34.555v312.889C0,366.529,15.471,382,34.555,382h312.889
                    C366.529,382,382,366.529,382,347.444V34.555C382,15.471,366.529,0,347.445,0z M118.207,329.844c0,5.554-4.502,10.056-10.056,10.056
                    H65.345c-5.554,0-10.056-4.502-10.056-10.056V150.403c0-5.554,4.502-10.056,10.056-10.056h42.806
                    c5.554,0,10.056,4.502,10.056,10.056V329.844z M86.748,123.432c-22.459,0-40.666-18.207-40.666-40.666S64.289,42.1,86.748,42.1
                    s40.666,18.207,40.666,40.666S109.208,123.432,86.748,123.432z M341.91,330.654c0,5.106-4.14,9.246-9.246,9.246H286.73
                    c-5.106,0-9.246-4.14-9.246-9.246v-84.168c0-12.556,3.683-55.021-32.813-55.021c-28.309,0-34.051,29.066-35.204,42.11v97.079
                    c0,5.106-4.139,9.246-9.246,9.246h-44.426c-5.106,0-9.246-4.14-9.246-9.246V149.593c0-5.106,4.14-9.246,9.246-9.246h44.426
                    c5.106,0,9.246,4.14,9.246,9.246v15.655c10.497-15.753,26.097-27.912,59.312-27.912c73.552,0,73.131,68.716,73.131,106.472
                    L341.91,330.654L341.91,330.654z"/>
                </svg>
              ),
              external: true,
              url: "https://linkedin.com/in/israteneda",
            },
          ]}
        >
          <Layout>
            <Layout.Section>
              <Card>
                <div id="about">
                  <Text variant="headingMd" as="h2">About Me</Text>
                  <Space size="1rem" />
                  <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                    <Badge tone="success" size="large">Shopify Plus Expert</Badge>
                    <Badge tone="attention" size="large">5+ Years in E-commerce</Badge>
                    <Badge tone="info" size="large">10+ Shopify Stores Maintained</Badge>
                  </div>
                  
                  <Text as="p" tone="subdued">
                    Frontend developer specializing in e-commerce platforms like Shopify Plus, with a strong focus on performance, UX, and scalability. Passionate about clean code, agile practices, and continuous learning.
                  </Text>
                </div>
              </Card>

              <Space size="1rem" />

              <Card>
                <div id="experience">
                  <Text variant="headingMd" as="h2">Professional Experience</Text>
                  <Space size="1rem" />
                  
                  <BlockStack gap="400">
                    <Card>
                      <BlockStack gap="100">
                        <Text variant="headingSm" as="h3">Shopify Developer – Lyra Collective</Text>
                        <Text as="p" tone="subdued">Jan 2025 – Present · Remote (USA)</Text>
                        <List type="bullet">
                          <List.Item>Developed custom Shopify apps.</List.Item>
                          <List.Item>Theme customization, third-party software integration, and UX/UI improvements.</List.Item>
                          <List.Item>Fixed bugs and optimized performance across multiple brand storefronts.</List.Item>
                        </List>
                      </BlockStack>
                    </Card>
                    <Card>
                      <BlockStack gap="100">
                        <Text variant="headingSm" as="h3">Frontend Engineer – Brandable</Text>
                        <Text as="p" tone="subdued">Aug 2023 – Dec 2024 · Remote (New York, USA)</Text>
                        <List type="bullet">
                          <List.Item>Maintained and improved the frontend of Brandable, an Amazon analytics platform.</List.Item>
                          <List.Item>Implemented new features, resolved bugs, made technical estimates, and wrote documentation.</List.Item>
                        </List>
                      </BlockStack>
                    </Card>
                    <Card>
                      <BlockStack gap="100">
                        <Text variant="headingSm" as="h3">React / Python Developer – Ioet</Text>
                        <Text as="p" tone="subdued">Jan 2021 – Aug 2023 · Remote</Text>
                        <List type="bullet">
                          <List.Item>Contractor for Pair Eyewear (React): developed and maintained the e-commerce headless site based on Shopify.</List.Item>
                          <List.Item>Contractor for Warby Parker (Python): built features for the finance department to integrate insurance providers.</List.Item>
                          <List.Item>Applied best practices (Clean Code, TDD) and participated in internal projects and hiring processes.</List.Item>
                        </List>
                      </BlockStack>
                    </Card>
                    <Card>
                      <BlockStack gap="100">
                        <Text variant="headingSm" as="h3">Software Consultant – Freelance</Text>
                        <Text as="p" tone="subdued">Feb 2020 – Dec 2020 · Remote</Text>
                        <List type="bullet">
                          <List.Item>Freelance development with Django, Flutter, Unity, Node.js. Contributed to open-source projects, including the electronic invoicing system "Verónica".</List.Item>
                        </List>
                      </BlockStack>
                    </Card>
                    <Card>
                      <BlockStack gap="100">
                        <Text variant="headingSm" as="h3">Software Developer – Mivilsoft</Text>
                        <Text as="p" tone="subdued">Feb 2019 – Feb 2020 · Ambato, Ecuador</Text>
                        <List type="bullet">
                          <List.Item>Developed mobile apps with Android and Flutter for public transport. Backend development with Java and Python.</List.Item>
                          <List.Item>Participated in launching and presenting internal product initiatives.</List.Item>
                        </List>
                      </BlockStack>
                    </Card>
                  </BlockStack>
                </div>
              </Card>

              <Space size="1rem" />

              <Card>
                <div id="projects">
                  <Text variant="headingMd" as="h2">Projects</Text>
                  <Space size="1rem" />
                  
                  <Grid gap={{ xs: "400", sm: "400", md: "400", lg: "400" }} columns={{ xs: 1, sm: 2, md: 2, lg: 3 }}>
                    {projects.map((project, idx) => (
                      <Card key={idx} padding="400">
                        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                          <img src={project.image} alt={project.title} style={{ width: '100%', borderRadius: '8px', objectFit: 'cover', maxHeight: 160 }} />
                          <Text variant="headingSm" as="h3">{project.title}</Text>
                          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', margin: '0.5rem 0' }}>
                            {project.technologies.map((tech, i) => (
                              <Tag key={i}>{tech}</Tag>
                            ))}
                          </div>
                          <Text as="p" tone="subdued">{project.description}</Text>
                          <div style={{ flex: 1 }} />
                          <div style={{ marginTop: '1.25rem', width: '100%' }}>
                            <Button url={project.url} external fullWidth>View Project</Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </Grid>
                </div>
              </Card>

              <Space size="1rem" />

              <Card>
                <div id="testimonials">
                  <Text variant="headingMd" as="h2">Testimonials</Text>
                  <Space size="1rem" />
                  
                  <Grid gap={{ xs: "400", sm: "400", md: "400", lg: "400" }} columns={{ xs: 1, sm: 2, md: 2, lg: 2 }}>
                    {testimonials.map((t, idx) => (
                      <MediaCard
                        key={idx}
                        title={t.name}
                        description={t.testimonial}
                      >
                        <VideoThumbnail
                          videoLength={0}
                          thumbnailUrl={t.image}
                          onClick={() => {}}
                        />
                        <div style={{ marginTop: 12 }}>
                          <Tag>{t.name} — {t.title}</Tag>
                          <span className="testimonial-name-title-mobile">{t.name} — {t.title}</span>
                        </div>
                      </MediaCard>
                    ))}
                  </Grid>
                </div>
              </Card>

              <Space size="1rem" />

              <Card>
                <div id="clients">
                  <Text variant="headingMd" as="h2">Clients</Text>
                  <Space size="1rem" />
                  
                  <Scrollable shadow style={{ height: "120px", display: "flex", overflowX: "auto" }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', height: '80px', gap: '5%' }}>
                      {clients.map((logo, i) => (
                        <div key={i} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', height: '80px' }}>
                            <img
                              src={logo}
                              alt="client logo"
                              style={{ maxWidth: '100%', maxHeight: '80px', objectFit: 'contain', display: 'block' }}
                            />
                        </div>
                      ))}
                    </div>
                  </Scrollable>
                </div>
              </Card>
            </Layout.Section>

          </Layout>

          <Space size="1rem" />

          <LetsBuildSection />

          <FooterHelp>
            © {new Date().getFullYear()} Israel Teneda · Built with Polaris + React
          </FooterHelp>
        </Page>
      </Frame>
      <style jsx>{`
        /* Make testimonial images the same size and object-fit cover */
        :global(.Polaris-MediaCard__Media img) {
          width: 180px !important;
          height: 180px !important;
          object-fit: cover !important;
          border-radius: 16px !important;
        }
        /* Hide tag and show plain text for name/title on mobile */
        .testimonial-name-title-mobile {
          display: none;
        }
        @media (max-width: 600px) {
          :global(.Polaris-Grid) {
            display: flex !important;
            flex-direction: column !important;
            gap: 1.5rem !important;
          }
          :global(.Polaris-Grid > *) {
            width: 100% !important;
            max-width: 100% !important;
          }
          :global(.Polaris-MediaCard__Media img) {
            width: 100% !important;
            height: 40vw !important;
            min-height: 120px !important;
            max-height: 220px !important;
            object-fit: cover !important;
            border-radius: 0 !important;
          }
          :global(.Polaris-MediaCard__Content) {
            padding-left: 1rem !important;
            padding-right: 1rem !important;
          }
          :global(.Polaris-Tag) {
            display: none !important;
          }
          .testimonial-name-title-mobile {
            display: block;
            margin-top: 0.5rem;
            font-weight: 500;
            color: #202223;
            padding-left: 1rem;
            padding-right: 1rem;
          }
        }
      `}</style>
    </AppProvider>
  );
}