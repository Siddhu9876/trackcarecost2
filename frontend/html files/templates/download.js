document.addEventListener("DOMContentLoaded", function () {
    const formData = JSON.parse(localStorage.getItem("formData"));
    const dataPreview = document.getElementById("data-preview");

    if (!formData) {
        dataPreview.innerHTML = "<p>No data found. Please fill the form first.</p>";
        return;
    }

    function createTable() {
        let tableHTML = "<table border='1'><tr>";
        Object.keys(formData).forEach((key) => {
            tableHTML += `<th>${key}</th>`;
        });
        tableHTML += "</tr><tr>";
        Object.values(formData).forEach((value) => {
            tableHTML += `<td>${Array.isArray(value) ? value.join(", ") : value}</td>`;
        });
        tableHTML += "</tr></table>";
        return tableHTML;
    }

    // Show data preview as a table
    dataPreview.innerHTML = createTable();

    function downloadCSV() {
        let csvContent = "data:text/csv;charset=utf-8,";
        csvContent += Object.keys(formData).join(",") + "\n";
        csvContent += Object.values(formData).map(value => Array.isArray(value) ? value.join("; ") : value).join(",") + "\n";

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "health_expenditure_analysis.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    function downloadTable() {
        const blob = new Blob([createTable()], { type: "text/html" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "health_expenditure_analysis.html";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    function downloadPDF() {
        let pdfContent = "Health Expenditure Analysis\n\n";
        Object.entries(formData).forEach(([key, value]) => {
            pdfContent += `${key}: ${Array.isArray(value) ? value.join(", ") : value}\n`;
        });

        const blob = new Blob([pdfContent], { type: "application/pdf" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "health_expenditure_analysis.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    document.getElementById("download-csv").addEventListener("click", downloadCSV);
    document.getElementById("download-table").addEventListener("click", downloadTable);
    document.getElementById("download-pdf").addEventListener("click", downloadPDF);
});
