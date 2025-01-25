import React, { useState } from "react";
import ReactECharts from "echarts-for-react";
import { TextField, Button, MenuItem } from "@mui/material";

const Chart = ({ rows }) => {
    const [xAxisColumn, setXAxisColumn] = useState("");
    const [yAxisColumn, setYAxisColumn] = useState("");
    const [measure, setMeasure] = useState("sum"); // Mesure par défaut
    const [chartData, setChartData] = useState(null);

    // Générer les données du graphique
    const generateChartData = () => {
        if (!xAxisColumn || !yAxisColumn) {
            alert("Veuillez sélectionner les colonnes pour X et Y !");
            return;
        }

        // Grouper les données par l'axe X
        const groupedData = rows.reduce((acc, row) => {
            const xValue = row[xAxisColumn];
            const yValue = parseFloat(row[yAxisColumn]) || 0;

            if (!acc[xValue]) {
                acc[xValue] = [];
            }
            acc[xValue].push(yValue);
            return acc;
        }, {});

        // Calculer la mesure pour chaque groupe
        const xAxisData = Object.keys(groupedData);
        const yAxisData = xAxisData.map((xValue) => {
            const values = groupedData[xValue];

            switch (measure) {
                case "sum":
                    return values.reduce((sum, val) => sum + val, 0);
                case "average":
                    return values.reduce((sum, val) => sum + val, 0) / values.length;
                case "count":
                    return values.length;
                case "countDistinct":
                    return new Set(values).size;
                default:
                    return 0;
            }
        });

        // Mettre à jour les données du graphique
        setChartData({
            xAxis: {
                type: "category",
                data: xAxisData,
            },
            yAxis: {
                type: "value",
            },
            series: [
                {
                    data: yAxisData,
                    type: "bar",
                },
            ],
        });
    };

    return (
        <div style={{ marginTop: "20px" }}>
            <h2>Graphique Dynamique</h2>
            <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
                {/* Sélection de l'axe des X */}
                <TextField
                    label="Axe des X"
                    value={xAxisColumn}
                    onChange={(e) => setXAxisColumn(e.target.value)}
                    select
                    fullWidth
                >
                    {Object.keys(rows[0] || {}).map((key) => (
                        <MenuItem key={key} value={key}>
                            {key}
                        </MenuItem>
                    ))}
                </TextField>

                {/* Sélection de l'axe des Y */}
                <TextField
                    label="Axe des Y"
                    value={yAxisColumn}
                    onChange={(e) => setYAxisColumn(e.target.value)}
                    select
                    fullWidth
                >
                    {Object.keys(rows[0] || {}).map((key) => (
                        <MenuItem key={key} value={key}>
                            {key}
                        </MenuItem>
                    ))}
                </TextField>

                {/* Sélection de la mesure */}
                <TextField
                    label="Mesure"
                    value={measure}
                    onChange={(e) => setMeasure(e.target.value)}
                    select
                    fullWidth
                >
                    <MenuItem value="sum">Somme</MenuItem>
                    <MenuItem value="average">Moyenne</MenuItem>
                    <MenuItem value="count">Nombre total (Count)</MenuItem>
                    <MenuItem value="countDistinct">Nombre distinct (Count Distinct)</MenuItem>
                </TextField>

                {/* Bouton pour générer le graphique */}
                <Button variant="contained" color="warning" onClick={generateChartData}>
                    Générer
                </Button>
            </div>

            {/* Afficher le graphique */}
            {chartData && <ReactECharts option={chartData} />}
        </div>
    );
};

export default Chart;
