import React, { createContext, useContext, useState } from 'react';

const CustomerContext = createContext();

export const useCustomerContext = () => {
  return useContext(CustomerContext);
};

export const CustomerContextProvider = ({ customers, children, packages, invoice }) => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPackage, setNewPackage] = useState({
    id: '',
    weight: '',
    customerid: '',
    price: '',
    shippingOrder: '',
  });

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleAddPackage = () => {
    const updatedPackages = [...packages, newPackage];
    const sortedByShippingOrder = updatedPackages.sort((a, b) => a.shippingOrder - b.shippingOrder);
    
    
    setNewPackage({
      id: '',
      weight: '',
      customerid: '',
      price: '',
      shippingOrder: '',
    });
    
    setIsModalOpen(false);
    console.log(sortedByShippingOrder);
  };
  return (
    <CustomerContext.Provider value={{ customers, packages, invoice, toggleModal, handleAddPackage}}>
      {children}
    </CustomerContext.Provider>
  );
};

// const PackageComponent = () => {
//   const { packages, setPackages } = useCustomerContext(); 

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [newPackage, setNewPackage] = useState({
//     id: '',
//     weight: '',
//     customerid: '',
//     price: '',
//     shippingOrder: '',
//   });

//   const toggleModal = () => {
//     setIsModalOpen(!isModalOpen);
//   };

//   const handleAddPackage = () => {
//     const updatedPackages = [...packages, newPackage];
//     const sortedByShippingOrder = updatedPackages.sort((a, b) => a.shippingOrder - b.shippingOrder);
//     setPackages(sortedByShippingOrder); 

//     setNewPackage({
//       id: '',
//       weight: '',
//       customerid: '',
//       price: '',
//       shippingOrder: '',
//     });
//     setIsModalOpen(false);
//     console.log(sortedByShippingOrder);
//   };

// };

// export default PackageComponent;