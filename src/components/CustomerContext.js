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

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
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
        // setIsLoading(false);
      }
      finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  console.log('appData:', appData);

//   useEffect(() => {
//   fetch('/data.json')
//     .then(response => response.json())
//     .then((data) => {
//       setAppData(data);

//       const customerDataObj = {};
//       data.customers.forEach(item => {
//         customerDataObj[item.id] = item.name;
//       });
//       setCustomerData(customerDataObj);

//       const packageDataObj = {};
//       data.packages.forEach(item => {
//         const customerName = customerDataObj[item.customerid];
//         packageDataObj[item.id] = {
//           ...item,
//           customerName: customerName || 'not Found',
//         };
//       });
//       setPackageData(packageDataObj);
//     })
//     .catch(error => {
//       console.error('Error fetching data:', error);
//     });
// }, []);

const deleteCustomer=(customer_id)=>{
  const updated=appData.customers.filter(customer=> customer.id !==customer_id);
  setAppData({...appData, customers: updated});
}

const handleCreateInvoice = (customer_id) => {
  
  const customer =appData.customers.find((c) => c.id === customer_id);
  const customerPackages =appData.packages.filter((pkg) => pkg.customerid === customer_id);
  const invoice = {
    customer_name: customer.name,
    packages: customerPackages,
  };
  setInvoices([...invoices, invoice]);

};

// console.log(appData,"000");
const getInvoiceByCustomerid=(customer_id)=>{
  const customer =appData.customers.find((c) => c.id === parseInt(customer_id));
  const customerPackages =appData.packages.filter((pkg) => pkg.customerid ===  parseInt(customer_id));

  console.log(customer_id,appData.customers,"222", appData);
  
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
  
}

  const handleAddPackage = (pkgdata) => {
    const updatedPackages = [...appData.packages, pkgdata];
    const sortedByShippingOrder = updatedPackages.sort((a, b) => a.shippingOrder - b.shippingOrder);
    setAppData({
      ...appData,
      packages: sortedByShippingOrder
    })
    
    // console.log(sortedByShippingOrder);
  };


  const getInvoiceList =  () => {
    try {
      // const invoiceList = await fetchDataSomehow('/data.json'); 

      const calculateTotalPrice = (packages) => {
        return packages.reduce((total, pkg) => total + pkg.price, 0);
      };

      const calculateTotalWeight = (packages) => {
        return packages.reduce((total, pkg) => total + parseFloat(pkg.weight), 0);
      };

      const invoicesWithTotals = invoices.map((invoice) => ({
        ...invoice,
        totalpkgPrice: calculateTotalPrice(invoice.packages),
        totalpkgWeight: calculateTotalWeight(invoice.packages),
      }));

      return invoicesWithTotals;
    } catch (error) {
      console.error('Error fetching invoice list:', error);
      return [];
    }
  };


  return (
    <CustomerContext.Provider value={{
       handleAddPackage,getInvoiceByCustomerid, appData,handleCreateInvoice,deleteCustomer,
         getInvoiceList
      }}>
      {isLoading ? "loading...":children }
    </CustomerContext.Provider>
  );
};
