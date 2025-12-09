import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

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

const ProfileImage = styled.div`
  width: 100%;
  aspect-ratio: 1;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.fontSizes["6xl"]};
  color: ${({ theme }) => theme.colors.textMuted};
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
              Hello! My name is Jayaram and I enjoy creating things that live on
              the internet. My interest in web development started back in 2020
              when I decided to try building custom websites — turns out hacking
              together projects taught me a lot about HTML, CSS & JavaScript!
            </Paragraph>

            <Paragraph>
              Fast-forward to today, and I've had the privilege of working at{" "}
              <a href="#">a startup</a>, <a href="#">a corporation</a>, and{" "}
              <a href="#">a digital agency</a>. My main focus these days is
              building accessible, inclusive products and digital experiences.
            </Paragraph>

            <Paragraph>
              I also recently launched a course that covers everything you need
              to build modern web applications with the latest technologies.
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
              <ProfileImage>👤</ProfileImage>
            </ImageWrapper>
            <ImageBorder />
          </ImageContainer>
        </ContentGrid>
      </Container>
    </AboutSection>
  );
};

export default About;
