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
    box-shadow: 0 0 20px rgba(187, 134, 252, 0.4);

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
              href="/resume.pdf"
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
            </MobileMenu>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
