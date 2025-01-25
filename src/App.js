import React, { useState } from "react";
import CSVUploader from "./components/CSVUploader";
import DataTable from "./components/DataTable";
import Chart from "./components/BarChart";
import "./App.css"; // Import des styles CSS

const App = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    const handleDataLoaded = (loadedData) => {
        setData(loadedData);
        setFilteredData(loadedData);
    };

    return (
        <div>
            {/* Barre de navigation */}
            <nav>
                <h1>CSV Table Viewer with Sorting and Filtering</h1>
            </nav>

            <main className="content-container">
                <CSVUploader onDataLoaded={handleDataLoaded} /> {/* Uploader CSV */}

                {/* Si des données sont chargées, afficher le tableau et le graphique */}
                {data.length > 0 && (
                    <>
                        {/* Tableau des données */}
                        <section className="table-section">
                            <DataTable rows={filteredData} setFilteredRows={setFilteredData} /> 
                        </section>

                        {/* Ligne de séparation entre le tableau et le graphique */}
                        <hr className="divider" />

                        {/* Graphique */}
                        <section className="chart-section">
                            <Chart rows={filteredData} /> 
                        </section>
                    </>
                )}
            </main>
            
            
        </div>
    );
};

export default App;
