import React from "react";
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

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
    opacity: 0.8;
  }
  50% {
    transform: scale(1.05);
    opacity: 1;
  }
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
  gap: 32px;
  z-index: 9999;
  animation: ${({ $isLoaded }) => ($isLoaded ? fadeOut : "none")} 0.5s ease-out
    forwards;
`;

const SpinnerContainer = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
`;

const Spinner = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border: 4px solid transparent;
  border-top-color: ${({ theme }) => theme.colors.primary};
  border-right-color: ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  animation: ${rotate} 1s linear infinite;
`;

const InnerSpinner = styled.div`
  position: absolute;
  top: 12px;
  left: 12px;
  right: 12px;
  bottom: 12px;
  border: 3px solid transparent;
  border-bottom-color: ${({ theme }) => theme.colors.primary};
  border-left-color: ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  animation: ${rotate} 1.5s linear infinite reverse;
  opacity: 0.6;
`;

const CenterDot = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 20px;
  height: 20px;
  background: ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  animation: ${pulse} 1.5s ease-in-out infinite;
`;

const LoadingText = styled.div`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: ${({ theme }) => theme.fontSizes["2xl"]};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  letter-spacing: 4px;
`;

const SubText = styled.div`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.primary};
  margin-top: -16px;
`;

const Loader = ({ isLoaded }) => {
  return (
    <LoaderWrapper $isLoaded={isLoaded}>
      <SpinnerContainer>
        <Spinner />
        <InnerSpinner />
        <CenterDot />
      </SpinnerContainer>
      <LoadingText>JAYARAM UDAY</LoadingText>
      <SubText>// Initializing Portfolio</SubText>
    </LoaderWrapper>
  );
};

export default Loader;
