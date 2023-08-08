import React, { useState, useEffect,createContext, useContext, } from 'react';
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

// const CustomerContext = createContext();

// export const useCustomerContext = () => {
//   return useContext(CustomerContext);
// };
// export const CustomerContextProvider = ({ customers, children, packages,invoice }) => {
//   return (
//     <CustomerContext.Provider value={{ customers, packages, invoice }}>
//       {children}
//     </CustomerContext.Provider>
//   );
// };
function App() {
  const [appData, setAppData] = useState({ customers: [], packages: [], invoice: [] });
  const [invoices, setInvoices] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [customerData, setCustomerData]=useState({});
  const [packageData, setPackageData]=useState({});


  useEffect(() => {
  fetch('/data.json')
    .then(response => response.json())
    .then((data) => {
      setAppData(data);
      // setInvoices(data);

      const customerDataObj = {};
      data.customers.forEach(item => {
        customerDataObj[item.id] = item.name;
      });
      setCustomerData(customerDataObj);

      const packageDataObj = {};
      data.packages.forEach(item => {
        const customerName = customerDataObj[item.customerid];
        packageDataObj[item.id] = {
          ...item,
          customerName: customerName || 'not Found',
        };
      });
      setPackageData(packageDataObj);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}, []);

  // console.log(appData.customers);
  // console.log(appData.packages)

  const deleteCustomer=(customer_id)=>{
    const updated=appData.customers.filter(customer=> customer.id !==customer_id);
    setAppData({...appData, customers: updated});
  }

  const handleCreateInvoice = (customer_id) => {
    const customer =appData.customers.find((c) => c.id === customer_id);
    const customerPackages =appData.packages.filter((pkg) => pkg.customerid === customer_id);
   
    const invoice = {
      customer_name: customer.name,
      packages: customerPackages,
    };
    setInvoices([...invoices, invoice]);
  };


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
          <CustomerContextProvider customers={appData.customers}>
              <CustomerList customers={appData.customers} 
              onDeleteCustomer={deleteCustomer} onCreateInvoice={handleCreateInvoice} />
            </CustomerContextProvider>
          </Route>
          <Route path="/packages">
            <CustomerContextProvider packages={appData.packages}>
            <PackageList packages={appData.packages} />
            </CustomerContextProvider>
          </Route>
          <Route path="/invoices">
            <CustomerContextProvider invoices={invoices}>
            <InvoiceList invoices={invoices} />
            </CustomerContextProvider>
          </Route>
        <Route path="/invoice/:customer_id/:package_id">
          <CustomerContextProvider customers={appData.customers} packages={appData.packages}>
               <Invoice  />
            </CustomerContextProvider>
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
