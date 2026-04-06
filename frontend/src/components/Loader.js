import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";

const fadeOut = keyframes`
  from {
    opacity: 1;
    visibility: visible;
  }
  to {
    opacity: 0;
    visibility: hidden;
  }
`;

const blink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`;

const LoaderWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.colors.background};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  z-index: 9999;
  animation: ${({ $isLoaded }) => ($isLoaded ? fadeOut : "none")} 0.4s ease-out
    forwards;
`;

const LoaderLine = styled.div`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textMuted};
  letter-spacing: 0.05em;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transform: translateY(${({ $visible }) => ($visible ? "0" : "4px")});
  transition: all 0.3s ease;
`;

const LoaderName = styled.div`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
  letter-spacing: 6px;
  text-transform: uppercase;
  margin-top: 8px;
`;

const Cursor = styled.span`
  display: inline-block;
  width: 8px;
  height: 16px;
  background: ${({ theme }) => theme.colors.primary};
  margin-left: 4px;
  vertical-align: middle;
  animation: ${blink} 1s step-end infinite;
`;

const bootSteps = [
  { text: "loading modules", delay: 200 },
  { text: "ready", delay: 1400 },
];

const Loader = ({ isLoaded }) => {
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    bootSteps.forEach((step, index) => {
      setTimeout(() => setVisibleLines(index + 1), step.delay);
    });
  }, []);

  return (
    <LoaderWrapper $isLoaded={isLoaded}>
      {bootSteps.map((step, index) => (
        <LoaderLine key={index} $visible={index < visibleLines}>
          {step.text}
        </LoaderLine>
      ))}
      <LoaderName>
        Jayaram Uday
        <Cursor />
      </LoaderName>
    </LoaderWrapper>
  );
};

export default Loader;
