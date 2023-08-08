import React from 'react';
import {Link, useHistory} from 'react-router-dom'
import Button from '@mui/material/Button';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import Paper from '@mui/material/Paper';
import { useCustomerContext } from './CustomerContext';

const CustomerList = () => {
  const {appData, handleCreateInvoice, deleteCustomer}=useCustomerContext();
  const history = useHistory();
  console.log(history);


  const handle=(id)=>{
    handleCreateInvoice(id)
    history.push(`/invoice/${id}`);
  }
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>id</TableCell>
            <TableCell>Name</TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { appData.customers.map((row) => (

            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              key={row.id}
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell><Link to={`/customers/${row.id}`}>{row.name}</Link></TableCell>
              <TableCell>
                <Button variant="contained" 
                  onClick={() => handle(row.id)}  
                 >
                  Create Invoice
                  </Button>
              </TableCell>
              <TableCell>
                <Button variant="contained" onClick={() => deleteCustomer(row.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomerList;
