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

const NoiseOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.03;
  pointer-events: none;
  z-index: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  background-repeat: repeat;
  background-size: 256px 256px;
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
    }, 2400);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Loader isLoaded={!isLoading} />
      <LayoutWrapper>
        <NoiseOverlay />
        <Navigation />
        <SocialSidebars />
        <MainContent>{children}</MainContent>
      </LayoutWrapper>
    </ThemeProvider>
  );
};

export default Layout;
