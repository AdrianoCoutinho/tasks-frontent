import { AccountCircle } from "@mui/icons-material";
import MailIcon from "@mui/icons-material/Mail";
import AppBar from "@mui/material/AppBar";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React from "react";
import AppBarHeaderProps from "../../types/AppBarHeaderProps";

const AppBarHeader: React.FC<AppBarHeaderProps> = ({
  titleHeader,
  actionLogout,
  logedUser,
  taskLength,
  taskArquivedLength,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 0 }}>
            {titleHeader}
          </Typography>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          ></Typography>
          <Typography variant="body1">
            <Badge
              sx={{ marginRight: "22px", cursor: "pointer" }}
              badgeContent={taskArquivedLength}
              color="warning"
              title="Total de tarefas arquivados"
            >
              <MailIcon color="warning" />
            </Badge>
            <Badge
              sx={{ cursor: "pointer" }}
              badgeContent={taskLength}
              color="secondary"
              title="Total de tarefas"
            >
              <MailIcon color="secondary" />
            </Badge>

            <IconButton
              sx={{ marginLeft: "15px" }}
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>
                {logedUser.toUpperCase()}
              </MenuItem>
              <MenuItem onClick={actionLogout}>Sair</MenuItem>
            </Menu>
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default AppBarHeader;
