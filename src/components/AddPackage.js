import React, { useState } from 'react'
import {IconButton, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField,MenuItem,Select 
} from '@mui/material';  

import {useCustomerContext } from './CustomerContext';

const AddPackage = ({setIsModalOpen, isModalOpen}) => {
    const {handleAddPackage, appData, handleSnackbarOpen } = useCustomerContext();
    const [newPackage, setNewPackage] = useState({
      id: '',
      weight: '',
      customerid: '',
      price: '',
      shippingOrder: '',
    });

    const closeModal = () => {
      setIsModalOpen(false);
    };

    const addPackage = () => {
      handleAddPackage(newPackage);
      setNewPackage({
        id: '',
        weight: '',
        customerid: '',
        price: '',
        shippingOrder: '',
      }); 
      closeModal(); 
    };

 const handleChange = (e) => {
      const { name, value } = e.target;
      setNewPackage((prevPackage) => ({
        ...prevPackage,
        [name]: value,
      }));
    };
  
    return (
    <div>
      <Dialog open={isModalOpen} onClose={closeModal}>
        <DialogTitle>Add New Package</DialogTitle>
        <DialogContent>
          <TextField
            label="ID"
            fullWidth
            name="id"
            value={newPackage.id}
            onChange={handleChange}
          />
          <TextField
            label="Weight"
            fullWidth
            name="weight"
            value={newPackage.weight}
            onChange={handleChange}
          />

        <Select
            fullWidth
            name="customerid"
            value={newPackage.customerid}
            onChange={handleChange}
          >
            {appData.customers.map((pkgData)=>  
              <MenuItem key={pkgData.id} value={pkgData.id}> {pkgData.name}
              </MenuItem>
            )}
          </Select>

          <TextField
            label="Price"
            fullWidth
            name="price"
            value={newPackage.price}
            onChange={handleChange}
        />
          <TextField
            label="Shipping Order"
            fullWidth
            name="shippingOrder"
            value={newPackage.shippingOrder}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal} color="primary">
            Cancel
          </Button>
          <Button onClick={() => {
              addPackage();
              handleSnackbarOpen('Added Successfully');
            }} color="primary">
            Add Package
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default AddPackage
