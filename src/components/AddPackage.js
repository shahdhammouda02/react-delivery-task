import React, { useState } from 'react'
import {IconButton, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField 
} from '@mui/material';  

import {useCustomerContext } from './CustomerContext';

const AddPackage = ({setIsModalOpen, isModalOpen}) => {
    const {handleAddPackage } = useCustomerContext();
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

    return (
    <div>
     
      <Dialog open={isModalOpen} onClose={closeModal}>
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
          <Button onClick={closeModal} color="primary">
            Cancel
          </Button>
          <Button onClick={addPackage} color="primary">
            Add Package
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default AddPackage
