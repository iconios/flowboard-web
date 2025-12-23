
"use client";

import { Star } from "@mui/icons-material";
import {
  Box,
  Container,
  Typography,
  Avatar,
  Card,
  CardContent,
  Grid,
} from "@mui/material";
import { Palette } from "./banner";

interface Testimonial {
  name: string;
  role: string;
  image: string;
  quote: string;
  color: 'blue' | 'purple' | 'teal' | 'orange';
}

const Testimonials = () => {
  // Create color mapping for easier access
  const brandColors: Record<'blue' | 'purple' | 'teal' | 'orange', string> = {
    blue: "#4A6BFF",
    purple: "#7A5CFF",
    teal: "#36C9A5",
    orange: "#FF6B4A"
  };

  const testimonials: Testimonial[] = [
    {
      name: "Sarah Jenkins",
      role: "Creative Director",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuANrgUTninzd7H8Kl7-q6SbCRMVNLbBJtZ_hPkJDwRCZebsbe4h1vz2dg2GmiLzUuK7assf-A6CmirLn3BrsqooEs3ckEB6140twUreK-EEajPtSMcTBc95izMzjq12RvE96uEgXxxq0jo6nA4P9nY0QPwoi9XXtmeMBQgW1dixYhYB5h7pyC_I_GJTg5p2sxCEJ9JkoUbPbvjhXFHEp4DkRxaAcROXMWKaXRT1XepisTd0ds47SE9WvgfJw30Ciz3mmP_7LG571pA",
      quote: '"The tool that finally replaced my 5 different productivity apps. I can finally see the big picture and the details at the same time."',
      color: "blue",
    },
    {
      name: "Marcus Chen",
      role: "Product Manager",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC6VNznq8dGUvLQZRw-hdBdCn2TR9TDLoaN_FZnjhGfSLx07EH-WErVPIyeQXMLowpJUcLtuMRzSAwhI3vlncXyddbeypwPM8jXBt2mQyr54q54DH9ovL3mUQLq1Kqr1H5iPbtkq4fa4YRJkf9K8ezSPM39lkBgvmDZA9prFpS8LytLG-PyZ_Mx4F8Zff7zxvg7CPvWTk8de22tUC1NMlYoHN174SWUuqQ7hbZj4AYXJ2otBuqw7xt0zSXDJvpmuI8J-X-UTuHQ1k8",
      quote: '"FlowBoard helped our team synchronize our roadmap visually. We spend less time in meetings and more time building."',
      color: "purple",
    },
    {
      name: "Elena Rodriguez",
      role: "Graduate Student",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCz4IQR3gLtJMBh7ZTEb7y5YJwJnw021wH3UwXsO4BKaXurDx_jTxKRrU8ppoXSsp-wO0THrVG6-LaouLHR9LF9WIu9JhevCYPD1_ePgPWLllJUw_k78fCP20RUXuUEsVqz2XTTf3hUnFMp4q_PcywcX2dw6RqCj794pephXtxwD7mVpB6Bdmt0wO5ar5E5fLDwM9kwzr74PnUMUl9HvQR03JdPEYY_wsy_2F6XKLdYNNRpvdlfvpCIRV_W4E-cXP0THhi1G-r7QOw",
      quote: '"Perfect for organizing my thesis research and mood boards. The infinite canvas is a game changer for complex topics."',
      color: "teal",
    },
  ];

  return (
    <>
      <Box
        sx={{
          py: 8,
          bgcolor: Palette.background.alt,
          borderTop: 1,
          borderBottom: 1,
          borderColor: Palette.border.light,
          position: "relative",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            left: 40,
            top: 40,
            width: 80,
            height: 80,
            border: 4,
            borderColor: "rgba(122, 92, 255, 0.1)",
            borderRadius: 2,
            rotate: "12deg",
          }}
        />

        <Container maxWidth="xl">
          <Box sx={{ textAlign: "center", mb: 8 }}>
            <Typography variant="h4" fontWeight="bold" mb={2}>
              Loved by Thinkers
            </Typography>
            <Typography
              color={Palette.text.muted}
              sx={{ fontSize: "1.125rem" }}
            >
              Join thousands of planners, creators, and doers.
            </Typography>
          </Box>

          <Grid container spacing={2} sx={{
                display: "flex",
                overflowX: "auto",
                gap: 2,
                pb: 4,
                px: { xs: 2, md: 0 },
                mx: { xs: -2, md: 0 },
              }}>
              {testimonials.map((testimonial, index) => {
                const borderColor = brandColors[testimonial.color] ;
                const hoverShadow = `0 20px 40px ${borderColor}20`;
                return (
                  <Grid key={index} size={{ xs: 12, sm: 6, md: 4}}>
                    <Card
                      sx={{
                        flexShrink: 0,
                        transition: "all 0.3s",
                        "&:hover": {
                          borderColor: borderColor,
                          boxShadow: hoverShadow,
                        },
                      }}
                    >
                      <CardContent sx={{ p: 2 }}>
                        <Box display="flex" alignItems="center" gap={3} mb={3}>
                          <Avatar
                            src={testimonial.image}
                            sx={{
                              width: 48,
                              height: 48,
                              border: 2,
                              borderColor: borderColor,
                            }}
                          />
                          <Box>
                            <Typography fontWeight="bold">
                              {testimonial.name}
                            </Typography>
                            <Typography
                              variant="caption"
                              fontWeight="bold"
                              color={borderColor}
                              textTransform="uppercase"
                            >
                              {testimonial.role}
                            </Typography>
                          </Box>
                        </Box>
                        <Typography
                          color={Palette.text.muted}
                          fontStyle="italic"
                          sx={{ mb: 3, lineHeight: 1.6 }}
                        >
                          {testimonial.quote}
                        </Typography>
                        <Box display="flex" gap={0.5}>
                          {[1,2,3,4,5].map((_, i) => (
                            <Star
                              key={i}
                              sx={{ color: "yellow", fontSize: 20 }}
                            />
                          ))}
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })}
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Testimonials;
