"use client";
import Footer from "@/components/footer";
import Banner from "@/components/index/banner";
import Demo from "@/components/index/demo";
import Features from "@/components/index/features";
import FinalCTA from "@/components/index/finalCTA";
import Testimonials from "@/components/index/testimonials";
import NavBar from "@/components/NavBar";
import { Container, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const Home = () => {
  const theme = useTheme();

  // Handler for scrolling to a point on the page
  // Check tablet breakpoint
  const isTablet = useMediaQuery(theme.breakpoints.between("md", "lg"));
  if (isTablet) {
    console.log("Tablet mode");
  }

  return (
    <Container maxWidth="xl"
      sx={{
        bgcolor: "#ffffff",
        minHeight: "100vh",
        flex: 1,
      }}
    >
      <NavBar />
      <Banner />
      <Features />
      <Demo />
      <Testimonials />
      <FinalCTA />
      <Footer xs={"100%"} sm={"90%"} md={"90%"} />
    </Container>
  );
};

export default Home;
