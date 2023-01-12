
import { SideBar, NavBar } from "../ui";
import { Toolbar, Box } from "@mui/material";

 const drawerWidth = 280;
export const JournalLayout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex' }}>
      
      <NavBar drawerWidth={drawerWidth}></NavBar>

      <SideBar drawerWidth={drawerWidth}></SideBar>

      <Box component='main' sx={{ flexGrow: 1, p: 3 }}>

        <Toolbar />
        
        { children }
              
          </Box>
    </Box>
        
  )
}
