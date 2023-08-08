import React from 'react'
import {IconButton, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField 
} from '@mui/material';  
import AddIcon from '@mui/icons-material/Add';

import { useCustomerContext } from './CustomerContext';

const AddPackage = () => {
    const { isModalOpen, toggleModal, newPackage, setNewPackage, handleAddPackage } = useCustomerContext();
  return (
    <div>
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
    </div>
  )
}

export default AddPackage
