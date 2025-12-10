import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { ThemeProvider } from "styled-components";
import { theme } from "../styles/theme";
import { GlobalStyles } from "../styles/GlobalStyles";
import Navigation from "./Navigation";
import SocialSidebars from "./SocialSidebars";
import Loader from "./Loader";

const LayoutWrapper = styled.div`
  min-height: 100vh;
  position: relative;
`;

const BackgroundGradient = styled.div`
  position: fixed;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(
    circle at 50% 50%,
    rgba(255, 255, 255, 0.02) 0%,
    rgba(255, 255, 255, 0.01) 35%,
    transparent 70%
  );
  animation: rotate 40s linear infinite;
  pointer-events: none;
  z-index: 0;

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const GridOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(
      rgba(255, 255, 255, 0.01) 1px,
      transparent 1px
    ),
    linear-gradient(90deg, rgba(255, 255, 255, 0.01) 1px, transparent 1px);
  background-size: 50px 50px;
  pointer-events: none;
  z-index: 0;
`;

const MainContent = styled.main`
  position: relative;
  z-index: 1;
  padding: 0 ${({ theme }) => theme.spacing["4xl"]};

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    padding: 0 ${({ theme }) => theme.spacing.xl};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 0 ${({ theme }) => theme.spacing.lg};
  }
`;

const Layout = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Loader isLoaded={!isLoading} />
      <LayoutWrapper>
        <BackgroundGradient />
        <GridOverlay />
        <Navigation />
        <SocialSidebars />
        <MainContent>{children}</MainContent>
      </LayoutWrapper>
    </ThemeProvider>
  );
};

export default Layout;
