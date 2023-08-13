import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useCustomerContext } from './CustomerContext';

const Invoice = () => {
  const { customer_id } = useParams();
  const {getInvoiceByCustomerid} = useCustomerContext();
  const [invoiceData, setInvoiceData]=useState({})

  useEffect(()=>{
    const fetchInvoiceData = async () => {
      try {
        const data = getInvoiceByCustomerid(customer_id);
        setInvoiceData(data);
      } catch (error) {
        console.error('Error fetching invoice data:', error);
      }
    };

    fetchInvoiceData();
  }, [customer_id, getInvoiceByCustomerid]);

  return(
    <div className='wrapper'>
    <div className='start'>
      <div className="part1">
      <p>{invoiceData.currentDate}</p>
      <p>{invoiceData.customerName}</p>
      </div>
      <div className="part2">
      <h3>Invoice</h3>
      <p>No. {invoiceData.invoiceId}</p>
      </div>
    </div>
    
    <TableContainer component={Paper} className='table-container'>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Weight</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {invoiceData.packages ? (
            invoiceData.packages.map((pkg) => (
              <TableRow key={pkg.package.id}>
                <TableCell>{pkg.package.id}</TableCell>
                <TableCell>{pkg.package.price}</TableCell>
                <TableCell>{pkg.package.weight}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3}>Loading packages...</TableCell>
            </TableRow>
          )}
          <TableRow>
            <TableCell colSpan={1}></TableCell>
            <TableCell>Total: {invoiceData.totalpkgPrice}</TableCell>
            <TableCell>{invoiceData.totalpkgWeight} kg</TableCell>
          </TableRow>
        </TableBody>
        </Table>
      </TableContainer>

    <div className='end'>
    {invoiceData.packages ? (
        <p>You received {invoiceData.packages.length} packages</p>
      ) : (
        <p>Loading packages...</p>
      )}
      <p>Thank you for using our services</p>
    </div>
  </div>
  )
}

export default Invoice
