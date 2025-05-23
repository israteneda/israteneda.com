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
} from "@shopify/polaris";
import "@shopify/polaris/build/esm/styles.css";
import Space from "../components/Space";

const projects = [
  {
    title: "Portfolio Website",
    description: "A personal  showcasing my work and profile.",
    image: "https://israteneda.com/preview.png",
    url: "https://linkedin.com/in/israteneda",
    technologies: ["React", "Shopify Polaris", "TailwindCSS"],
    status: "success" as const
  },
  {
    title: "GitHub Projects",
    description: "Various open-source contributions and experiments.",
    image: "https://github.com/israteneda.png",
    url: "https://github.com/israteneda",
    technologies: ["Python", "TypeScript", "Node.js"],
    status: "attention" as const
  },
  {
    title: "E-commerce Dashboard",
    description: "A dashboard for tracking sales and analytics for online stores.",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80",
    url: "https://dashboard.example.com",
    technologies: ["Next.js", "Chart.js", "Shopify Polaris"],
    status: "success" as const
  },
];

const clients = [
  "https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg",
  "https://upload.wikimedia.org/wikipedia/commons/4/44/Shopify_logo_2018.svg",
  "https://upload.wikimedia.org/wikipedia/commons/e/e9/Warby_Parker_logo.svg",
];

const testimonials = [
  {
    name: "Jane Doe",
    title: "CTO, Brandable",
    testimonial:
      "Israel is a top-tier developer. His attention to detail and ability to deliver high-quality code on time made a huge impact on our product.",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "John Smith",
    title: "Lead Engineer, Lyra Collective",
    testimonial:
      "Working with Israel was a pleasure. He brought innovative solutions and always ensured best practices were followed.",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
];

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
                  <Divider />
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
                  <Divider />
                  <BlockStack gap="400">
                    <Card>
                      <BlockStack gap="100">
                        <Text variant="headingSm" as="h3">Shopify Developer – Lyra Collective</Text>
                        <Text as="p" tone="subdued">Jan 2025 – Present · Remote (USA)</Text>
                        <List type="bullet">
                          <List.Item>Developed custom Shopify apps.</List.Item>
                          <List.Item>Theme customization, third-party integration, and UI/UX enhancements.</List.Item>
                          <List.Item>Bug fixing and performance optimization across brand storefronts.</List.Item>
                        </List>
                      </BlockStack>
                    </Card>
                    <Card>
                      <BlockStack gap="100">
                        <Text variant="headingSm" as="h3">Frontend Engineer – Brandable</Text>
                        <Text as="p" tone="subdued">Aug 2023 – Dec 2024 · Remote (NY, USA)</Text>
                        <List type="bullet">
                          <List.Item>Maintained and improved frontend of Amazon analytics platform.</List.Item>
                          <List.Item>Implemented features, fixed bugs, wrote docs, and made technical estimates.</List.Item>
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
                  <Divider />
                  <Grid gap={{ xs: "400", sm: "400", md: "400", lg: "400" }} columns={{ xs: 1, sm: 2, md: 2, lg: 3 }}>
                    {projects.map((project, idx) => (
                      <Card key={idx} padding="400">
                        <BlockStack gap="200">
                          <img src={project.image} alt={project.title} style={{ width: '100%', borderRadius: '8px', objectFit: 'cover', maxHeight: 160 }} />
                          <Text variant="headingSm" as="h3">{project.title}</Text>
                          <Text as="p" tone="subdued">{project.description}</Text>
                          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                            {project.technologies.map((tech, i) => (
                              <Tag key={i}>{tech}</Tag>
                            ))}
                          </div>
                          <Button url={project.url} external>View Project</Button>
                        </BlockStack>
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
                  <Divider />
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
                  <Divider />
                  <Scrollable shadow style={{ height: "100px", display: "flex", overflowX: "auto" }}>
                    <BlockStack gap="400">
                      <Grid gap={{ xs: "400", sm: "400", md: "400", lg: "400" }} columns={{ xs: 2, sm: 3, md: 3, lg: 3 }}>
                        {clients.map((logo, i) => (
                          <Thumbnail key={i} source={logo} alt="client logo" size="large" />
                        ))}
                      </Grid>
                    </BlockStack>
                  </Scrollable>
                </div>
              </Card>
            </Layout.Section>
          </Layout>

          <FooterHelp>
            © {new Date().getFullYear()} Israel Teneda · Built with Polaris + React
          </FooterHelp>
        </Page>
      </Frame>
    </AppProvider>
  );
}