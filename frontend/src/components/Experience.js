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
    content: "—";
    position: absolute;
    left: 0;
    color: ${({ theme }) => theme.colors.primary};
    font-size: ${({ theme }) => theme.fontSizes.base};
  }
`;

const experiences = [
  {
    company: "Open Source & Freelance",
    title: "Full Stack Developer",
    duration: "Mar 2025 - Present",
    points: [
      "Shipped merged PRs to BizrAI across POS, invoicing, and customer modules — React 19, Redux Toolkit, Node.js, MongoDB",
      "Built ConvoFlow, a real-time chat app with sub-100ms delivery, Socket.IO, and Gemini AI-powered smart replies",
      "485+ GitHub contributions across 12 months, actively maintaining two open-source MERN projects",
    ],
  },
  {
    company: "Agaamin Technologies",
    title: "Software Engineer (Contract)",
    duration: "Sep 2024 - Mar 2025",
    points: [
      "Sole backend engineer on a decentralized student network — Nostr protocol, cryptographic keypairs, payment integrations",
      "Stood up Kafka event-streaming across 3 microservices, cutting inter-service latency by 45%",
      "Automated CI/CD with Cloud Build and Jenkins, trimming integration overhead by 40%",
    ],
  },
  {
    company: "Appfoster Technologies",
    title: "Flutter Developer (Intern)",
    duration: "Mar 2024 - Aug 2024",
    points: [
      "Delivered 4 HRMS modules for 200+ employees — dashboard, profile, PDF vault, notifications",
      "Tuned API response times from 500ms to 350ms with Redis caching and cursor-based pagination",
      "Integrated SonarQube and Grafana monitoring, reducing post-deployment defects by 20%",
    ],
  },
  {
    company: "Benciti Technology",
    title: "Software Engineer Intern",
    duration: "May 2022 - Jul 2022",
    points: [
      "Built automated unit testing services to cut manual QA time and surface bugs earlier",
      "Created daily test-report visualizations with C++, JavaScript, and VMWare tooling",
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
