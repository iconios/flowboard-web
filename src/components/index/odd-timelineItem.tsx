// Odd index timeline component

import { TimelineItemType } from "@/lib/index.types";
import theme from "@/lib/theme";
import { Box, Stack, Typography, useMediaQuery } from "@mui/material";
import Image from "next/image";

const OddTimelineItem = ({
  title,
  description,
  isLast,
  img,
}: TimelineItemType) => {
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Box
      sx={{
        flexDirection: { xs: "column", md: "row" },
        display: "flex",
        justifyContent: "center",
        backgroundColor: "#FF6D00",
        mb: isLast ? { xs: 2, sm: 12 } : { xs: 1, sm: 2 },
        borderRadius: { xs: 5, sm: 10 },
      }}
    >
      <Box
        sx={{
          width: { xs: "100%", md: "50%" },
          px: { xs: 4, md: 8},
          pt: { xs: 4, md: 0 },
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
        }}
      >
        <Stack direction="column" spacing={2}>
          <Typography variant="h5" sx={{ textAlign: "center" }}>
            {title}
          </Typography>
          <Typography variant="body2" sx={{ textAlign: "center", fontSize: {xs: 22, md: 18} }}>
            {description}
          </Typography>
        </Stack>
      </Box>
      <Box sx={{ width: { xs: "100%", md: "50%" }, p: 2, 
          justifyContent: "center",
          alignItems: "center",
          display: "flex", }}>
        {isMobile ? (
          <Image src={img.src} alt={img.alt} width={300} height={300} />
        ) : (
          <Image src={img.src} alt={img.alt} width={500} height={500} />
        )}
      </Box>
    </Box>
  );
};

export default OddTimelineItem;
