import React,{useState} from 'react';
import {Link} from 'react-router-dom';
import {TableContainer, Paper, Table,TableHead,TableRow,TableCell,TableBody,
  IconButton, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField
} from '@mui/material';  
import AddIcon from '@mui/icons-material/Add';
// import AddPackage from './AddPackage';
// import { useCustomerContext } from './CustomerContext';

const PackageList = ({ packages }) => {  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPackage, setNewPackage] = useState({
    id: '',
    weight: '',
    customerid: '',
    price: '',
    shippingOrder: '',
  });

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleAddPackage = () => {
    const updatedPackages = [...packages, newPackage];
    const sortedByShippingOrder = updatedPackages.sort((a, b) => a.shippingOrder - b.shippingOrder);
    
    setNewPackage({
      id: '',
      weight: '',
      customerid: '',
      price: '',
      shippingOrder: '',
    });
    
    setIsModalOpen(false);
    console.log(sortedByShippingOrder);
  };

  // const { isModalOpen, toggleModal,handleAddPackage } = useCustomerContext();
  


  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table"> 
        <TableHead>
          <TableRow>
            <TableCell>id</TableCell>
            <TableCell>Weight</TableCell>
            <TableCell>CustomerId</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Shipping Order</TableCell>
            <TableCell>
            <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                  >
                    <AddIcon />
                  </IconButton>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {packages.map((row) => (
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              key={row.id}
            >
              <TableCell component="th" scope="row" >
              <Link to={`/packages/${row.id}`}>{row.id}</Link>
                
              </TableCell>
              <TableCell>{row.weight}</TableCell>
              <TableCell>{row.customerid}</TableCell>
              <TableCell>{row.price}</TableCell>
              <TableCell>{row.shippingOrder}</TableCell>
              <TableCell>
                <Button variant="contained">Delete</Button>
                <i>Up down buttons should go here</i>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        </Table>     

       {/* <AddPackage /> */}


<IconButton size="large" edge="start" color="inherit" aria-label="menu" onClick={toggleModal}>
        <AddIcon />
      </IconButton>
      <Dialog open={isModalOpen} onClose={toggleModal}>
        <DialogTitle>Add New Package</DialogTitle>
        <DialogContent>
          <TextField
            label="ID"
            fullWidth
            value={newPackage.id}
            onChange={(e) => setNewPackage({ ...newPackage, id: e.target.value })}

          />
          <TextField
            label="Weight"
            fullWidth
            value={newPackage.weight}
            onChange={(e) => setNewPackage({ ...newPackage, weight: e.target.value })}

          />
          <TextField
            label="CustomerId"
            fullWidth
            value={newPackage.customerid}
            onChange={(e) => setNewPackage({ ...newPackage, customerid: e.target.value })}
          />
          <TextField
            label="Price"
            fullWidth
            value={newPackage.price}
            onChange={(e) => setNewPackage({ ...newPackage, price: e.target.value })}
          />
          <TextField
            label="Shipping Order"
            fullWidth
            value={newPackage.shippingOrder}
            onChange={(e) => setNewPackage({ ...newPackage, shippingOrder: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={toggleModal} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddPackage} color="primary">
            Add Package
          </Button>
        </DialogActions>
      </Dialog>
    </TableContainer>
    
  );
};

export default PackageList;
