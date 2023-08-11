import React ,{useState} from 'react';
import {Link} from 'react-router-dom';
import {TableContainer, Paper, Table,TableHead,TableRow,TableCell,TableBody,
  IconButton, Button
} from '@mui/material';  
import AddIcon from '@mui/icons-material/Add';

import { useCustomerContext } from './CustomerContext';
import AddPackage from './AddPackage';

const PackageList = () => { 
   const {appData, customerData,moveRow }=useCustomerContext();      
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

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
          {appData.packages.map((row) => (
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
                {/* <i>Up down buttons should go here</i> */}
                <Button
                variant="contained"
                onClick={() => moveRow(index, index - 1)} 
                disabled={index === 0}
              >
                Up
              </Button> <span></span>
              <Button
                variant="contained"
                onClick={() => moveRow(index, index + 1)} 
                disabled={index === appData.packages.length - 1}
              >
                Down
              </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        </Table>     


<IconButton size="large" edge="start" color="inherit" aria-label="menu" onClick={openModal}>
        <AddIcon />
      </IconButton>
      <AddPackage setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen}/>
    
    </TableContainer>
  );
};

export default PackageList;
