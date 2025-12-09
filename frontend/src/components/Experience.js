import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const ExperienceSection = styled.section`
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

const ExperienceContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
  align-items: flex-start;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: column;
  }
`;

const TabList = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 150px;
  border-left: 2px solid ${({ theme }) => theme.colors.surfaceLight};
  flex-shrink: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: row;
    border-left: none;
    border-bottom: 2px solid ${({ theme }) => theme.colors.surfaceLight};
    overflow-x: auto;
    min-width: 100%;
  }
`;

const Tab = styled(motion.button)`
  background: transparent;
  border: none;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  text-align: left;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-family: ${({ theme }) => theme.fonts.mono};
  color: ${({ $active, theme }) =>
    $active ? theme.colors.primary : theme.colors.textSecondary};
  cursor: pointer;
  transition: all ${({ theme }) => theme.animations.fast} ease;
  border-left: 2px solid
    ${({ $active, theme }) => ($active ? theme.colors.primary : "transparent")};
  position: relative;
  margin-left: -2px;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    color: ${({ theme }) => theme.colors.primary};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    border-left: none;
    border-bottom: 2px solid
      ${({ $active, theme }) =>
        $active ? theme.colors.primary : "transparent"};
    margin-left: 0;
    margin-bottom: -2px;
    white-space: nowrap;
  }
`;

const ContentPanel = styled(motion.div)`
  flex: 1;
`;

const JobTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.xs};

  span {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const JobDuration = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-family: ${({ theme }) => theme.fonts.mono};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const JobDescription = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const JobPoint = styled.li`
  font-size: ${({ theme }) => theme.fontSizes.base};
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.6;
  padding-left: ${({ theme }) => theme.spacing.lg};
  position: relative;

  &::before {
    content: "▹";
    position: absolute;
    left: 0;
    color: ${({ theme }) => theme.colors.primary};
    font-size: ${({ theme }) => theme.fontSizes.lg};
  }
`;

const experiences = [
  {
    company: "Tech Company",
    title: "Senior Full Stack Developer",
    duration: "Jan 2023 - Present",
    points: [
      "Developed and maintained scalable web applications using React, Node.js, and MongoDB, serving over 100K+ users",
      "Led a team of 5 developers in implementing new features and improving application performance by 40%",
      "Architected and deployed microservices infrastructure using Docker and Kubernetes on AWS",
      "Collaborated with cross-functional teams to deliver high-quality products on tight deadlines",
    ],
  },
  {
    company: "Startup Inc",
    title: "Full Stack Developer",
    duration: "Jun 2021 - Dec 2022",
    points: [
      "Built responsive web applications using React, TypeScript, and Next.js with focus on user experience",
      "Designed and implemented RESTful APIs and GraphQL endpoints for mobile and web applications",
      "Reduced page load times by 60% through code optimization and implementing lazy loading strategies",
      "Mentored junior developers and conducted code reviews to maintain code quality standards",
    ],
  },
  {
    company: "Digital Agency",
    title: "Frontend Developer",
    duration: "Jan 2020 - May 2021",
    points: [
      "Created pixel-perfect, responsive websites for clients across various industries",
      "Implemented modern frontend technologies including React, Gatsby, and styled-components",
      "Collaborated with designers and backend developers to deliver seamless user experiences",
      "Improved website accessibility scores by implementing WCAG 2.1 AA standards",
    ],
  },
];

const Experience = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <ExperienceSection id="experience" ref={ref}>
      <Container>
        <SectionTitle
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <SectionNumber>02.</SectionNumber>
          Where I've Worked
        </SectionTitle>

        <ExperienceContainer>
          <TabList>
            {experiences.map((exp, index) => (
              <Tab
                key={exp.company}
                $active={activeTab === index}
                onClick={() => setActiveTab(index)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {exp.company}
              </Tab>
            ))}
          </TabList>

          <ContentPanel
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <JobTitle>
              {experiences[activeTab].title}{" "}
              <span>@ {experiences[activeTab].company}</span>
            </JobTitle>
            <JobDuration>{experiences[activeTab].duration}</JobDuration>
            <JobDescription>
              {experiences[activeTab].points.map((point, index) => (
                <JobPoint key={index}>{point}</JobPoint>
              ))}
            </JobDescription>
          </ContentPanel>
        </ExperienceContainer>
      </Container>
    </ExperienceSection>
  );
};

export default Experience;
