import { ViewKanban, Hub, DragHandle } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Grow,
  Typography,
} from "@mui/material";
import { JSX } from "react";
import { Palette } from "./banner";

const brand = {
  orange: "#FF6B4A",
  blue: "#4A6BFF",
  teal: "#36C9A5",
  purple: "#7A5CFF",
} as const;

type BrandColor = keyof typeof brand;

const features: {
  icon: JSX.Element;
  title: string;
  description: string;
  color: BrandColor;
}[] = [
  {
    icon: <DragHandle fontSize="large" />,
    title: "Infinite Canvas",
    description: "No boundaries for your big ideas.",
    color: "orange",
  },
  {
    icon: <ViewKanban fontSize="large" />,
    title: "Visual Planning",
    description: "Kanban boards that live next to docs.",
    color: "teal",
  },
  {
    icon: <Hub fontSize="large" />,
    title: "Connected Thought",
    description: "Link notes to tasks instantly.",
    color: "purple",
  },
];

const Features = () => {  
  return (
    <>
      {/* Features Section */}
      <Box
        sx={{
          py: 15,
          bgcolor: Palette.background.alt,
          borderTop: 1,
          borderColor: Palette.border.light,
        }}
      >
        <Container maxWidth="xl">
          <Box sx={{ textAlign: "center", mb: 10 }}>
            <Typography
              color={Palette.brand.blue}
              fontWeight="bold"
              letterSpacing={2}
              textTransform="uppercase"
            >
              Workflow
            </Typography>
            <Typography variant="h2" sx={{ mt: 1, mb: 2 }}>
              One Space for Every Idea
            </Typography>
            <Typography
              color={Palette.text.muted}
              sx={{ fontSize: "1.125rem", maxWidth: 720, mx: "auto" }}
            >
              Why switch between five different apps when you can do it all in
              one infinite space?
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid size={{ xs: 12, md: 4 }} key={index}>
                <Grow in timeout={1000 + index * 200}>
                  <Card
                    sx={{
                      height: "100%",
                      transition: "all 0.3s",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        borderColor: brand[feature.color],
                        boxShadow: `0 20px 40px ${brand[feature.color]}22`,
                      },
                    }}
                  >
                    <CardContent sx={{ p: 4 }}>
                      <Avatar
                        sx={{
                          width: 56,
                          height: 56,
                          mb: 3,
                          bgcolor: `${brand[feature.color]}22`,
                          color: brand[feature.color],
                          "&:hover": {
                            bgcolor: brand[feature.color],
                            color: "white",
                          },
                        }}
                      >
                        {feature.icon}
                      </Avatar>
                      <Typography variant="h5" fontWeight="bold" gutterBottom>
                        {feature.title}
                      </Typography>
                      <Typography color={Palette.text.muted} sx={{ lineHeight: 1.6 }}>
                        {feature.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grow>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </>
  );
};

Features.displayName = "Features";

export default Features;
