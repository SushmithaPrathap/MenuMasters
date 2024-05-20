import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import logo from "../../images/logo.png";
import { userLogin } from "../../Utils";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { clearUser } from "./../../Store/Reducers/authReducer";

import BlogMenu from "./blogMenu";
import { Icon } from "@mui/material";

export default function ButtonAppBar() {
  const navigate = useNavigate();

  let user = useSelector((state) => state.user);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorEl2, setAnchorEl2] = React.useState(null);
  const [anchorEl3, setAnchorEl3] = React.useState(null);

  const open = Boolean(anchorEl);
  const openAccount = Boolean(anchorEl2);
  const openAccount2 = Boolean(anchorEl3);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleClick3 = (event) => {
    setAnchorEl3(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  const handleClose3 = () => {
    setAnchorEl3(null);
  };

  const handleAccountClick = () => {
    navigate("/viewuserdetails");
  };

  const handleCloseBlogList = () => {
    setAnchorEl(null);
    navigate("/bloghome");
  };

  const handleCloseBlogCreate = () => {
    setAnchorEl(null);
    navigate("/blog");
  };

  const handleCloseProfile = () => {
    setAnchorEl2(null);
    navigate("/viewuserdetails");
  };

  const handleCloseFavRecipe = () => {
    setAnchorEl3(null);
    navigate("/recipe/fav");
  };

  const handleCloseCreateRecipe = () => {
    setAnchorEl3(null);
    navigate("/recipe/create");
  };

  const dispatch = useDispatch();

  const handleCloseLogout = () => {
    setAnchorEl2(null);
    navigate("/");
    dispatch(clearUser());
  };

  const newHeader = (
    <div>
      <Button color="inherit" component={Link} to="/homepage">
        Homepage
      </Button>
      <Button color="inherit" component={Link} to="/explore">
        Explore
      </Button>

      <Button
        color="inherit"
        component={Link}
        // to="/blog"
        // id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        Blog
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleCloseBlogList}>List Blogs</MenuItem>
        <MenuItem onClick={handleCloseBlogCreate}>Create</MenuItem>
      </Menu>
      <Button color="inherit" component={Link} to="/tracker">
        Tracker
      </Button>
      <Button color="inherit" component={Link} to="/inventory">
        Inventory
      </Button>
      <Button color="inherit" component={Link} to="/grocery">
        Grocery
      </Button>

      <Button
        color="inherit"
        component={Link}
        aria-controls={openAccount2 ? "basic-menu3" : undefined}
        aria-haspopup="true"
        aria-expanded={openAccount2 ? "true" : undefined}
        onClick={handleClick3}
      >
        Recipe
      </Button>
      <Menu
        id="basic-menu3"
        anchorEl={anchorEl3}
        open={openAccount2}
        onClose={handleClose3}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleCloseFavRecipe}>Fav Recipe</MenuItem>
        <MenuItem onClick={handleCloseCreateRecipe}>Create Recipe</MenuItem>
      </Menu>

      <Button
        color="inherit"
        component={Link}
        aria-controls={openAccount ? "basic-menu2" : undefined}
        aria-haspopup="true"
        aria-expanded={openAccount ? "true" : undefined}
        onClick={handleClick2}
      >
        Account
      </Button>
      <Menu
        id="basic-menu2"
        anchorEl={anchorEl2}
        open={openAccount}
        onClose={handleClose2}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleCloseProfile}>Profile</MenuItem>
        <MenuItem onClick={handleCloseLogout}>Logout</MenuItem>
      </Menu>
    </div>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <div
            className="logo-div"
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <LocalDiningIcon
              style={{ color: "#ffffff", fontSize: "50px", margin: "10px" }}
            />
            <Typography
              variant="h6"
              style={{
                fontSize: "25px",
                fontWeight: "bold",
                fontFamily: "nunito",
              }}
            >
              Menu Masters
            </Typography>
          </div>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          ></Typography>
          {user.user.name ? (
            newHeader
          ) : (
            <Button
              color="inherit"
              variant="contained"
              component={Link}
              to="/login"
              style={{
                backgroundColor: "#fff",
                color: "#1876d1",
                fontSize: "12px",
                fontWeight: "bold",
              }}
            >
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
