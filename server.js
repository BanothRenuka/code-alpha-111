const express = require("express");
const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

const reportContent = require("/reportContent");

const app = express();
const PORT = 3000;

app.get("/generate-pdf", (req, res) => {
    const doc = new PDFDocument();

    const filePath = path.join(__dirname, "IoT_Smart_Homes_Report.pdf");
    const writeStream = fs.createWriteStream(filePath);

    doc.pipe(writeStream);

    doc.fontSize(18).text("IoT Applications in Smart Homes", { align: "center" });
    doc.moveDown();
    doc.fontSize(12).text(reportContent, { align: "justify" });

    doc.end();

    writeStream.on("finish", () => {
        res.send("PDF Research Report Generated Successfully!");
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
