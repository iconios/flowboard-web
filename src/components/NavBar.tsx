/* eslint-disable @typescript-eslint/no-unnecessary-condition */
// The top navigation bar
"use client";
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Container,
  IconButton,
  Menu,
  MenuItem,
  useTheme,
  useMediaQuery,
  Stack,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import Link from "next/link";
import { useUserContext } from "@/lib/user.context";
import Image from "next/image";
import { useRouter } from "next/navigation";

const NavBar = () => {
  const router = useRouter();
  const { user, LogOut } = useUserContext();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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
          {/* Left Cluster: Nerdy Logo */}
          <Box aria-label="Nerdy logo" component={Link} href="/">
            <Image
              src="/logo.png"
              alt="FlowBoard Logo"
              height={40}
              width={200}
            />
          </Box>

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
                      minWidth: 120,
                      m: 0,
                    },
                  },
                }}
              >
                <MenuItem
                  onClick={() => {
                    router.push("/my-boards");
                  }}
                  sx={{ p: 0, display: user.id ? "block" : "none" }}
                  LinkComponent={Link}
                  href="/my-boards"
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
                  onClick={user.id ? handleLogout : handleLogin}
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
                    {user.id ? "Logout" : "Login"}
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
                  px: 3,
                  py: 1.5,
                  width: "100%",
                  display: user.id ? "block" : "none",
                }}
              >
                Boards
              </Button>
              <Button
                variant="contained"
                sx={{
                  textTransform: "none",
                  fontWeight: 600,
                  bgcolor: "primary.main",
                  ":hover": { bgcolor: "primary.dark" },
                  fontSize: { sm: "0.9rem", md: "1rem" },
                  px: 3,
                  py: 1.5,
                  width: "100%",
                }}
                onClick={user ? handleLogout : handleLogin}
              >
                {user.id ? "Logout" : "Login"}
              </Button>
            </Stack>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;
