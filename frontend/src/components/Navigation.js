import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

const Nav = styled(motion.nav)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: ${({ theme }) => theme.zIndex.sticky};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  transition: all ${({ theme }) => theme.animations.medium} ease;
  background: ${({ $scrolled, theme }) =>
    $scrolled ? "rgba(10, 10, 10, 0.9)" : "transparent"};
  backdrop-filter: ${({ $scrolled }) => ($scrolled ? "blur(10px)" : "none")};
  border-bottom: ${({ $scrolled, theme }) =>
    $scrolled ? `1px solid ${theme.colors.surface}` : "none"};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ theme }) => theme.spacing.sm}
      ${({ theme }) => theme.spacing.md};
  }
`;

const NavContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(motion.div)`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: ${({ theme }) => theme.fontSizes["2xl"]};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 0;
    height: 2px;
    background: ${({ theme }) => theme.colors.text};
    transition: width ${({ theme }) => theme.animations.medium} ease;
  }

  &:hover::after {
    width: 100%;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: ${({ theme }) => theme.fontSizes.xl};
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
  align-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
  }
`;

const NavLink = styled(motion.a)`
  position: relative;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textSecondary};
  cursor: pointer;
  font-family: ${({ theme }) => theme.fonts.mono};

  span {
    color: ${({ theme }) => theme.colors.text};
    margin-right: 5px;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`;

const ResumeButton = styled(motion.a)`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border: 2px solid ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-family: ${({ theme }) => theme.fonts.mono};
  cursor: pointer;
  transition: all ${({ theme }) => theme.animations.medium} ease;
  position: relative;
  overflow: hidden;
  background: transparent;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: ${({ theme }) => theme.colors.primary};
    transition: left ${({ theme }) => theme.animations.medium} ease;
    z-index: -1;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.background};
    border-color: ${({ theme }) => theme.colors.primary};

    &::before {
      left: 0;
    }
  }
`;

const MobileMenuButton = styled(motion.button)`
  display: none;
  flex-direction: column;
  gap: 6px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: flex;
  }
`;

const MenuLine = styled(motion.span)`
  width: 24px;
  height: 2px;
  background: ${({ theme }) => theme.colors.text};
  border-radius: ${({ theme }) => theme.borderRadius.full};
`;

const MobileMenu = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  width: 70%;
  max-width: 300px;
  height: 100vh;
  background: rgba(26, 26, 26, 0.98);
  backdrop-filter: blur(20px);
  padding: ${({ theme }) => theme.spacing["2xl"]}
    ${({ theme }) => theme.spacing.lg};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  z-index: ${({ theme }) => theme.zIndex.modal};
`;

const MobileNavLink = styled(motion.a)`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textSecondary};
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing.sm} 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.surface};

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.7);
  z-index: ${({ theme }) => theme.zIndex.fixed};
`;

const navItems = [
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setScrolled(currentScrollY > 50);

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down
        setVisible(false);
      } else {
        // Scrolling up
        setVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
      <Nav
        $scrolled={scrolled}
        initial={{ y: -100 }}
        animate={{ y: visible ? 0 : -100 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <NavContainer>
          <Logo
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection("#home")}
          >
            JU
          </Logo>

          <NavLinks>
            {navItems.map((item, index) => (
              <NavLink
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.3 }}
              >
                <span>0{index + 1}.</span>
                {item.name}
              </NavLink>
            ))}
            <ResumeButton
              href="https://drive.google.com/file/d/1olbnlC6H7CHaYaMt8VsYHkoRV7I44qR7/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Resume
            </ResumeButton>
          </NavLinks>

          <MobileMenuButton
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileTap={{ scale: 0.9 }}
          >
            <MenuLine
              animate={
                mobileMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }
              }
            />
            <MenuLine
              animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
            />
            <MenuLine
              animate={
                mobileMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }
              }
            />
          </MobileMenuButton>
        </NavContainer>
      </Nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <Overlay
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
            />
            <MobileMenu
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25 }}
            >
              {navItems.map((item, index) => (
                <MobileNavLink
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {item.name}
                </MobileNavLink>
              ))}
              <ResumeButton
                href="https://drive.google.com/file/d/YOUR_FILE_ID/view"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navItems.length * 0.1 }}
                style={{ marginTop: "1rem" }}
              >
                Resume
              </ResumeButton>
              <div
                style={{
                  display: "flex",
                  gap: "1.5rem",
                  marginTop: "2rem",
                  justifyContent: "center",
                }}
              >
                <a
                  href="https://github.com/Uday1772002"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  style={{ color: "#a1a1aa", transition: "color 0.2s" }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
                <a
                  href="https://linkedin.com/in/jayaramuday"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  style={{ color: "#a1a1aa", transition: "color 0.2s" }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
                <a
                  href="mailto:jayaramuday17@gmail.com"
                  aria-label="Email"
                  style={{ color: "#a1a1aa", transition: "color 0.2s" }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </a>
              </div>
            </MobileMenu>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
