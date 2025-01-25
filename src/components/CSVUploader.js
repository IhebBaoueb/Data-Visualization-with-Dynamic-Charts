import React, { useState } from "react";
import Papa from "papaparse";
import {AlertCircle } from "lucide-react";

const CSVUploader = ({ onDataLoaded }) => {
    const [error, setError] = useState("");
    const [fileName, setFileName] = useState("");

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            if (file.type !== "text/csv") {
                setError("Please upload a valid CSV file.");
                setFileName("");
                return;
            }

            setError("");
            setFileName(file.name);

            
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
        <div className="csv-uploader-container">
            <div className="intro">
                <h2 className="text-xl font-bold text-center mb-4">
                    Welcome to Data Visualization
                </h2>
                <p className="text-center text-gray-600 mb-6">
                    Please upload a CSV file to start visualizing your data. The process is quick and easy!
                </p>
            </div>

            
            <div className="upload-section">
                <input
                    id="file-upload"
                    type="file"
                    accept=".csv"
                    onChange={handleFileUpload}
                    className="hidden"
                />
            </div>

            
            {fileName && (
                <p className="text-center mt-4 text-green-600">
                    File uploaded: <span className="font-semibold">{fileName}</span>
                </p>
            )}

            
            {error && (
                <div className="error-message mt-4 text-red-500 flex items-center justify-center">
                    <AlertCircle className="mr-2" />
                    {error}
                </div>
            )}
        </div>
    );
};

export default CSVUploader;
