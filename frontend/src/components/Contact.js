import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const ContactSection = styled.section`
  min-height: 100vh;
  padding: ${({ theme }) => theme.spacing["3xl"]}
    ${({ theme }) => theme.spacing.lg};
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  width: 100%;
  text-align: center;
`;

const SectionNumber = styled(motion.p)`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.fonts.mono};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const SectionTitle = styled(motion.h2)`
  font-size: clamp(
    ${({ theme }) => theme.fontSizes["3xl"]},
    5vw,
    ${({ theme }) => theme.fontSizes["5xl"]}
  );
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

const Description = styled(motion.p)`
  font-size: ${({ theme }) => theme.fontSizes.base};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: ${({ theme }) => theme.spacing["2xl"]};
  line-height: 1.8;
`;

const ContactButton = styled(motion.a)`
  display: inline-block;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.xl};
  border: 1px solid ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-family: ${({ theme }) => theme.fonts.mono};
  cursor: pointer;
  transition: all 0.3s ease;
  background: transparent;

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.background};
  }
`;

const Contact = () => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  return (
    <ContactSection id="contact" ref={ref}>
      <Container>
        <SectionNumber
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          04. What's Next?
        </SectionNumber>

        <SectionTitle
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Get In Touch
        </SectionTitle>

        <Description
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          I'm currently open to new opportunities. Whether you need a backend
          engineer or just want to discuss system design — my inbox is always
          open.
        </Description>

        <ContactButton
          href="mailto:jayaramuday17@gmail.com"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Say hello
        </ContactButton>
      </Container>
    </ContactSection>
  );
};

export default Contact;
