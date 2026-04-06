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
    <title>Jayaram Uday — Software Engineer</title>
    <meta
      name="description"
      content="Software engineer building APIs, microservices, and cloud-native infrastructure"
    />
    <meta property="og:title" content="Jayaram Uday — Software Engineer" />
    <meta
      property="og:description"
      content="Software engineer building APIs, microservices, and cloud-native infrastructure"
    />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://jayaramuday.com" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Jayaram Uday — Software Engineer" />
    <meta
      name="twitter:description"
      content="Software engineer building APIs, microservices, and cloud-native infrastructure"
    />
  </>
);
