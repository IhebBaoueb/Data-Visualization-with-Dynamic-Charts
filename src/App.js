import React, { useState } from "react";
import CSVUploader from "./components/CSVUploader";
import DataTable from "./components/DataTable";
import Chart from "./components/BarChart";
import "./App.css"; 

const App = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);

    const handleDataLoaded = (loadedData) => {
        setData(loadedData);
        setFilteredData(loadedData);
    };

    return (
        <div>
            <nav className="nav">
                <div className="navbar-title-container">
                    <h1 className="navbar-title">Data Visualization</h1>
                </div>
            </nav>
            
            <main className="content-container">
                <CSVUploader onDataLoaded={handleDataLoaded} /> 
                
                {data.length > 0 && (
                    <>
                        <section className="table-section">
                            <DataTable
                                rows={filteredData}
                                setFilteredRows={setFilteredData}
                                onRowSelectionChange={setSelectedRows}
                            />
                        </section>

                        <hr className="divider" />

                        <section className="chart-section">
                            <Chart rows={selectedRows.length > 0 ? selectedRows : filteredData} />
                        </section>
                    </>
                )}
            </main>
        </div>
    );
};

export default App;
