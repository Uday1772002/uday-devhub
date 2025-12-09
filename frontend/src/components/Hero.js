import React, { useEffect, useRef } from "react";
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
  overflow: hidden;
`;

const HeroContent = styled.div`
  max-width: 1200px;
  width: 100%;
  z-index: 2;
`;

const GlitchWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const MainTitle = styled(motion.h1)`
  font-size: clamp(
    ${({ theme }) => theme.fontSizes["4xl"]},
    8vw,
    ${({ theme }) => theme.fontSizes["7xl"]}
  );
  font-weight: 700;
  line-height: 1.1;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.text};
  position: relative;
  display: inline-block;
`;

const Subtitle = styled(motion.h2)`
  font-size: clamp(
    ${({ theme }) => theme.fontSizes.xl},
    3vw,
    ${({ theme }) => theme.fontSizes["3xl"]}
  );
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: 400;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  max-width: 800px;

  span {
    color: ${({ theme }) => theme.colors.primary};
    font-weight: 600;
  }
`;

const Description = styled(motion.p)`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.textMuted};
  max-width: 600px;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  line-height: 1.8;
`;

const CTAContainer = styled(motion.div)`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  flex-wrap: wrap;
`;

const PrimaryButton = styled(motion.a)`
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => theme.colors.text};
  color: ${({ theme }) => theme.colors.background};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: 600;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  cursor: pointer;
  position: relative;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.glow};

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.3),
      transparent
    );
    transition: left ${({ theme }) => theme.animations.slow} ease;
  }

  &:hover::before {
    left: 100%;
  }

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.glowStrong};
    transform: translateY(-2px);
  }
`;

const SecondaryButton = styled(motion.a)`
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  background: transparent;
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: 600;
  border: 2px solid ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  cursor: pointer;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 100%;
    background: ${({ theme }) => theme.colors.primary};
    transition: width ${({ theme }) => theme.animations.medium} ease;
    z-index: -1;
  }

  &:hover::before {
    width: 100%;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.background};
    transform: translateY(-2px);
  }
`;

const FloatingShape = styled(motion.div)`
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.3;
  pointer-events: none;
`;

const ScrollIndicator = styled(motion.div)`
  position: absolute;
  bottom: ${({ theme }) => theme.spacing.xl};
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  cursor: pointer;
`;

const ScrollText = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textMuted};
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const ScrollLine = styled(motion.div)`
  width: 2px;
  height: 40px;
  background: linear-gradient(
    to bottom,
    ${({ theme }) => theme.colors.primary},
    transparent
  );
`;

const Hero = () => {
  const containerRef = useRef(null);

  const scrollToNext = () => {
    const nextSection = document.querySelector("#about");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <HeroSection id="home" ref={containerRef}>
      <FloatingShape
        style={{
          top: "10%",
          left: "10%",
          width: "300px",
          height: "300px",
          background: "rgba(255, 255, 255, 0.03)",
        }}
        animate={{
          y: [0, 30, 0],
          x: [0, 20, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <FloatingShape
        style={{
          bottom: "20%",
          right: "15%",
          width: "400px",
          height: "400px",
          background: "rgba(255, 255, 255, 0.02)",
        }}
        animate={{
          y: [0, -40, 0],
          x: [0, -30, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <HeroContent>
        <GlitchWrapper>
          <MainTitle
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Hi, I'm Jayaram Uday
          </MainTitle>
        </GlitchWrapper>

        <Subtitle
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          I craft <span>digital experiences</span> that inspire
        </Subtitle>

        <Description
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          A passionate developer specializing in building exceptional web
          applications with modern technologies. Turning ideas into elegant,
          functional solutions.
        </Description>

        <CTAContainer
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
        >
          <PrimaryButton
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              document
                .querySelector("#projects")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View My Work
          </PrimaryButton>
          <SecondaryButton
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document
                .querySelector("#contact")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get In Touch
          </SecondaryButton>
        </CTAContainer>
      </HeroContent>

      <ScrollIndicator
        onClick={scrollToNext}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <ScrollText>Scroll</ScrollText>
        <ScrollLine
          animate={{ scaleY: [1, 1.5, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </ScrollIndicator>
    </HeroSection>
  );
};

export default Hero;
