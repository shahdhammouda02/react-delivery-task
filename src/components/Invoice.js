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
    
    <div className="packagesData">
      <div className="package" style={{marginTop:32}}>
        <div className="packageId">
          <h3>ID</h3>
        </div>
        <div className="weight">
          <h3>Weight</h3>
        </div>
        <div className="price">
          <h3>Price</h3>
        </div>
        
      </div>
  {invoiceData.packages ? (
    invoiceData.packages.map((pkg) => (
      <div className="package" key={pkg.package.id}>
        <div className="packageId">
          <p>{pkg.package.id}</p>
        </div>
        <div className="weight" style={{marginLeft:-15}}>
          <p>{pkg.package.weight}</p>
        </div>
        
        <div className="price">
          <p>{pkg.package.price}</p>
        </div>
      </div>
    ))
  ) : (
    <p>Loading packages...</p>
  )}
</div>

<div className="total">
  <p>{invoiceData.totalpkgWeight} kg</p>
  <p className='p2'>Total: {invoiceData.totalpkgPrice}</p>
</div>

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
