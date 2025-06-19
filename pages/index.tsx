import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ChatInterface from "@/components/ChatInterface";
import Image from 'next/image';
import { useTheme } from "@/lib/theme-context";
import { Sun, Moon } from "lucide-react";
import { projects, testimonials, clients } from '../lib/data';

function LetsBuildSection() {
  // You can migrate your contact form to shadcn/ui as well, but for brevity, we'll keep it simple here.
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Let&apos;s Build Something Amazing</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-muted-foreground">
          Ready to take your e-commerce experience to the next level? Send me a message and let&apos;s get started!
        </p>
        <a href="mailto:israteneda@gmail.com">
          <Button className="w-full">Contact Me</Button>
        </a>
      </CardContent>
    </Card>
  );
}

export default function ResumePage() {
  const aboutRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const clientsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const { theme, toggleTheme, setTheme } = useTheme();

  const navigateToSection = (section: string) => {
    const refs: { [key: string]: React.RefObject<HTMLDivElement> } = {
      about: aboutRef,
      experience: experienceRef,
      projects: projectsRef,
      testimonials: testimonialsRef,
      clients: clientsRef,
      contact: contactRef,
    };
    const targetRef = refs[section];
    if (targetRef?.current) {
      targetRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.history.pushState(null, '', `#${section}`);
    }
  };

  React.useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash) {
      navigateToSection(hash);
    }
  }, []);

  const handleThemeChange = (theme: 'light' | 'dark') => {
    setTheme(theme);
  };

  return (
    <main className="min-h-screen bg-background text-foreground pb-32">
      <ChatInterface onNavigate={navigateToSection} onThemeChange={handleThemeChange} />
      <div className="max-w-3xl mx-auto px-4 pt-10">
        <header id="header" className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-bold mb-2">Israel Teneda</h1>
            <div className="flex gap-2 flex-wrap mb-2">
              <Badge>Shopify Plus Expert</Badge>
              <Badge variant="secondary">5+ Years as a Software Engineer</Badge>
              <Badge variant="outline">Maintained 10+ Shopify Stores</Badge>
            </div>
            <p className="text-muted-foreground max-w-xl">
              Frontend developer specializing in e-commerce platforms like Shopify Plus, with a strong focus on performance, UX, and scalability. Passionate about clean code, agile practices, and continuous learning.
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={toggleTheme}
              variant="outline"
              size="icon"
              className="h-10 w-10"
            >
              {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </Button>
            <a href="/Israel_Teneda_CV.pdf" target="_blank" rel="noopener noreferrer">
              <Button id="download-resume-btn">Download Resume</Button>
            </a>
            <a href="https://linkedin.com/in/israteneda" target="_blank" rel="noopener noreferrer">
              <Button id="linkedin-btn" variant="outline">LinkedIn</Button>
            </a>
          </div>
        </header>

        {/* About */}
        <section id="about" ref={aboutRef} className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle>About Me</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                I'm a frontend developer with a passion for building exceptional e-commerce experiences. With over 5 years of experience, I've worked with leading brands and platforms, specializing in Shopify Plus development and React applications.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Experience */}
        <section id="experience" ref={experienceRef} className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Professional Experience</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div id="experience-lyra">
                <h3 className="font-semibold">Shopify Developer – Lyra Collective</h3>
                <span className="text-xs text-muted-foreground">Jan 2025 – Present · Remote</span>
                <ul className="list-disc ml-5 text-sm mt-1">
                  <li>Developed custom Shopify apps.</li>
                  <li>Theme customization, third-party software integration, and UX/UI improvements.</li>
                  <li>Fixed bugs and optimized performance across multiple brand storefronts.</li>
                </ul>
              </div>
              <div id="experience-brandable">
                <h3 className="font-semibold">Frontend Engineer – Brandable</h3>
                <span className="text-xs text-muted-foreground">Aug 2023 – Dec 2024 · Remote</span>
                <ul className="list-disc ml-5 text-sm mt-1">
                  <li>Maintained and improved the frontend of Brandable, an Amazon analytics platform.</li>
                  <li>Implemented new features, resolved bugs, made technical estimates, and wrote documentation.</li>
                </ul>
              </div>
              <div id="experience-ioet">
                <h3 className="font-semibold">React / Python Developer – Ioet</h3>
                <span className="text-xs text-muted-foreground">Jan 2021 – Aug 2023 · Remote</span>
                <ul className="list-disc ml-5 text-sm mt-1">
                  <li>Contractor for Pair Eyewear (React): developed and maintained the e-commerce headless site based on Shopify.</li>
                  <li>Contractor for Warby Parker (Python): built features for the finance department to integrate insurance providers.</li>
                  <li>Applied best practices (Clean Code, TDD) and participated in internal projects and hiring processes.</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Projects */}
        <section id="projects" ref={projectsRef} className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map((project, idx) => (
                  <Card key={idx} id={`project-${idx}`} className="h-full">
                    <CardContent className="flex flex-col h-full p-4">
                      <Image 
                        src={project.image} 
                        alt={project.title} 
                        width={400}
                        height={160}
                        className="w-full rounded-lg object-cover max-h-40"
                      />
                      <h3 className="mt-4 font-semibold text-lg">{project.title}</h3>
                      <div className="flex gap-2 flex-wrap my-2">
                        {project.technologies.map((tech, i) => (
                          <Badge key={i} variant="secondary">{tech}</Badge>
                        ))}
                      </div>
                      <p className="text-muted-foreground text-sm flex-1">{project.description}</p>
                      <a href={project.url} target="_blank" rel="noopener noreferrer" className="mt-4">
                        <Button className="w-full">View Project</Button>
                      </a>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Testimonials */}
        <section id="testimonials" ref={testimonialsRef} className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle>What People Say</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {testimonials.map((testimonial, idx) => (
                  <Card key={idx} id={`testimonial-${idx}`} className="h-full">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4 mb-4">
                        <Image
                          src={testimonial.image}
                          alt={testimonial.name}
                          width={50}
                          height={50}
                          className="rounded-full"
                        />
                        <div>
                          <h3 className="font-semibold">{testimonial.name}</h3>
                          <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{testimonial.testimonial}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Clients */}
        <section id="clients" ref={clientsRef} className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Companies I've Worked With</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center">
                {clients.map((client, idx) => (
                  <a
                    key={idx}
                    href={client.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-80 transition-opacity"
                  >
                    <Image
                      src={client.logo}
                      alt={client.name}
                      width={150}
                      height={50}
                      className="w-full h-auto object-contain"
                    />
                  </a>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Contact */}
        <section id="contact" ref={contactRef} className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Let's Build Something Amazing</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-muted-foreground">
                Ready to take your e-commerce experience to the next level? Send me a message and let's get started!
              </p>
              <a href="mailto:israteneda@gmail.com">
                <Button id="contact-btn" className="w-full">Contact Me</Button>
              </a>
            </CardContent>
          </Card>
        </section>

        <footer className="text-center text-xs text-muted-foreground mt-8">
          © {new Date().getFullYear()} Israel Teneda · Built with shadcn/ui + Next.js
        </footer>
      </div>
    </main>
  );
}