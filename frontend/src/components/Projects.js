import React, { useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import techTreadsImg from "../images/TechTreads.png";
import rag1Img from "../images/RAG1.png";
import rag2Img from "../images/RAG2.png";
import rag3Img from "../images/RAG3.png";
import clinicHub1Img from "../images/ClinicHub1.png";
import clinicHub2Img from "../images/ClinicHub2.jpeg";
import clinicHub3Img from "../images/ClinicHub3.png";
import clinicHub4Img from "../images/clinicHub4.jpeg";

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
  pointer-events: none; /* Allow carousel to receive hover events */

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
  overflow: hidden;
  position: relative;
  pointer-events: auto; /* Enable hover events */

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
    transition: all ${({ theme }) => theme.animations.medium} ease;
    pointer-events: none; /* Don't block carousel interactions */
  }

  &:hover::before {
    background: rgba(255, 255, 255, 0.1);
    opacity: 1;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ProjectContent = styled.div`
  grid-column: 6 / -1;
  grid-row: 1;
  position: relative;
  z-index: 2;
  text-align: right;
  align-self: start;
  margin-top: -2rem;

  ${ProjectCard}:nth-child(even) & {
    text-align: left;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    text-align: left;
    padding: ${({ theme }) => theme.spacing.lg};
    background: ${({ theme }) => theme.colors.surface};
    border-radius: ${({ theme }) => theme.borderRadius.md};
    margin-top: 0;
  }
`;

const ProjectLabel = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.fonts.mono};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const ProjectTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
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
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.5;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  box-shadow: 0 10px 30px -15px rgba(0, 0, 0, 0.7);
  max-height: 110px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    padding: ${({ theme }) => theme.spacing.md};
    max-height: none;
    -webkit-line-clamp: unset;
  }
`;

const TechStack = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
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

const TechTag = styled.span`
  padding: 0.4rem 0.8rem;
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.primary};
  border-radius: 4px;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-family: ${({ theme }) => theme.fonts.mono};
  border: 1px solid rgba(187, 134, 252, 0.2);
  backdrop-filter: blur(10px);
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
  margin: ${({ theme }) => theme.spacing["3xl"]} 0 0 auto;
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
    title: "TechTreads",
    description:
      "High-performance social platform with nested comments, GraphQL authentication, and JWT-based access control. Achieved sub-50ms API response times using Hono and Bun runtime with full type-safety.",
    tech: [
      "Hono",
      "Bun",
      "Drizzle ORM",
      "Tanstack Router",
      "Tanstack Query",
      "GraphQL",
      "Docker",
      "Zod",
      "PostgreSQL",
    ],
    github: "https://github.com/Uday1772002/tech-treads",
    demo: null,
    icon: "💬",
    image: techTreadsImg,
  },
  {
    title: "RAG Document Analysis System",
    description:
      "AI-powered document analysis using Retrieval-Augmented Generation for intelligent querying. Built OCR engine with Tesseract for PDF processing. Reduced search time by 90% with sub-3 second responses.",
    tech: [
      "FastAPI",
      "Streamlit",
      "LangChain",
      "ChromaDB",
      "OCR (Tesseract)",
      "Sentence Transformers",
      "PyPDF2",
      "Python",
    ],
    github: "https://github.com/Uday1772002/RAG-System",
    demo: null,
    icon: "📄",
    images: [rag1Img, rag2Img, rag3Img],
  },
  {
    title: "ClinicHub",
    description:
      "Comprehensive healthcare management platform with role-based authentication (Admin, Doctor, Patient), real-time appointment updates via WebSocket, and automated PDF report generation. Features audit logging, email notifications, and analytics dashboard.",
    tech: [
      "Node.js",
      "Express",
      "MongoDB",
      "JWT",
      "WebSocket",
      "Docker",
      "Swagger",
      "Winston",
    ],
    github: "https://github.com/Uday1772002/Clinic_Hub",
    demo: null,
    icon: "🏥",
    images: [clinicHub1Img, clinicHub2Img, clinicHub3Img, clinicHub4Img],
  },
];

const ImageCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = React.useRef(null);

  if (!images || images.length === 0) return null;

  const startCarousel = () => {
    if (intervalRef.current) return;

    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 1000);
  };

  const stopCarousel = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setCurrentIndex(0);
  };

  return (
    <div
      onMouseEnter={startCarousel}
      onMouseLeave={stopCarousel}
      style={{
        width: "100%",
        height: "100%",
        cursor: "pointer",
        position: "relative",
        pointerEvents: "auto",
      }}
    >
      <img
        src={images[currentIndex]}
        alt="Project screenshot"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
        }}
      />
    </div>
  );
};

const Projects = () => {
  const [showAll, setShowAll] = useState(false);
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const visibleProjects = showAll ? projects : projects.slice(0, 2);

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
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                exit={{ opacity: 0, y: 50 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <ProjectImage
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ProjectImagePlaceholder>
                    {project.images ? (
                      <ImageCarousel images={project.images} />
                    ) : project.image ? (
                      <img src={project.image} alt={project.title} />
                    ) : (
                      project.icon
                    )}
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
                      <TechTag key={tech}>{tech}</TechTag>
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
                    {project.demo && (
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
                    )}
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
            Show More
          </ShowMoreButton>
        )}
      </Container>
    </ProjectsSection>
  );
};

export default Projects;
