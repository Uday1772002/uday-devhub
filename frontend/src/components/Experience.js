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
    company: "Independent",
    title: "Software Developer",
    duration: "Mar 2024 - Present",
    points: [
      "Developed TechTreads, a high-performance social platform using Hono and Bun, achieving sub-50ms API response times with GraphQL authentication",
      "Built RAG document analysis system with FastAPI and LangChain, reducing document search times by 90% through AI-powered semantic retrieval",
      "Earned AWS Solutions Architect Associate and Google Cloud Associate Engineer certifications",
      "Solved 240+ LeetCode problems in Python and C++, strengthening data structures and algorithms expertise",
    ],
  },
  {
    company: "Agaamin Technologies",
    title: "Software Engineer",
    duration: "Sep 2024 - Mar 2025",
    points: [
      "Developed decentralized real-time messaging system using Nostr protocol with end-to-end encryption",
      "Built backend infrastructure with Node.js handling 10,000+ daily active users",
      "Architected CI/CD pipelines using Cloud Build and Jenkins, reducing release cycles by 40%",
      "Integrated Apache Kafka for real-time data streaming and improved user engagement by 30%",
    ],
  },
  {
    company: "Appfoster",
    title: "Software Engineer Intern",
    duration: "Mar 2024 - Aug 2024",
    points: [
      "Led development of Flutter-based HRMS platform serving 200+ employees with direct stakeholder collaboration",
      "Optimized API performance using Redis caching and async processing, reducing response time by 30% (500ms to 350ms)",
      "Implemented automated testing frameworks and SonarQube analysis, reducing post-deployment defects by 20%",
      "Set up Grafana monitoring dashboards for continuous performance tracking and alerting",
    ],
  },
  {
    company: "Benciti Technology",
    title: "Software Engineer Intern",
    duration: "May 2022 - Jul 2022",
    points: [
      "Developed automated unit testing service to reduce manual testing time and accelerate bug identification",
      "Added new features and conducted thorough bug testing to ensure application functionality",
      "Created visualization tools for daily test reports using C++, JavaScript, and VMWare",
      "Improved development workflow efficiency and reduced manual testing overhead for the team",
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
