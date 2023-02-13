import { LogoutOutlined, MenuOutlined, TurnedInNot } from "@mui/icons-material"
import {  Toolbar, Typography, Box, Drawer, Divider, List, ListItem, ListItemButton, ListItemIcon, Grid, ListItemText } from "@mui/material"

export const SideBar = ({ drawerWidth = 240 }) => {
  return (
      <Box
          component='nav'
          sx={{width: {sm:drawerWidth}, flexShrink:{sm:0}}}>
          <Drawer
              variant="permanent"
              open
              sx={{
                  display: { xs: 'block' },
                  '& .MuiDrawer-paper':{boxSizing:'border-box', width:drawerWidth}
              }}>
              <Toolbar>
                  <Typography variant="h6" noWrap component='div'>Activity</Typography>
              </Toolbar>
              <Divider></Divider>
              <List>
                  {
                      ['Enero', 'Febrero', 'Marzo', 'Abril'].map(text => (
                          <ListItem key={text} disablePadding>
                              <ListItemButton>
                                  <ListItemIcon>
                                      <TurnedInNot></TurnedInNot>
                                  </ListItemIcon>
                                  <Grid container>
                                      <ListItemText primary={text}></ListItemText>
                                      <ListItemText secondary={'Sit est exercitation eu qui sunt sit ad anim irure.'}></ListItemText>
                                  </Grid>
                              </ListItemButton>
                          </ListItem>
                      ))
                  }
              </List>
          </Drawer>

   </Box>
  )
}
