import React, { createContext, useContext, useState,useEffect } from 'react';

const CustomerContext = createContext();

export const useCustomerContext = () => {
  return useContext(CustomerContext);
};

export const CustomerContextProvider = ({children}) => {

  const [appData, setAppData] = useState({ customers: [], packages: [], invoice: [] });
  const [invoices, setInvoices] = useState([]);
  const [customerData, setCustomerData]=useState({});
  const [packageData, setPackageData]=useState({});
  const [invoiceDataList, setInvoiceDataList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const response = await fetch('/data.json');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        
        const customerDataObj = {};
        data.customers.forEach(item => {
          customerDataObj[item.id] = item.name;
        });
        setCustomerData(customerDataObj);

        const packageDataObj = {};
        data.packages.forEach(item => {
          const customerName = customerDataObj[item.customerid];
          packageDataObj[item.id] = {
            ...item,
            customerName: customerName || 'not Found',
          };
        });
        setPackageData(packageDataObj);

        setAppData(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

// Delete customer and its packages
const deleteCustomer=(customer_id)=>{
  const updated=appData.customers.filter(customer=> customer.id !==customer_id);
  const deletePackages=appData.packages.filter(pak=>pak.customerid !==customer_id)
   setAppData({...appData,
     customers: updated,
     packages: deletePackages
    });
}

// Create Invoice
const handleCreateInvoice = (customer_id) => {
  const customer =appData.customers.find((c) => c.id === customer_id);
  const customerPackages =appData.packages.filter((pkg) => pkg.customerid === customer_id);
  const invoice = {
    customer_name: customer.name,
    packages: customerPackages,
  };
  setInvoices([...invoices, invoice]);

};

// Get Invoice for customer
const getInvoiceByCustomerid=(customer_id)=>{
  const customer =appData.customers.find((c) => c.id === parseInt(customer_id));
  const customerPackages =appData.packages.filter((pkg) => pkg.customerid ===  parseInt(customer_id));
  
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

  const packagesInfo = customerPackages.map((pkg) => {
    return {
      package: pkg,
      totalWeight: parseFloat(pkg.weight),
      totalPrice: pkg.price
    };
  });
  return{
    invoiceId,
    currentDate,
    customer,
    packages: packagesInfo,
    totalpkgWeight,
    totalpkgPrice
  }
};

//Add Package
  const handleAddPackage = (pkgdata) => {
    const updatedPackages = [...appData.packages, pkgdata];
    const sortedByShippingOrder = updatedPackages.sort((a, b) => a.shippingOrder - b.shippingOrder);
    setAppData({
      ...appData,
      packages: sortedByShippingOrder
    })
  };

// reorder the shipping order using up and down buttons on each row.
  const updateAppData = (newAppData) => {
    setAppData(newAppData);
  };

  const moveRow = (fromIndex, toIndex) => {
    const updatedPackages = [...appData.packages];
    const [movedItem] = updatedPackages.splice(fromIndex, 1);
    updatedPackages.splice(toIndex, 0, movedItem);

    const updatedPackagesWithShippingOrder = updatedPackages.map(
      (pkg, index) => ({
        ...pkg,
        shippingOrder: index + 1, 
      })
    );
    updateAppData({
      ...appData,
      packages: updatedPackagesWithShippingOrder,
    });
  };


// InvoiceList
  const generateInvoiceDataList = () => {
    const invoiceList = appData.customers.map((customer) => {
      const customerPackages = appData.packages.filter(
        (pkg) => pkg.customerid === customer.id
      );
  
      const calculateTotalPrice = (packages) => {
        return packages.reduce((total, pkg) => total + pkg.price, 0);
      };
  
      const calculateTotalWeight = (packages) => {
        return packages.reduce((total, pkg) => total + parseFloat(pkg.weight), 0);
      };
  
      const totalpkgPrice = calculateTotalPrice(customerPackages);
      const totalpkgWeight = calculateTotalWeight(customerPackages);
  
      return {
        customerName: customer.name,
        totalpkgPrice,
        totalpkgWeight,
      };
    });
  
    setInvoiceDataList(invoiceList);
  };


  return (
    <CustomerContext.Provider value={{
       handleAddPackage,getInvoiceByCustomerid, appData,handleCreateInvoice,deleteCustomer,
          generateInvoiceDataList, invoiceDataList,customerData ,moveRow
      }}>
      {isLoading ? "loading...":children }
    </CustomerContext.Provider>
  );
};
