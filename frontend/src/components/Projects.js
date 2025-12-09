import React, { useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";

const ProjectsSection = styled.section`
  min-height: 100vh;
  padding: ${({ theme }) => theme.spacing["3xl"]}
    ${({ theme }) => theme.spacing.lg};
  position: relative;
`;

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`;

const SectionNumber = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.fonts.mono};
  margin-right: ${({ theme }) => theme.spacing.md};
`;

const SectionTitle = styled(motion.h2)`
  font-size: clamp(
    ${({ theme }) => theme.fontSizes["2xl"]},
    4vw,
    ${({ theme }) => theme.fontSizes["3xl"]}
  );
  margin-bottom: ${({ theme }) => theme.spacing["2xl"]};
  display: flex;
  align-items: center;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};

  &::after {
    content: "";
    flex: 1;
    height: 1px;
    background: ${({ theme }) => theme.colors.surfaceLight};
    margin-left: ${({ theme }) => theme.spacing.lg};
    max-width: 300px;
  }
`;

const ProjectsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing["4xl"]};
`;

const ProjectCard = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  align-items: center;
  position: relative;
  grid-row: 1;

  &:nth-child(even) {
    direction: rtl;

    & > * {
      direction: ltr;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    display: flex;
    flex-direction: column;
  }
`;

const ProjectImage = styled.a`
  grid-column: 1 / 8;
  grid-row: 1;
  position: relative;
  z-index: 1;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  overflow: hidden;
  background: ${({ theme }) => theme.colors.surface};

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${({ theme }) => theme.colors.primary};
    opacity: 0.3;
    z-index: 2;
    transition: opacity ${({ theme }) => theme.animations.medium} ease;
  }

  &:hover::before {
    opacity: 0;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    width: 100%;
  }
`;

const ProjectImagePlaceholder = styled.div`
  width: 100%;
  aspect-ratio: 16 / 9;
  background: ${({ theme }) => theme.colors.surfaceLight};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.fontSizes["5xl"]};
`;

const ProjectContent = styled.div`
  grid-column: 6 / -1;
  grid-row: 1;
  position: relative;
  z-index: 2;
  text-align: right;

  ${ProjectCard}:nth-child(even) & {
    text-align: left;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    text-align: left;
    padding: ${({ theme }) => theme.spacing.lg};
    background: ${({ theme }) => theme.colors.surface};
    border-radius: ${({ theme }) => theme.borderRadius.md};
  }
`;

const ProjectLabel = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.fonts.mono};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const ProjectTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes["2xl"]};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.text};
  font-weight: 600;

  a {
    color: ${({ theme }) => theme.colors.text};
    text-decoration: none;
    transition: color ${({ theme }) => theme.animations.fast} ease;

    &:hover {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

const ProjectDescription = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.fontSizes.base};
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.6;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  box-shadow: 0 10px 30px -15px rgba(0, 0, 0, 0.3);

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    background: transparent;
    padding: 0;
    box-shadow: none;
  }
`;

const TechStack = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.md};
  list-style: none;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  justify-content: flex-end;

  ${ProjectCard}:nth-child(even) & {
    justify-content: flex-start;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    justify-content: flex-start;
  }
`;

const TechItem = styled.li`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-family: ${({ theme }) => theme.fonts.mono};
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  justify-content: flex-end;

  ${ProjectCard}:nth-child(even) & {
    justify-content: flex-start;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    justify-content: flex-start;
  }
`;

const IconLink = styled.a`
  color: ${({ theme }) => theme.colors.textSecondary};
  transition: color ${({ theme }) => theme.animations.fast} ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-3px);
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

const ShowMoreButton = styled(motion.button)`
  display: block;
  margin: ${({ theme }) => theme.spacing["3xl"]} auto 0;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  background: transparent;
  color: ${({ theme }) => theme.colors.primary};
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-family: ${({ theme }) => theme.fonts.mono};
  cursor: pointer;
  transition: all ${({ theme }) => theme.animations.medium} ease;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    transform: translateY(-3px);
  }
`;

const projects = [
  {
    title: "E-Commerce Platform",
    description:
      "A full-stack e-commerce solution with real-time inventory management, secure payment integration, and advanced analytics dashboard. Built with modern technologies to handle high traffic and ensure seamless user experience.",
    tech: ["React", "Node.js", "MongoDB", "Stripe", "Redis"],
    github: "#",
    demo: "#",
    icon: "🛍️",
  },
  {
    title: "Task Management App",
    description:
      "Collaborative task management tool with real-time updates, team collaboration features, and intelligent priority sorting. Designed to help teams stay organized and productive.",
    tech: ["Next.js", "TypeScript", "PostgreSQL", "Socket.io"],
    github: "#",
    demo: "#",
    icon: "✓",
  },
  {
    title: "Analytics Dashboard",
    description:
      "Real-time analytics platform with interactive data visualization, custom reporting, and predictive insights using machine learning algorithms.",
    tech: ["Gatsby", "GraphQL", "D3.js", "Python", "AWS"],
    github: "#",
    demo: "#",
    icon: "📊",
  },
  {
    title: "Social Media Platform",
    description:
      "Modern social networking platform with user profiles, real-time messaging, and content discovery algorithms. Supports millions of users with scalable architecture.",
    tech: ["React", "Express", "Socket.io", "Redis", "Docker"],
    github: "#",
    demo: "#",
    icon: "💬",
  },
];

const Projects = () => {
  const [showAll, setShowAll] = useState(false);
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const visibleProjects = showAll ? projects : projects.slice(0, 2);

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <ProjectsSection id="projects" ref={ref}>
      <Container>
        <SectionTitle
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <SectionNumber>03.</SectionNumber>
          Some Things I've Built
        </SectionTitle>

        <ProjectsList>
          <AnimatePresence>
            {visibleProjects.map((project, index) => (
              <ProjectCard
                key={project.title}
                variants={itemVariants}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                exit="hidden"
                transition={{ delay: index * 0.2 }}
              >
                <ProjectImage
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ProjectImagePlaceholder>
                    {project.icon}
                  </ProjectImagePlaceholder>
                </ProjectImage>

                <ProjectContent>
                  <ProjectLabel>Featured Project</ProjectLabel>
                  <ProjectTitle>
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {project.title}
                    </a>
                  </ProjectTitle>
                  <ProjectDescription>{project.description}</ProjectDescription>
                  <TechStack>
                    {project.tech.map((tech) => (
                      <TechItem key={tech}>{tech}</TechItem>
                    ))}
                  </TechStack>
                  <ProjectLinks>
                    <IconLink
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="GitHub"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                      </svg>
                    </IconLink>
                    <IconLink
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="External Link"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                        <polyline points="15 3 21 3 21 9"></polyline>
                        <line x1="10" y1="14" x2="21" y2="3"></line>
                      </svg>
                    </IconLink>
                  </ProjectLinks>
                </ProjectContent>
              </ProjectCard>
            ))}
          </AnimatePresence>
        </ProjectsList>

        {!showAll && projects.length > 2 && (
          <ShowMoreButton
            onClick={() => setShowAll(true)}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Show More Projects
          </ShowMoreButton>
        )}
      </Container>
    </ProjectsSection>
  );
};

export default Projects;
