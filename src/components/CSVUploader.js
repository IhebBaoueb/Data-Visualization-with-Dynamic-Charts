import React from "react";
import Papa from "papaparse";

const CSVUploader = ({ onDataLoaded }) => {
    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            Papa.parse(file, {
                header: true,
                skipEmptyLines: true,
                complete: (result) => {
                    onDataLoaded(result.data);
                },
            });
        }
    };

    return (
        <div style={{ margin: "20px" }}>
            <h2>Upload your CSV file</h2>
            <input type="file" accept=".csv" onChange={handleFileUpload} />
        </div>
    );
};

export default CSVUploader;
