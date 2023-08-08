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

const CustomerList = ({ customers, onDeleteCustomer, onCreateInvoice  }) => {
  const history = useHistory();

  const handleDelete = (customer_id) => {
    onDeleteCustomer(customer_id);
  };
  
  const handleCreateInvoice = (customer_id, package_id) => {
    // history.push(`/invoice/${customer_id}/${package_id}`);
    onCreateInvoice(customer_id);
    history.push(`/invoice/${customer_id}/${package_id}`);
  };

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
          { customers.map((row) => (

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
                  onClick={() => handleCreateInvoice(row.id)}  
                 >
                  Create Invoice
                  </Button>
              </TableCell>
              <TableCell>
                <Button variant="contained" onClick={() => handleDelete(row.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomerList;
