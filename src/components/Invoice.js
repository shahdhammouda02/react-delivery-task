import React from 'react'
import { useParams } from 'react-router-dom'
import { useCustomerContext } from './CustomerContext';

const Invoice = () => {
  const { customer_id } = useParams();
  const { customers, packages } = useCustomerContext();

  const customer =customers.find((c) => c.id === parseInt(customer_id));
  console.log(customers);
  console.log(customer_id);

  console.log(customer);

  const customerPackages =packages.filter((pkg) => pkg.customerid ===  parseInt(customer_id));
  console.log(packages)

  if (!customer || typeof customer !== 'object') {
    return <div>Invalid customer data.</div>;
  }

  const invoiceId=Math.floor(Math.random()*1000)  
  const currentDate = new Date().toLocaleDateString();

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    customerPackages.forEach((pkg) => {
      totalPrice += pkg.price;
    });
    return totalPrice;
  };
  const totalpkgPrice = calculateTotalPrice();

  const calcTotalWeight=()=>{
    let totalWeight=0;
    customerPackages.forEach((pkg)=>{
      totalWeight += parseFloat(pkg.weight);
    });
    return totalWeight
  };
  const totalpkgWeight=calcTotalWeight();


  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <table border={1}>
        <tr>
          <th>date</th>
          <th>Customer Name</th>
          <th>Invoice ID</th>
          <th>Package ID</th>
          <th>Price</th>
          <th>Weight</th>
        </tr>

        {customerPackages.map((pkg, index) => (
          <React.Fragment key={pkg.id}>
            {index === 0 && (
              <tr>
                <td rowSpan={customerPackages.length}>{currentDate}</td>
                <td rowSpan={customerPackages.length}>{customer.name}</td>
                <td rowSpan={customerPackages.length}>{invoiceId}</td>
                <td>{pkg.id}</td>
                <td>{pkg.price}</td>
                <td>{pkg.weight}</td>
              </tr>
            )}
            {index !== 0 && (
              <tr>
                <td>{pkg.id}</td>
                <td>{pkg.price}</td>
                <td>{pkg.weight}</td>
              </tr>
            )}
          </React.Fragment>
        ))}
        <tr>
          <td colSpan={3}>Total Price: {totalpkgPrice}</td>
          <td colSpan={3}>Total Weight: {totalpkgWeight} kg </td>

        </tr>
      </table>
         
    </div>
  )
}

export default Invoice


