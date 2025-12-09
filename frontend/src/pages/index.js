import React from "react";
import Hero from "../components/Hero";
import About from "../components/About";
import Experience from "../components/Experience";
import Projects from "../components/Projects";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

const IndexPage = () => {
  return (
    <>
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Contact />
      <Footer />
    </>
  );
};

export default IndexPage;

export const Head = () => (
  <>
    <title>Jayaram Uday - Portfolio</title>
    <meta
      name="description"
      content="A minimalist portfolio showcasing my work and expertise"
    />
  </>
);
