import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: ${({ theme }) => theme.spacing["2xl"]}
    ${({ theme }) => theme.spacing.lg};
`;

const HeroContent = styled.div`
  max-width: 720px;
  width: 100%;
  z-index: 2;
`;

const Greeting = styled(motion.p)`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  letter-spacing: 0.05em;
`;

const MainTitle = styled(motion.h1)`
  font-size: clamp(
    ${({ theme }) => theme.fontSizes["3xl"]},
    7vw,
    ${({ theme }) => theme.fontSizes["6xl"]}
  );
  font-weight: 600;
  line-height: 1.1;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.text};
`;

const Subtitle = styled(motion.h2)`
  font-size: clamp(
    ${({ theme }) => theme.fontSizes["2xl"]},
    4vw,
    ${({ theme }) => theme.fontSizes["4xl"]}
  );
  color: ${({ theme }) => theme.colors.textMuted};
  font-weight: 500;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  line-height: 1.2;
`;

const Description = styled(motion.p)`
  font-size: ${({ theme }) => theme.fontSizes.base};
  color: ${({ theme }) => theme.colors.textSecondary};
  max-width: 520px;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  line-height: 1.8;
`;

const CTAContainer = styled(motion.div)`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  flex-wrap: wrap;
`;

const PrimaryButton = styled(motion.a)`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  background: transparent;
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-family: ${({ theme }) => theme.fonts.mono};
  border: 1px solid ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.background};
  }
`;

const SecondaryButton = styled(motion.a)`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  background: transparent;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-family: ${({ theme }) => theme.fonts.mono};
  border: 1px solid ${({ theme }) => theme.colors.surfaceLight};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.textSecondary};
    color: ${({ theme }) => theme.colors.text};
  }
`;

const Accent = styled.span`
  display: block;
  width: 48px;
  height: 2px;
  background: ${({ theme }) => theme.colors.primary};
  margin-top: ${({ theme }) => theme.spacing.sm};
`;

const ScrollIndicator = styled(motion.div)`
  position: absolute;
  bottom: ${({ theme }) => theme.spacing.xl};
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  cursor: pointer;
`;

const ScrollLine = styled(motion.div)`
  width: 1px;
  height: 48px;
  background: ${({ theme }) => theme.colors.textMuted};
`;

const Hero = () => {
  const scrollToNext = () => {
    document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <HeroSection id="home">
      <HeroContent>
        <Greeting
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          Hello, my name is
        </Greeting>

        <MainTitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Jayaram Uday
          <Accent />
        </MainTitle>

        <Subtitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Software engineer. Systems thinker.
        </Subtitle>

        <Description
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          I design APIs, wire up microservices, and keep infrastructure humming.
          Cloud-certified, open-source active, always building.
        </Description>

        <CTAContainer
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <PrimaryButton
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              document
                .querySelector("#projects")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            View my work
          </PrimaryButton>
          <SecondaryButton
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document
                .querySelector("#contact")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Get in touch
          </SecondaryButton>
        </CTAContainer>
      </HeroContent>

      <ScrollIndicator
        onClick={scrollToNext}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <ScrollLine
          animate={{ scaleY: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </ScrollIndicator>
    </HeroSection>
  );
};

export default Hero;
