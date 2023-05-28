/* eslint-disable jsx-a11y/label-has-associated-control */
import AddIcon from "@mui/icons-material/Add";
import { Button, Drawer } from "@mui/material";
import { GridRowId, GridRowModel, GridRowsProp } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import "../../styles/ItemDrawer.css";
import Table from "../tables/Table";
import AddItemButton from "./AddItemButton";
import ItemModalButton from "./itemModalButton";

function ItemDrawer() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [isDisabled, setIsDisabled] = useState(true);

  const [rows, setRows] = useState<GridRowsProp>([]);

  const [emailValid, setEmailValid] = useState(false);

  useEffect(() => {
    if (rows.length === 0 || !emailValid) {
      setIsDisabled(true);
    } else if (rows.length > 0 && emailValid) {
      setIsDisabled(false);
    }
  }, [rows, emailValid]);

  const handleDeleteClick = (id: GridRowId) => () => {
    setRows(rows.filter((row) => row.id !== id));
  };

  // This function will only be called when user click edit and save button
  // The newRow is the updated row, and the table will display the updated row
  // TODO: modify this function to update the rows with the newRow
  // suggestion: find the old row by id and update the field
  const handleRowEditCommit = (newRow: GridRowModel) => {
    let categories = newRow.cats;
    if (typeof categories === "string") {
      categories = categories.replace(/\s/g, "").split(",").sort();
    }
    // reformat the newRow to match the type of each column
    const rowFormatter = {
      ...newRow,
      value: parseFloat(newRow.value),
      cats: categories,
    };

    const newRows = rows.map((row) => {
      if (row.id === newRow.id) {
        return rowFormatter;
      }
      return row;
    });
    setRows(newRows);

    return rowFormatter;
  };

  return (
    <>
      <Button
        variant="contained"
        onClick={() => setIsDrawerOpen(true)}
        startIcon={<AddIcon />}
        sx={{
          backgroundColor: "#006d7d",
          borderRadius: 10,
          width: "fit-content",
          alignSelf: "end",
        }}
      >
        New Donation
      </Button>
      <Drawer
        anchor="bottom"
        open={isDrawerOpen}
        onClose={() => {
          setIsDrawerOpen(false);
          setRows([]);
        }}
      >
        <div>
          <button
            className="back-button"
            type="button"
            onClick={() => {
              setIsDrawerOpen(false);
              setRows(() => []);
            }}
            aria-label="back"
          />

          <div className="summary-row">
            <div className="summary-text">
              Donation Summary: {rows.length} Items
            </div>
            <ItemModalButton rows={rows} setRows={setRows} />
          </div>
          <div className="data-table">
            <Table
              tableHeight="54vh"
              rows={rows}
              handleDeleteClick={handleDeleteClick}
              handleRowEditCommit={handleRowEditCommit}
            />
          </div>
          <div className="end-buttons">
            <Button
              variant="outlined"
              onClick={() => {
                setIsDrawerOpen(false);
                setRows([]);
              }}
              sx={{
                width: 166,
                height: 53,
                borderRadius: 100,
                border: 1,
                borderColor: "#006d7d",
                fontWeight: 600,
                fontSize: 18,
                lineHeight: 22,
                color: "#006d7d",
              }}
            >
              Cancel
            </Button>
            <AddItemButton
              isDisabled={isDisabled}
              rows={rows}
              setRows={setRows}
              setIsDrawerOpen={setIsDrawerOpen}
              emailValid={emailValid}
              setEmailValid={setEmailValid}
            />
          </div>
        </div>
      </Drawer>
    </>
  );
}

export default ItemDrawer;
