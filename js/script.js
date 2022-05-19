var invoiceForm = document.querySelector('#invoiceForm');
var currentTime = new Date().toLocaleString();

// submit button triggers database collection:
invoiceForm.addEventListener('submit', (e)=>{
    e.preventDefault();

    db.collection('invoice').doc().set({
        entryDate: currentTime, 
        date: invoiceForm.date.value,
        date2: invoiceForm.date2.value,
        companyName: invoiceForm.companyName.value,
        companyAddress: invoiceForm.companyAddress.value,
        phoneNumber:invoiceForm.phoneNumber.value,
        VATReg: invoiceForm.VATReg.value,
        customerName: invoiceForm.customerName.value,
        customerAddress: invoiceForm.customerAddress.value,
        invoiceNumber: invoiceForm.invoiceNumber.value,
        description: invoiceForm.description.value,
        unitPrice: invoiceForm.unitPrice.value,
        discount: invoiceForm.discount.value,
        quantity: invoiceForm.quantity.value,
        unit: invoiceForm.unit.value,
        VATRate: invoiceForm.VATRate.value,
 
       

    }).then(()=>{
        location.reload();
    // in order to delete the values on the form and reset the fields to blank, we need to put in empty strings:
        invoiceForm.date.value = '';
        invoiceForm.date2.value = '';
        invoiceForm.companyName.value = '';
        invoiceForm.companyAddress.value = '';
        invoiceForm.phoneNumber.value = '';
        invoiceForm.VATReg.value = '';
        invoiceForm.customerName.value = '';
        invoiceForm.customerAddress.value = '';
        invoiceForm.invoiceNumber.value = '';
        invoiceForm.description.value = '';
        invoiceForm.unitPrice.value = '';
        invoiceForm.discount.value = '';
        invoiceForm.quantity.value = '';
        invoiceForm.unit.value = '';
        invoiceForm.VATRate.value = '';
    })
});


    db.collection("invoice").orderBy('entryDate', 'desc').limit(1).get().then((querysnapshot) => {
        querysnapshot.forEach((doc) =>{
            // getting the form values from the database and putting these in the relevant html cells in my table on the right side of the screen:
            // ( these are all required VAT invoice items - information from https://www.gov.uk/vat-record-keeping/vat-invoices)
           
                    vendorName.innerHTML = doc.data().companyName;
                    customersName.innerHTML = doc.data().customerName;
                    vendorAddress.innerHTML = doc.data().companyAddress;
                    customersAddress.innerHTML = doc.data().customerAddress;
                    VATRegNo.innerHTML = doc.data().VATReg;
                    phone.innerHTML = doc.data().phoneNumber;
                    invoiceDate.innerHTML = doc.data().date;
                    supplyDate.innerHTML = doc.data().date2;
                    invNumber.innerHTML = doc.data().invoiceNumber;
                    item.innerHTML = doc.data().description;
                    price.innerHTML = '£'+doc.data().unitPrice;
                    qty.innerHTML = doc.data().quantity;
                    unitOfMeasurement.innerHTML = doc.data().unit;
                    discountRate.innerHTML = doc.data().discount+'%';
                    net.innerHTML = '£'+(Number(doc.data().unitPrice) * Number(doc.data().quantity));
                   

            // VAT calculation for each rate and total amount - rounding to 2 decimal places to avoid longer fractions - reference:https://stackhowto.com/round-to-2-decimal-places-in-javascript/
            if (doc.data().VATRate == '(zero rated)'||doc.data().VATRate == '(exempt)') {
                     VATAmount.innerHTML ='£'+0;
                    totalAmount.innerHTML = '£'+(Number(doc.data().unitPrice) * Number(doc.data().quantity));
             } else if (doc.data().VATRate == '(5%)'){
         
                        let VATres = Math.round((Number(doc.data().unitPrice) * Number(doc.data().quantity))*0.05 * 100) / 100;
                         VATAmount.innerHTML ='£'+VATres;
                        let totalRes = Math.round(((Number(doc.data().unitPrice) * Number(doc.data().quantity))+VATres)*100)/100;
                        totalAmount.innerHTML = '£'+ totalRes;
             
                
             } else {
                    let VATres = Math.round((Number(doc.data().unitPrice) * Number(doc.data().quantity))*0.20 * 100) / 100;
                    VATAmount.innerHTML ='£'+VATres;
                    let totalRes = Math.round(((Number(doc.data().unitPrice) * Number(doc.data().quantity))+VATres)*100)/100;
                    totalAmount.innerHTML = '£'+ totalRes;
                    }

                     VATRateDisplay.innerHTML = doc.data().VATRate;
        })
    })
  


   

   
    

    
