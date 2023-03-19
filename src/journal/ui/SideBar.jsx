import { Toolbar, Typography, Box, Drawer, Divider, List } from "@mui/material";
import { useSelector } from "react-redux";
import { SideBarItem } from "./SideBarItem";
import { useEffect, useState } from "react";

export const SideBar = ({ drawerWidth = 240 }) => {
  const { displayName } = useSelector((state) => state.auth);
  const { notes } = useSelector((state) => state.journal);
  const [notItems, setNoteItems ] = useState([])
  useEffect(() => {
    setNoteItems(notes);
  },[notes])
  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
      <Drawer
        variant="permanent"
        open
        sx={{
          display: { xs: "block" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            {displayName}
          </Typography>
        </Toolbar>
        <Divider></Divider>
        <List>
          {notItems.map((note) => (
            <SideBarItem key={note.id} {...note}></SideBarItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
};
