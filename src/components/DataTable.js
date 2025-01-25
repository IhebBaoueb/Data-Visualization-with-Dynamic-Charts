import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { TextField, Button, MenuItem, Select, InputLabel, FormControl } from "@mui/material";

const DataTable = ({ rows }) => {
    const [filterText, setFilterText] = useState("");
    const [filterColumn, setFilterColumn] = useState("");
    const [filterOperator, setFilterOperator] = useState("exact");
    const [filteredRows, setFilteredRows] = useState(rows);

    // Colonnes dynamiques basées sur les clés du fichier CSV
    const columns = rows.length
        ? Object.keys(rows[0]).map((key) => ({
              field: key,
              headerName: key,
              width: 150,
              sortable: true,
          }))
        : [];

    // Gérer le filtrage des données
    const handleFilter = () => {
        if (!filterColumn || !filterText) {
            setFilteredRows(rows); // Réinitialiser si aucun filtre n'est défini
            return;
        }

        let filteredData = [];
        switch (filterOperator) {
            case "exact":
                filteredData = rows.filter((row) =>
                    row[filterColumn]?.toString().toLowerCase() === filterText.toLowerCase()
                );
                break;
            case "greaterThan":
                filteredData = rows.filter(
                    (row) => parseFloat(row[filterColumn]) > parseFloat(filterText)
                );
                break;
            case "lessThan":
                filteredData = rows.filter(
                    (row) => parseFloat(row[filterColumn]) < parseFloat(filterText)
                );
                break;
            case "contains":
                filteredData = rows.filter((row) =>
                    row[filterColumn]?.toString().toLowerCase().includes(filterText.toLowerCase())
                );
                break;
            case "regex":
                try {
                    const regex = new RegExp(filterText, "i"); // 'i' pour insensible à la casse
                    filteredData = rows.filter((row) => regex.test(row[filterColumn]?.toString()));
                } catch (e) {
                    alert("Expression régulière invalide");
                    return;
                }
                break;
            default:
                break;
        }

        setFilteredRows(filteredData);
    };

    // Réinitialiser le filtre
    const resetFilter = () => {
        setFilterText("");
        setFilterColumn("");
        setFilterOperator("exact");
        setFilteredRows(rows);
    };

    return (
        <div style={{ height: 600, width: "100%", marginTop: "20px" }}>
            {/* Barre de filtrage */}
            <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
                {/* Sélection de la colonne */}
                <FormControl fullWidth>
                    <InputLabel>Colonne à filtrer</InputLabel>
                    <Select
                        value={filterColumn}
                        onChange={(e) => setFilterColumn(e.target.value)}
                        label="Colonne à filtrer"
                    >
                        <MenuItem value="">-- Sélectionnez une colonne --</MenuItem>
                        {columns.map((col) => (
                            <MenuItem key={col.field} value={col.field}>
                                {col.headerName}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {/* Texte à rechercher */}
                <TextField
                    label="Texte à rechercher"
                    value={filterText}
                    onChange={(e) => setFilterText(e.target.value)}
                    fullWidth
                />

                {/* Choix de l'opérateur */}
                <FormControl fullWidth>
                    <InputLabel>Opérateur</InputLabel>
                    <Select
                        value={filterOperator}
                        onChange={(e) => setFilterOperator(e.target.value)}
                        label="Opérateur"
                    >
                        <MenuItem value="exact">Exact</MenuItem>
                        <MenuItem value="greaterThan">Supérieur à</MenuItem>
                        <MenuItem value="lessThan">Inférieur à</MenuItem>
                        <MenuItem value="contains">Contient</MenuItem>
                        <MenuItem value="regex">Regex</MenuItem>
                    </Select>
                </FormControl>

                {/* Bouton pour appliquer le filtre */}
                <Button variant="contained" color="warning" onClick={handleFilter}>
                    Filtrer
                </Button>

                {/* Bouton pour réinitialiser */}
                <Button variant="outlined" color="Dark" SecondaryonClick={resetFilter}>
                    Reset
                </Button>
            </div>

            {/* Table dynamique avec tri intégré */}
            <DataGrid
                rows={filteredRows.map((row, index) => ({ id: index, ...row }))}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10, 20, 50]}
                pagination
            />
        </div>
    );
};

export default DataTable;
