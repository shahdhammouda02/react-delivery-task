import React ,{useEffect} from 'react';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import Paper from '@mui/material/Paper';
import { useCustomerContext } from './CustomerContext';

const InvoiceList = () => {
 const { invoiceDataList, generateInvoiceDataList } = useCustomerContext();
   
    useEffect(() => {
      generateInvoiceDataList();
    }, [generateInvoiceDataList]);

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
          {invoiceDataList.map((invoiceData, index) => (
            <TableRow key={index}>
              <TableCell>{invoiceData.customerName}</TableCell>
              <TableCell>{invoiceData.totalpkgPrice}</TableCell>
              <TableCell>{invoiceData.totalpkgWeight.toFixed(2)} kg</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default InvoiceList;
