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

  console.log(getInvoiceByCustomerid(customer_id), "55");
  console.log(invoiceData,".....");
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <table border={1}>
        <tr>
          <th>date</th>
          <th>Customer Name</th>
          <th>Invoice ID</th>
          <th>Package ID</th>
          <th>Price</th>
          <th>3Weight</th>
        </tr>

        {invoiceData.packages&& invoiceData.packages.map((pkg, index) => (
          <React.Fragment key={pkg.id}>
            {index === 0 && (
              <tr>
                <td rowSpan={invoiceData.packages.length}>{invoiceData.currentDate}</td>
                <td rowSpan={invoiceData.packages.length}>{invoiceData.customer.name}</td>
                <td rowSpan={invoiceData.packages.length}>{invoiceData.invoiceId}</td>
                <td>{pkg.package.id}</td>
                <td>{pkg.package.price}</td>
                <td>{pkg.package.weight}</td>
              </tr>
            )}
            {index !== 0 && (
              <tr>
                <td>{pkg.package.id}</td>
                <td>{pkg.package.price}</td>
                <td>{pkg.package.weight}</td>
              </tr>
            )}
          </React.Fragment>
        ))}
        <tr>
          <td colSpan={3}>Total Price: {invoiceData.totalpkgPrice}</td>
          <td colSpan={3}>Total Weight: {invoiceData.totalpkgWeight} kg </td>

        </tr>
      </table>
         
    </div>
  )
}

export default Invoice


