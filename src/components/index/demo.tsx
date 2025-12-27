import { Check, PlayArrow } from "@mui/icons-material";
import {
  Box,
  Container,
  Grid,
  Typography,
  Stack,
  Avatar,
  Paper,
} from "@mui/material";
import { Palette } from "./banner";

const Demo = () => {
  return (
    <>
      {/* Demo Section */}
      <Box sx={{ py: 15, position: "relative", overflow: "hidden" }}>
        <Box
          sx={{
            position: "absolute",
            right: 0,
            top: "50%",
            transform: "translateY(-50%)",
            width: 600,
            height: 600,
            bgcolor: "rgba(74, 107, 255, 0.05)",
            borderRadius: "50%",
            filter: "blur(100px)",
          }}
        />

        <Container maxWidth="xl">
          <Grid container spacing={8} alignItems="center">
            <Grid size={{ xs: 12, lg: 6 }}>
              <Box>
                <Typography
                  color={Palette.brand.purple}
                  fontWeight="bold"
                  letterSpacing={2}
                  textTransform="uppercase"
                >
                  Collaboration
                </Typography>
                <Typography variant="h2" sx={{ mt: 1, mb: 3 }}>
                  See FlowBoard in Action
                </Typography>
                <Typography
                  color={Palette.text.muted}
                  sx={{ fontSize: "1.125rem", mb: 4 }}
                >
                  Drag, drop, and connect everything. Experience true fluidity
                  in your workflow. Move from rough sketch to structured plan
                  without changing tabs.
                </Typography>

                <Stack spacing={3} mb={4}>
                  {[
                    { text: "Drag-and-Drop Interface", color: "teal" },
                    { text: "Real-time Collaboration", color: "orange" },
                  ].map((item, index) => (
                    <Box
                      key={index}
                      display="flex"
                      alignItems="flex-start"
                      gap={2}
                    >
                      <Avatar
                        sx={{
                          bgcolor: `rgba(var(--brand-${item.color}-rgb), 0.1)`,
                          color: `brand.${item.color}`,
                          width: 32,
                          height: 32,
                        }}
                      >
                        <Check fontSize="small" />
                      </Avatar>
                      <Box>
                        <Typography fontWeight="bold">{item.text}</Typography>
                        <Typography
                          variant="body2"
                          color={Palette.text.muted}
                          sx={{ mt: 0.5 }}
                        >
                          {index === 0
                            ? "Seamlessly move elements around the canvas to organize your thoughts naturally."
                            : "See your team's cursors fly across the board as you build together."}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Stack>
              </Box>
            </Grid>

            <Grid size={{ xs: 12, lg: 6 }}>
              <Paper
                sx={{
                  position: "relative",
                  aspectRatio: "4/3",
                  borderRadius: 4,
                  overflow: "hidden",
                  border: "1px solid",
                  borderColor: "grey.200",
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.1)",
                  cursor: "pointer",
                  "&:hover img": {
                    transform: "scale(1.05)",
                  },
                }}
              >
                <Box
                  component="img"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDqwfCfcFHQJ0QRrTuYjaYxgyXvxMoyRhU2ZOpLqeQ0LC_JNpuj91K1oSOEgPrdAFu7TxtQ8rtahrg04QrGNkq0d_x06AFsdV53DtvW7VAczPT2DXSa7xOpTSXzZ8sjAvonfEgF34U106eKlwZxXytoYqecWjxjSr0dqzIkEZFrh2OHaaj9A23GbOEfkkayGRpUbD-Oa_tc1eTxzVuu1wE-6rFH1GE029hGrZ6sqGlAW_9NNxwF7QYszArZRsKZKArlZ6V-67y2_IQ"
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.7s",
                  }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    inset: 0,
                    bgcolor: "rgba(0,0,0,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    "&:hover": {
                      bgcolor: "transparent",
                    },
                  }}
                >
                  <Avatar
                    sx={{
                      width: 80,
                      height: 80,
                      bgcolor: "rgba(255,255,255,0.2)",
                      backdropFilter: "blur(8px)",
                      border: "1px solid rgba(255,255,255,0.4)",
                      boxShadow: "0 0 30px rgba(255,255,255,0.4)",
                      "&:hover": {
                        transform: "scale(1.1)",
                      },
                    }}
                  >
                    <PlayArrow sx={{ fontSize: 48, color: "white" }} />
                  </Avatar>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Demo;
