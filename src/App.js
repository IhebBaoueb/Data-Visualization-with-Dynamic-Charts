import React, { useState } from "react";
import CSVUploader from "./components/CSVUploader";
import DataTable from "./components/DataTable";
import Chart from "./components/BarChart";

const App = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]); // Ajouter un état pour les données filtrées

    // Fonction pour gérer les données chargées depuis le CSV
    const handleDataLoaded = (loadedData) => {
        setData(loadedData);
        setFilteredData(loadedData); // Initialiser filteredData avec les données chargées
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>CSV Table Viewer with Sorting and Filtering</h1>
            <CSVUploader onDataLoaded={handleDataLoaded} /> {/* Uploader CSV */}
            
            {/* Si des données sont chargées, afficher le tableau et le graphique */}
            {data.length > 0 && (
                <>
                    {/* Tableau des données */}
                    <DataTable rows={filteredData} setFilteredRows={setFilteredData} /> 
                    
                    {/* Ligne de séparation entre le tableau et le graphique */}
                    <hr style={{ margin: "20px 0", border: "1px solid #ddd" }} />
                    
                    {/* Graphique */}
                    <Chart rows={filteredData} /> 
                </>
            )}
        </div>
    );
};

export default App;
