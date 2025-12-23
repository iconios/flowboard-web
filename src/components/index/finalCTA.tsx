import { Box, Container, Typography, Button } from "@mui/material";
import { Palette } from "./banner";
import { useRouter } from "next/navigation";

const FinalCTA = () => {
  const router = useRouter();
  return (
    <>
      {/* Final CTA Section */}
      <Box sx={{ py: 15, position: "relative", overflow: "hidden" }}>
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(135deg, rgba(74, 107, 255, 0.05), rgba(122, 92, 255, 0.05), rgba(255, 107, 74, 0.05))",
          }}
        />

        <Container maxWidth="md">
          <Box sx={{ textAlign: "center", position: "relative", zIndex: 1 }}>
            <Typography variant="h2" fontWeight="black" sx={{ mb: 3 }}>
              Ready to unclutter your mind?
            </Typography>
            <Typography
              color={Palette.text.muted}
              sx={{ fontSize: "1.25rem", fontWeight: 300, mb: 6 }}
            >
              Join the visual revolution. No credit card required.
            </Typography>
            <Button
              variant="contained"
              onClick={() => {router.push("/welcome")}}
              sx={{
                minWidth: 220,
                height: 64,
                px: 5,
                fontSize: "1.25rem",
                bgcolor: Palette.text.main,
                boxShadow: "0 10px 40px rgba(0,0,0,0.15)",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0 15px 50px rgba(0,0,0,0.2)",
                },
              }}
            >
              Get Started for Free
            </Button>
            <Typography color={Palette.text.muted} variant="body2" sx={{ mt: 4 }}>
              Free for individuals, forever.
            </Typography>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default FinalCTA;
