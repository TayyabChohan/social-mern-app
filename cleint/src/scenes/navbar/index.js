import { useState } from "react";
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  useTheme,
  useMediaQuery,
  FormControl,
  Menu,
} from "@mui/material";
import {
  Search,
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Help,
  Menum,
  Close,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "state";
import { useNavigate } from "react-router-dom";
import FlexBetween from "../../components/FlexBetween";
import { color } from "@mui/system";

const Navbar = () => {
  const [isMobileMenuTogled, setMobileMenuTogled] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state);
  const isNonMobileScreen = useMediaQuery("(min-width:1000px)");

  const theme = useTheme();
  const neutralThemeLight = theme.palette.neutral.Light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primarylight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;
  // const fullName = `${user.firstName} ${user.lastName}`;
  console.log(user, "user");
  return (
    <>
      <FlexBetween pedding="1rem 6%" backgroundColor={alt}>
        <FlexBetween gap="1.75rem">
          <Typography
            fontWeight="bold"
            fontSize="clamp(1rem, 2rem, 2.25rem)"
            color="primary"
            onClick={() => navigate("/home")}
            sx={{
              "&:hover": {
                color: primarylight,
                cursor: "pointer",
              },
            }}
          >
            Sociopedia
          </Typography>
          {isNonMobileScreen && (
            <FlexBetween
              backgroundColor={neutralThemeLight}
              borderRadius="9px"
              gap="3rem"
              padding="0.1rem 1.5rem"
            >
              <InputBase placeholder="Search..." />
              <IconButton>
                <Search />
              </IconButton>
            </FlexBetween>
          )}
        </FlexBetween>
        {/* //Desktop nav// */}
        {isNonMobileScreen ? (
          <FlexBetween gap="2rem">
            <IconButton onClick={() => dispatch(setMode())}>
              {theme.palette.mode === "dark" ? (
                <DarkMode sx={{ fontSize: "25px" }} />
              ) : (
                <LightMode sx={{ color: dark, fontSize: "25px" }} />
              )}
            </IconButton>
            <Message sx={{ fontSize: "25px" }} />
            <Notifications sx={{ fontSize: "25px" }} />
            <Help sx={{ fontSize: "25px" }} />
            <FormControl variant="standard" value={"fullName"}>
              <Select
                value={"fullName"}
                sx={{
                  backgroundColor: neutralThemeLight,
                  width: "150px",
                  borderRadius: "0.25rem",
                  p: "0.25rem 1rem",
                  "& .MuiSvgIcon-root": {
                    pr: "0.25rem",
                    width: "3rem",
                  },
                  "& .MuiSelect-select:focus": {
                    backgroundColor: neutralThemeLight,
                  },
                }}
                input={<InputBase />}
              >
                <MenuItem value={"fullName"}>
                  <Typography>{"fullName"}</Typography>
                </MenuItem>
                <MenuItem onClick={() => dispatch(setLogout())}>
                  Log Out
                </MenuItem>
              </Select>
            </FormControl>
          </FlexBetween>
        ) : (
          <IconButton onClick={() => setMobileMenuTogled(!isMobileMenuTogled)}>
            <Menu />
          </IconButton>
        )}

        {/* {Mobile-Nav} */}
        {!isNonMobileScreen && isMobileMenuTogled && (
          <Box
            position="fixed"
            right="0"
            bottom="0"
            height="100%"
            zIndex="10"
            maxWidth="500px"
            minWidth="300px"
            backgroundColor={background}
          >
            {/* CLOSE ICON */}
            <Box display="flex" justifyContent="flex-end" p="1rem">
              <IconButton
                onClick={() => setMobileMenuTogled(!isMobileMenuTogled)}
              >
                <Close />
              </IconButton>
            </Box>

            {/* MENU ITEMS */}
            <FlexBetween
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              gap="3rem"
            >
              <IconButton
                onClick={() => dispatch(setMode())}
                sx={{ fontSize: "25px" }}
              >
                {theme.palette.mode === "dark" ? (
                  <DarkMode sx={{ fontSize: "25px" }} />
                ) : (
                  <LightMode sx={{ color: dark, fontSize: "25px" }} />
                )}
              </IconButton>
              <Message sx={{ fontSize: "25px" }} />
              <Notifications sx={{ fontSize: "25px" }} />
              <Help sx={{ fontSize: "25px" }} />
              <FormControl variant="standard" value={"fullName"}>
                <Select
                  value={"fullName"}
                  sx={{
                    backgroundColor: neutralThemeLight,
                    width: "150px",
                    borderRadius: "0.25rem",
                    p: "0.25rem 1rem",
                    "& .MuiSvgIcon-root": {
                      pr: "0.25rem",
                      width: "3rem",
                    },
                    "& .MuiSelect-select:focus": {
                      backgroundColor: neutralThemeLight,
                    },
                  }}
                  input={<InputBase />}
                >
                  <MenuItem value={"fullName"}>
                    <Typography>{"fullName"}</Typography>
                  </MenuItem>
                  <MenuItem onClick={() => dispatch(setLogout())}>
                    Log Out
                  </MenuItem>
                </Select>
              </FormControl>
            </FlexBetween>
          </Box>
        )}

        {/*  */}
      </FlexBetween>
    </>
  );
};
export default Navbar;
