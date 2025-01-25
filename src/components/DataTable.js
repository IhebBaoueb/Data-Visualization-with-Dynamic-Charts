import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { TextField, Button, MenuItem, Select, InputLabel, FormControl } from "@mui/material";

const DataTable = ({ rows ,  setFilteredRows, onRowSelectionChange  }) => {
    const [filterText, setFilterText] = useState("");
    const [filterColumn, setFilterColumn] = useState("");
    const [filterOperator, setFilterOperator] = useState("exact");

    
    const columns = rows.length
        ? Object.keys(rows[0]).map((key) => ({
              field: key,
              headerName: key,
              width: 150,
              sortable: true,
          }))
        : [];

    
    const handleFilter = () => {
        if (!filterColumn || !filterText) {
            setFilteredRows(rows); 
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
                    const regex = new RegExp(filterText, "i"); 
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

    
    const resetFilter = () => {
        setFilterText("");
        setFilterColumn("");
        setFilterOperator("exact");
        setFilteredRows(rows);
    };

    return (
        <div style={{ height: 600, width: "100%", marginTop: "20px" }}>
            
            <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
                
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

                
                <TextField
                    label="Texte à rechercher"
                    value={filterText}
                    onChange={(e) => setFilterText(e.target.value)}
                    fullWidth
                />

                
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

                
                <Button variant="contained" color="warning" onClick={handleFilter}>
                    Filtrer
                </Button>

                
                <Button variant="outlined" color="Dark" SecondaryonClick={resetFilter}>
                    Reset
                </Button>
            </div>

            
            <DataGrid
                rows={rows.map((row, index) => ({ id: index, ...row }))}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10, 20, 50]}
                pagination
                checkboxSelection
                onRowSelectionModelChange={(ids) => {
                    const selectedRows = ids.map((id) => rows[id]);
                    onRowSelectionChange(selectedRows); // Mettre à jour les lignes sélectionnées
                }}
            />
        </div>
    );
};

export default DataTable;
