"use client";

import { Check, Group, Lightbulb, PlayArrow } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Container,
  keyframes,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";

export const Palette = {
    background: {
      light: "#ffffff",
      alt: "#f8fafc",
      default: "#ffffff",
    },
    text: {
      main: "#0f172a",
      muted: "#64748b",
    },
    border: {
      light: "#e2e8f0",
    },
    brand: {
      orange: "#FF6B4A",
      blue: "#4A6BFF",
      teal: "#36C9A5",
      purple: "#7A5CFF",
    },
  }

const Banner = () => {
  const router = useRouter();

  // Animation keyframes
  const floatAnimation = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

  const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;
  return (
    <>
      {/* Hero Section */}
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          py: { xs: 10, md: 15 },
        }}
      >
        {/* Background blurs */}
        <Box
          sx={{
            position: "absolute",
            top: "-10%",
            left: "-10%",
            width: 500,
            height: 500,
            bgcolor: "rgba(255, 107, 74, 0.1)",
            borderRadius: "50%",
            filter: "blur(100px)",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: "-10%",
            right: "-10%",
            width: 600,
            height: 600,
            bgcolor: "rgba(74, 107, 255, 0.1)",
            borderRadius: "50%",
            filter: "blur(100px)",
          }}
        />

        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", position: "relative", zIndex: 1 }}>
            {/* Version badge */}
            <Paper
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 1,
                px: 2,
                py: 0.5,
                borderRadius: 20,
                bgcolor: "white",
                border: "1px solid",
                borderColor: "grey.200",
                mb: 4,
              }}
            >
              <Box sx={{ position: "relative", width: 8, height: 8 }}>
                <Box
                  sx={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%",
                    bgcolor: Palette.brand.teal,
                    opacity: 0.75,
                    animation: "pulse 2s infinite",
                  }}
                />
                <Box
                  sx={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%",
                    bgcolor: Palette.brand.teal,
                  }}
                />
              </Box>
              <Typography
                variant="caption"
                fontWeight="bold"
                color={Palette.brand.teal}
              >
                v2.0 is live
              </Typography>
            </Paper>

            {/* Main headline */}
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: "3rem", md: "5rem", lg: "6rem" },
                lineHeight: 1.05,
                mb: 3,
              }}
            >
              Think. Plan. Create.
              <br />
              <Box
                component="span"
                sx={{
                  background:
                    "linear-gradient(90deg, #FF6B4A, #7A5CFF, #4A6BFF)",
                  backgroundSize: "200% 200%",
                  animation: `${gradientAnimation} 6s ease infinite`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                All on One Canvas.
              </Box>
            </Typography>

            <Typography
              color={Palette.text.muted}
              sx={{
                fontSize: { xs: "1.125rem", md: "1.25rem" },
                maxWidth: 680,
                mx: "auto",
                mb: 6,
              }}
            >
              FlowBoard unifies your mind maps, tasks, and notes into a single,
              vibrant workspace. Stop switching apps and start connecting ideas.
            </Typography>

            {/* CTA Buttons */}
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={3}
              justifyContent="center"
              mb={10}
            >
              <Button
                variant="contained"
                onClick={() => {
                  router.push("/welcome");
                }}
                sx={{
                  minWidth: 180,
                  height: 56,
                  px: 4,
                  background: "linear-gradient(90deg, #4A6BFF, #7A5CFF)",
                  fontSize: "1.125rem",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: "0 10px 25px rgba(122, 92, 255, 0.25)",
                  },
                }}
              >
                Start Flowing – It's Free
              </Button>
              <Button
                variant="outlined"
                sx={{
                  minWidth: 180,
                  height: 56,
                  px: 4,
                  fontSize: "1.125rem",
                  borderColor: "grey.200",
                  "&:hover": {
                    bgcolor: "grey.50",
                    borderColor: "grey.300",
                  },
                }}
                startIcon={<PlayArrow sx={{ color: Palette.brand.orange }} />}
              >
                Watch Demo
              </Button>
            </Stack>

            {/* Feature showcase image */}
            <Paper
              sx={{
                borderRadius: 4,
                border: "1px solid",
                borderColor: "grey.200",
                bgcolor: "rgba(255, 255, 255, 0.4)",
                backdropFilter: "blur(20px)",
                p: 2,
                position: "relative",
                overflow: "hidden",
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.1)",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  inset: -1,
                  background:
                    "linear-gradient(90deg, #FF6B4A, #36C9A5, #7A5CFF)",
                  borderRadius: 17,
                  opacity: 0.2,
                  zIndex: -1,
                },
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  aspectRatio: "16/9",
                  borderRadius: 3,
                  backgroundImage:
                    "url(https://lh3.googleusercontent.com/aida-public/AB6AXuBu6RK5pOxJ-sxmZP6lGDGmg5dd17Eth-PFCDSJvLCnN7lE8_Fk2JGZ5P2Hw_y1pUECunM-_MZeWtWbP95mz_VfgUMadfxxEWEi1B3XQE7CFi_Ka8WDQaEieVhEW1QE-WNAA2xPCdFi__cUtdqACcud8qJGMLsTucltYgYp86KQ_mtfsFXz__C6ELxYhfmYokx24wB_Cim4ejB6haFaWOxmKPsHcxYUm5KcCoPOrgCHHA7LkyV6bXCaPGWI33vcM-Dbx4vXdUYGvM0)",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  position: "relative",
                }}
              >
                {/* Floating cards */}
                <Paper
                  sx={{
                    position: "absolute",
                    top: "20%",
                    left: "15%",
                    p: 2,
                    pr: 3,
                    borderRadius: 2,
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    animation: `${floatAnimation} 6s ease-in-out infinite`,
                    backdropFilter: "blur(10px)",
                    bgcolor: "rgba(255, 255, 255, 0.95)",
                  }}
                >
                  <Avatar
                    sx={{
                      bgcolor: "rgba(54, 201, 165, 0.1)",
                      color: Palette.brand.teal,
                    }}
                  >
                    <Check />
                  </Avatar>
                  <Box>
                    <Typography
                      variant="caption"
                      color={Palette.text.muted}
                      fontWeight="bold"
                      textTransform="uppercase"
                    >
                      Status
                    </Typography>
                    <Typography variant="body2" fontWeight="bold">
                      Design System
                    </Typography>
                  </Box>
                </Paper>

                <Paper
                  sx={{
                    position: "absolute",
                    bottom: "25%",
                    right: "15%",
                    p: 2,
                    pr: 3,
                    borderRadius: 2,
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    animation: `${floatAnimation} 5s ease-in-out infinite reverse`,
                    backdropFilter: "blur(10px)",
                    bgcolor: "rgba(255, 255, 255, 0.95)",
                  }}
                >
                  <Avatar
                    sx={{
                      bgcolor: "rgba(122, 92, 255, 0.1)",
                      color: Palette.brand.purple,
                    }}
                  >
                    <Group />
                  </Avatar>
                  <Box>
                    <Typography
                      variant="caption"
                      color={Palette.text.muted}
                      fontWeight="bold"
                      textTransform="uppercase"
                    >
                      Team
                    </Typography>
                    <Typography variant="body2" fontWeight="bold">
                      Brainstorming
                    </Typography>
                  </Box>
                </Paper>

                <Paper
                  sx={{
                    position: "absolute",
                    top: "40%",
                    right: "30%",
                    p: 2,
                    pr: 3,
                    borderRadius: 2,
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    animation: `${floatAnimation} 7s ease-in-out infinite 1s`,
                    backdropFilter: "blur(10px)",
                    bgcolor: "rgba(255, 255, 255, 0.95)",
                  }}
                >
                  <Avatar
                    sx={{
                      bgcolor: "rgba(255, 107, 74, 0.1)",
                      color: Palette.brand.orange,
                    }}
                  >
                    <Lightbulb />
                  </Avatar>
                  <Box>
                    <Typography
                      variant="caption"
                      color={Palette.text.muted}
                      fontWeight="bold"
                      textTransform="uppercase"
                    >
                      Idea
                    </Typography>
                    <Typography variant="body2" fontWeight="bold">
                      New Feature
                    </Typography>
                  </Box>
                </Paper>
              </Box>
            </Paper>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Banner;
