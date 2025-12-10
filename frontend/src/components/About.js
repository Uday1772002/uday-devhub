import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import profileImg from "../images/uday.jpeg";

const AboutSection = styled.section`
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

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 3fr 2fr;
  gap: ${({ theme }) => theme.spacing["3xl"]};
  align-items: start;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.xl};
  }
`;

const TextContent = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const Paragraph = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.base};
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.7;

  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
    position: relative;

    &:hover {
      color: ${({ theme }) => theme.colors.text};
    }
  }

  .highlight {
    color: ${({ theme }) => theme.colors.primary};
    font-weight: 600;
  }
`;

const SkillsTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.base};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const SkillsList = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => theme.spacing.xs};
  list-style: none;
`;

const SkillItem = styled.li`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-family: ${({ theme }) => theme.fonts.mono};

  &::before {
    content: "▹";
    color: ${({ theme }) => theme.colors.primary};
    margin-right: ${({ theme }) => theme.spacing.xs};
  }
`;

const ImageContainer = styled(motion.div)`
  position: relative;
  max-width: 300px;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    max-width: 250px;
    margin: 0 auto;
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${({ theme }) => theme.colors.primary};
    opacity: 0.2;
    z-index: 2;
    transition: opacity ${({ theme }) => theme.animations.medium} ease;
  }

  &:hover::before {
    opacity: 0;
  }
`;

const ProfileImage = styled.img`
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  display: block;
  filter: grayscale(0%);
  transition: filter ${({ theme }) => theme.animations.medium} ease;

  ${ImageWrapper}:hover & {
    filter: grayscale(0%);
  }
`;

const ImageBorder = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  width: 100%;
  height: 100%;
  border: 2px solid ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  z-index: -1;
  transition: all ${({ theme }) => theme.animations.medium} ease;

  ${ImageWrapper}:hover ~ & {
    top: 15px;
    left: 15px;
  }
`;

const skills = [
  "JavaScript (ES6+)",
  "TypeScript",
  "React",
  "Node.js",
  "Gatsby",
  "Next.js",
  "MongoDB",
  "PostgreSQL",
];

const About = () => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <AboutSection id="about" ref={ref}>
      <Container>
        <SectionTitle
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <SectionNumber>01.</SectionNumber>
          About Me
        </SectionTitle>

        <ContentGrid>
          <TextContent
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Paragraph>
              Hello! I'm Jayaram, a{" "}
              <span className="highlight">Software Engineer</span> passionate
              about building scalable web applications and solving complex
              problems. My development journey started in 2020 at{" "}
              <span className="highlight">BML Munjal University</span>, where I
              discovered my love for creating things that live on the internet.
            </Paragraph>

            <Paragraph>
              I'm certified as a{" "}
              <span className="highlight">Google Associate Cloud Engineer</span>{" "}
              and{" "}
              <span className="highlight">
                AWS Solutions Architect Associate
              </span>
              . Currently, I'm sharpening my data structures and algorithms
              skills, building side projects like{" "}
              <span className="highlight">TechTreads</span> (a high-performance
              blogging platform) and a RAG-based document analysis system, while
              exploring new opportunities in software engineering.
            </Paragraph>

            <Paragraph>
              When I'm not coding, you'll find me grinding LeetCode problems (
              <span className="highlight">240+ solved</span> so far),
              experimenting with new tech stacks, or staying active at the gym.
              I was a finalist at{" "}
              <span className="highlight">Smart India Hackathon 2023</span> and
              Google Code Jam India.
            </Paragraph>

            <div>
              <SkillsTitle>
                Here are a few technologies I've been working with recently:
              </SkillsTitle>
              <SkillsList>
                {skills.map((skill, index) => (
                  <SkillItem key={index}>{skill}</SkillItem>
                ))}
              </SkillsList>
            </div>
          </TextContent>

          <ImageContainer
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <ImageWrapper>
              <ProfileImage src={profileImg} alt="Jayaram Uday" />
            </ImageWrapper>
            <ImageBorder />
          </ImageContainer>
        </ContentGrid>
      </Container>
    </AboutSection>
  );
};

export default About;
