import jsPDF from "jspdf";

// Generates and downloads a PDF receipt for a confirmed booking.
export function generateReceipt(booking) {

  const doc = new jsPDF();

  // Header

  doc.setFontSize(22);
  doc.setTextColor(37, 99, 235);
  doc.text("GoTravel", 20, 22);

  doc.setFontSize(11);
  doc.setTextColor(100, 100, 100);
  doc.text("Booking Receipt", 20, 30);

  doc.setDrawColor(220);
  doc.line(20, 36, 190, 36);

  // Body rows

  let y = 50;

  const row = (label, value) => {

    doc.setFontSize(12);
    doc.setTextColor(30, 30, 30);
    doc.setFont(undefined, "bold");
    doc.text(`${label}:`, 20, y);

    doc.setFont(undefined, "normal");
    doc.text(String(value ?? "-"), 75, y);

    y += 12;

  };

  row("Booking ID", booking.id);
  row("Trip", booking.title);
  row("Destination", booking.location);
  row("Travel Date", booking.date);
  row("Travelers", booking.travelers);
  row("Payment Method", booking.payment);
  row("Total Paid", booking.price);
  row("Status", booking.status);

  y += 6;
  doc.setDrawColor(220);
  doc.line(20, y, 190, y);

  y += 14;
  doc.setFontSize(10);
  doc.setTextColor(140, 140, 140);
  doc.text("Thank you for booking with GoTravel!", 20, y);

  doc.save(`GoTravel_Receipt_${booking.id}.pdf`);

}
