import * as React from "react";
import { useRouter } from "next/router";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Modal from "@mui/material/Modal";
import Avatar from "@mui/material/Avatar";

import { DarkMode, LightMode } from "@mui/icons-material";
import { useTheme } from "next-themes";
import { Button } from "@mui/material";
import { Stack } from "@mui/system";
import { pageData } from "../lib/data";

function NavBar() {
  const router = useRouter();

  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;

  const ThemeChanger = () => {
    if (currentTheme === "dark") {
      return (
        <IconButton
          size="large"
          disableRipple={true}
          onClick={() => setTheme("light")}
        >
          <LightMode
            role="button"
            sx={{
              color: "var(--foreground)",
            }}
          />
        </IconButton>
      );
    } else {
      return (
        <IconButton
          size="large"
          disableRipple={true}
          onClick={() => setTheme("dark")}
        >
          <DarkMode
            role="button"
            sx={{
              color: "var(--foreground)",
            }}
          />
        </IconButton>
      );
    }
  };

  const [modalOpen, setModalOpen] = React.useState(false);
  const handleModalToggle = () => setModalOpen(!modalOpen);
  const handleModalClose = () => setModalOpen(false);

  return (
    <AppBar
      position="fixed"
      sx={{
        boxShadow: "none",
        top: { xs: "auto", md: 0 },
        bottom: { xs: 0, md: "auto" },
        color: "var(--foreground)",
        background: "var(--background)",
        zIndex: 1400,
        transition: "var(--theme-change-transition)",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <IconButton
            href="/"
            disabled={router.pathname === "/"}
            disableRipple
            disableFocusRipple
            disableTouchRipple
          >
            <Avatar
              sx={{
                mr: 2,
                borderRadius: 0,
              }}
              alt="phusitsom"
              className="invert-on-theme"
              src="/images/icon.png"
            />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href={router.pathname === "/" ? undefined : "/"}
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontWeight: 700,
              letterSpacing: ".2rem",
              textDecoration: "none",
              color: "var(--foreground)",
            }}
          >
            phusitsom
          </Typography>
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {pageData.map((page) => (
              <Button
                key={page.title}
                href={page.href}
                disabled={router.pathname === page.href}
                sx={{ marginTop: "5px" }}
              >
                {page.title}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 1 }}></Box>
          <Box sx={{ flexGrow: 0 }}>
            <ThemeChanger />
          </Box>
          <Box sx={{ flexGrow: 0, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleModalToggle}
              disableRipple
              disableFocusRipple
              disableTouchRipple
              sx={{
                color: "var(--foreground)",
              }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
          <Modal
            open={modalOpen}
            onClose={handleModalClose}
            slotProps={{
              backdrop: {
                style: {
                  background: currentTheme === "dark" ? "#000" : "#fff",
                  opacity: 0.85,
                  transition:
                    "var(--theme-change-transition), opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
                },
              },
            }}
          >
            <Box
              sx={{
                position: "absolute" as "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 400,
                p: 4,
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              <Stack spacing={2}>
                {pageData.map((page) => (
                  <Button
                    key={page.title}
                    href={page.href}
                    disabled={router.pathname === page.href}
                    sx={{
                      color: "var(--foreground)",
                      fontWeight: 700,
                      fontSize: "1.5rem",
                    }}
                  >
                    <Typography>{page.title}</Typography>
                  </Button>
                ))}
              </Stack>
            </Box>
          </Modal>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavBar;
