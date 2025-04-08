import React, { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

// Dummy resume content for illustration – replace with your actual template/component
const ResumePreview = () => {
  return (
    <div id="resume-preview" className="p-8 bg-white w-[800px] text-black">
      <h1 className="text-2xl font-bold">John Doe</h1>
      <p>Email: johndoe@example.com | Phone: 123-456-7890</p>
      <h2 className="mt-4 text-xl font-semibold">Experience</h2>
      <ul>
        <li>Frontend Developer at ABC Corp (2021–2023)</li>
        <li>UI Designer at XYZ Ltd. (2019–2021)</li>
      </ul>
    </div>
  );
};

const BuildPage = () => {
  const resumeRef = useRef(null);

  const downloadResumeAsPDF = async () => {
    const element = document.getElementById("resume-preview");
    if (!element) return;

    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("my-resume.pdf");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <h1 className="text-3xl font-bold mb-6">Build Your Resume</h1>
      <ResumePreview />

      <button
        onClick={downloadResumeAsPDF}
        className="mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Download as PDF
      </button>
    </div>
  );
};

export default BuildPage;
