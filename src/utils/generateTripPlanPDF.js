import jsPDF from "jspdf";

export function generateTripPlanPDF(planData) {

  const { destination, budget, days, tier, itinerary } = planData;

  const doc = new jsPDF();

  doc.setFontSize(22);
  doc.setTextColor(37, 99, 235);
  doc.text("GoTravel", 20, 22);

  doc.setFontSize(11);
  doc.setTextColor(100, 100, 100);
  doc.text("AI Trip Planner - Itinerary", 20, 30);

  doc.setDrawColor(220);
  doc.line(20, 36, 190, 36);

  doc.setFontSize(12);
  doc.setTextColor(30, 30, 30);
  doc.setFont(undefined, "bold");
  doc.text(`Destination: ${destination}`, 20, 48);
  doc.text(`Budget: $${budget}`, 20, 56);
  doc.text(`Duration: ${days} Day(s)`, 20, 64);
  doc.text(`Travel Style: ${tier}`, 20, 72);

  let y = 86;

  itinerary.forEach((day, index) => {

    if (y > 260) {

      doc.addPage();
      y = 20;

    }

    doc.setFont(undefined, "bold");
    doc.setFontSize(13);
    doc.setTextColor(37, 99, 235);
    doc.text(`Day ${index + 1} - ${day.title}`, 20, y);

    y += 8;

    doc.setFont(undefined, "normal");
    doc.setFontSize(11);
    doc.setTextColor(60, 60, 60);

    const lines = doc.splitTextToSize(day.desc, 165);

    doc.text(lines, 20, y);

    y += lines.length * 6 + 8;

  });

  y += 4;
  doc.setDrawColor(220);
  doc.line(20, y, 190, y);

  y += 10;
  doc.setFontSize(10);
  doc.setTextColor(140, 140, 140);
  doc.text("Generated with GoTravel AI Trip Planner", 20, y);

  doc.save(`GoTravel_${destination.replace(/\s+/g, "_")}_Itinerary.pdf`);

}
