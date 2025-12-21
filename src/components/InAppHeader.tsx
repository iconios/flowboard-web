"use client";
import {
  AppBar,
  Container,
  Toolbar,
  Box,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
  Button,
  Menu,
  MenuItem,
  Stack,
} from "@mui/material";
import Link from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useUserContext } from "@/lib/user.context";
import MenuIcon from "@mui/icons-material/Menu";
import { useRouter } from "next/navigation";
const InAppHeader = ({
  title,
  backRoute,
  backView,
}: {
  title: string;
  backRoute?: string;
  backView: boolean;
}) => {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const { user, LogOut } = useUserContext();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"), { noSsr: true });
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // Mark when component is on client
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogin = () => {
    console.log("Login clicked");
    handleMenuClose();
    router.push("/welcome");
  };

  const handleLogout = () => {
    console.log("Logout clicked");
    handleMenuClose();
    LogOut();
  };

  // Determine button text safely
  const authButtonText = isClient && user.id ? "Logout" : "Login";
  const showUserDetails = isClient && user.id;

  return (
    <AppBar
      position="sticky"
      elevation={1}
      sx={{
        backgroundColor: "white",
        color: "text.primary",
        paddingY: 1,
      }}
    >
      <Container maxWidth="xl" disableGutters>
        <Toolbar
          sx={{
            minHeight: { xs: 56, sm: 64 },
            px: { xs: 2, sm: 3, md: 4 },
          }}
        >
          {/* Left Cluster: Back Arrow */}
          {backView && backRoute && (
            <Box
              aria-label="Nerdy logo"
              component={Link}
              href={backRoute || "#"}
            >
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="back button"
              >
                <ArrowBackIcon />
              </IconButton>
            </Box>
          )}

          {/* Flexible Spacer */}
          <Box sx={{ flexGrow: 1 }} />

          {/* Change title view if user details exists */}
          {!showUserDetails && !isMobile ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "row",
              }}
            >
              <Link href={"/"}>
                <Image
                  src={"/logo.png"}
                  alt={"FlowBoard Logo"}
                  height={40}
                  width={200}
                />
              </Link>
              <Typography variant="h5" sx={{ ml: 2, pt: 0.8 }}>
                {title}
              </Typography>
            </Box>
          ) : (
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h5" sx={{ textAlign: "center" }}>
                {title}
              </Typography>
            </Box>
          )}

          {/* Flexible Spacer */}
          <Box sx={{ flexGrow: 1 }} />

          {/* Right Cluster: Boards and Login buttons */}
          {isMobile ? (
            /* Mobile View */
            <Box>
              <IconButton
                size="large"
                edge="end"
                color="inherit"
                aria-label="menu"
                onClick={handleMenuOpen}
                sx={{
                  color: "text.primary",
                }}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                slotProps={{
                  paper: {
                    sx: {
                      mt: 1,
                      minWidth: 120,
                    },
                  },
                }}
              >
                <MenuItem
                  sx={{ p: 0, display: showUserDetails ? "block" : "none" }}
                  LinkComponent={Link}
                  href="/my-boards"
                  onClick={() => {
                    router.push("/my-boards");
                  }}
                >
                  <Button
                    sx={{
                      bgcolor: "primary.main",
                      color: "primary.contrastText",
                      ":hover": { bgcolor: "primary.dark" },
                      m: 0,
                      width: "100%",
                      py: 1.5,
                    }}
                  >
                    Boards
                  </Button>
                </MenuItem>
                <MenuItem
                  onClick={showUserDetails ? handleLogout : handleLogin}
                  sx={{ p: 0 }}
                  LinkComponent={Link}
                  href="/welcome"
                >
                  <Button
                    sx={{
                      bgcolor: "primary.main",
                      color: "primary.contrastText",
                      ":hover": { bgcolor: "primary.dark" },
                      m: 0,
                      width: "100%",
                      py: 1.5,
                    }}
                  >
                    {authButtonText}
                  </Button>
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            /* Desktop View */
            <Stack direction="row" spacing={2}>
              <Button
                onClick={() => {
                  router.push("/my-boards");
                }}
                variant="contained"
                sx={{
                  textTransform: "none",
                  fontWeight: 600,
                  bgcolor: "primary.main",
                  ":hover": { bgcolor: "primary.dark" },
                  fontSize: { sm: "0.9rem", md: "1rem" },
                  py: 1.5,
                  px: 3,
                  width: "100%",
                  display: showUserDetails ? "block" : "none",
                }}
              >
                Boards
              </Button>
              <Button
                variant="contained"
                size="small"
                sx={{
                  textTransform: "none",
                  fontWeight: 600,
                  bgcolor: "primary.main",
                  ":hover": { bgcolor: "primary.dark" },
                  fontSize: { sm: "0.9rem", md: "1rem" },
                  py: 1.5,
                  px: 3,
                  width: "100%",
                }}
                onClick={showUserDetails ? handleLogout : handleLogin}
              >
                {authButtonText}
              </Button>
            </Stack>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default InAppHeader;
