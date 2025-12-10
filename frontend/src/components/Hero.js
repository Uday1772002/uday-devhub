import React, { useRef } from "react";
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

  // Animated gradient mesh background
  &::before {
    content: "";
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(
        circle at 20% 50%,
        rgba(187, 134, 252, 0.08) 0%,
        transparent 50%
      ),
      radial-gradient(
        circle at 80% 80%,
        rgba(187, 134, 252, 0.05) 0%,
        transparent 50%
      );
    animation: meshMove 20s ease-in-out infinite;
    pointer-events: none;
  }

  @keyframes meshMove {
    0%,
    100% {
      transform: translate(0, 0) rotate(0deg);
    }
    50% {
      transform: translate(-5%, -5%) rotate(5deg);
    }
  }
`;

const HeroContent = styled.div`
  max-width: 900px;
  width: 100%;
  z-index: 2;
  text-align: left;
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
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.primary},
    ${({ theme }) => theme.colors.accent}
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
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
  justify-content: flex-start;
`;

const PrimaryButton = styled(motion.a)`
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.background};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: 600;
  border-radius: 50px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(187, 134, 252, 0.3);
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.text};
    color: ${({ theme }) => theme.colors.background};
    box-shadow: 0 15px 40px rgba(187, 134, 252, 0.5);
    transform: translateY(-2px);
  }

  span {
    position: relative;
    z-index: 1;
  }
`;

const SecondaryButton = styled(motion.a)`
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  background: transparent;
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: 600;
  border: 2px solid ${({ theme }) => theme.colors.primary};
  border-radius: 50px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 100%;
    background: ${({ theme }) => theme.colors.primary};
    transition: width 0.4s ease;
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
            <span>View My Work</span>
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
