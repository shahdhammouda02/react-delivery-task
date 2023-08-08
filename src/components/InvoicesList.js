import React from 'react';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import Paper from '@mui/material/Paper';
// import { useCustomerContext } from '../App';



const InvoiceList = ({ invoices }) => {

  return (
    <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Customer Name</TableCell>
              <TableCell>Total Price</TableCell>
              <TableCell>Total Weight</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {invoices.map((invoice, index) => {
              const totalPrice = invoice.packages.reduce((total, pkg) => total + pkg.price, 0);
              const totalWeight = invoice.packages.reduce((total, pkg) => total + parseFloat(pkg.weight), 0);

              return (
                <TableRow key={index}>
                  <TableCell>{invoice.customer_name}</TableCell>
                  <TableCell>{totalPrice}</TableCell>
                  <TableCell>{totalWeight} kg</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
  );
};

export default InvoiceList;

      {/* <h2>Invoice List</h2>
      {invoices.map((invoice, index) => {

        const totalPrice = invoice.packages.reduce((total, pkg) => total + pkg.price, 0);
        const totalWeight=invoice.packages.reduce((total,pkg)=>total+ parseFloat(pkg.weight),0)
          return (
          <div key={index}>
            <h3>Customer Name: {invoice.customer_name}</h3>
            <p>Total Price: {totalPrice}</p>
            <p>Total Weight: {totalWeight} kg</p>
          </div>
        );
      })} */}