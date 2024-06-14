import React from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
const generatePDF = (data) => {
  const doc = new jsPDF();

  // Add content to PDF
  doc.text('Invoice Details', 90, 10,{ fontSize: 16 });
  doc.setFontSize(10); // Set the font size to 10
doc.text(`Invoice ID: ${data.invoiceId}`, 20, 20, { color: "red" });
  doc.text(`Customer: ${data.fullName}`, 20, 30,{ fontSize: 10 });
  doc.text(`Address: ${data.address}`, 20, 40,{ fontSize: 10 });
  doc.text(`Phone: ${data.phone}`, 20, 50,{ fontSize: 10 });
  doc.text(`Payment Mode: ${data.paymentMode}`, 20, 60,{ fontSize: 10 });
 //make a horizontal line here
 const startYForTable = doc.autoTable.previous.finalY;

 // Make a horizontal line based on the startY for the table

  // Add table for products
  const columns = ['ID', 'Name', 'Description', 'Price', 'Weight', 'Qty'];
  const rows = data.products.map((product) => [
    product.id,
    product.name,
    product.description,
    product.prize,
    product.weight,
    product.qty,
  ]);

  doc.autoTable({
    head: [columns],
    body: rows,
    startY: 70,
  });
 
  doc.setLineWidth(0.5); // Set line width
  doc.line(20, doc.autoTable.previous.finalY, 190, doc.autoTable.previous.finalY);
  // Add total amounts
  doc.setFontSize(16);
  doc.setFont('bold');
  doc.text(`Total Amount: Rs-${data.totalAmount}/-`, 20, doc.autoTable.previous.finalY + 10);
  doc.text(`Amount Paid: Rs-${data.amountLeft}/-`, 20, doc.autoTable.previous.finalY + 20);
  doc.text(`Amount Left: Rs-${data.amountLeft}/-`, 20, doc.autoTable.previous.finalY + 30);
  doc.setLineWidth(0.5); // Set line width
  doc.line(20, doc.autoTable.previous.finalY+40, 190, doc.autoTable.previous.finalY+40);

  // Save or open the PDF
  doc.save('invoice.pdf');
};

const InvoicePDF = () => {
    const data={
        products:[ {
             "id": 32,
             "name": "Mastery",
             "description": "dfdsf",
             "prize": 20,
             "weight": 34,
             "qty": 1
         },
         {
             "id": 30,
             "name": "12-32-16",
             "description": "It's an Khaad fdgfdgfd dfg gfdg",
             "prize": 10,
             "weight": 50,
             "qty": 2
         },{
          "id": 30,
          "name": "12-32-16",
          "description": "It's an Khaad fdgfdgfd dfg gfdg",
          "prize": 10,
          "weight": 50,
          "qty": 2
      },{
        "id": 30,
        "name": "12-32-16",
        "description": "It's an Khaad fdgfdgfd dfg gfdg",
        "prize": 10,
        "weight": 50,
        "qty": 2
    }],
     totalAmount:1000,
     amountLeft:100,
     fullName:"loki",
     address:"qbc",
     phone:1234567891,
     paymentMode:"CASH",
     invoiceId:123
     }
  return (
    <div>
      <button onClick={() => generatePDF(data)}>Generate PDF</button>
    </div>
  );
};

export default InvoicePDF;
