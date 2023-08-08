import React from 'react';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import Paper from '@mui/material/Paper';
import { useCustomerContext } from './CustomerContext';
import { useEffect, useState } from 'react';

const InvoiceList = () => {
  const [invoices, setInvoices] = useState([]);
  const { getInvoiceList } = useCustomerContext();

  useEffect(() => {
    const fetchInvoices = async () => {
      const invoiceListWithTotals = await getInvoiceList();
      setInvoices(invoiceListWithTotals);
    };

    fetchInvoices();
  }, [getInvoiceList]);

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
          {invoices.map((invoice, index) => (
            <TableRow key={index}>
              <TableCell>{invoice.customer_name}</TableCell>
              <TableCell>{invoice.totalpkgPrice}</TableCell>
              <TableCell>{invoice.totalpkgWeight.toFixed(2)} kg</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default InvoiceList;