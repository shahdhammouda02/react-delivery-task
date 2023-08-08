import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import CustomerList from './components/CustomerList';
import PackageList from './components/PackageList';
import InvoiceList from './components/InvoicesList';
import Invoice from './components/Invoice';
import { CustomerContextProvider } from './components/CustomerContext';

import './App.css';

function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <CustomerContextProvider>
    <div className="App">
      <Router>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={() => setIsDrawerOpen(!isDrawerOpen)}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Mail Delivery Service
              </Typography>
            </Toolbar>
          </AppBar>
        </Box>
        <Switch>
        <Route exact path="/"></Route>
          <Route path="/customers">
              <CustomerList  />
          </Route>
          <Route path="/packages">
            <PackageList  />
          </Route>
          <Route path="/invoices">
            <InvoiceList/>
          </Route>
        <Route path="/invoice/:customer_id">
               <Invoice />
        </Route>
        
        </Switch>

        <Drawer anchor="left" open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
          <List style={{ width: "300px" }}>
            <ListItem button component={Link} to="/customers">
              <ListItemText primary={"Customers"} />
            </ListItem>

            <ListItem button component={Link} to="/packages">
              <ListItemText primary={"Packages"} />
            </ListItem>

            <ListItem button component={Link} to="/invoices">
              <ListItemText primary={"Invoices"} />
            </ListItem>

            <ListItem button component={Link} to="/invoice">
              <ListItemText primary={"Invoice"} />
            </ListItem>
          </List>
        </Drawer>
      </Router>
    </div>
    </CustomerContextProvider>
  );
}

export default App;
