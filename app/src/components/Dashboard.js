import React, { useState, useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Box from "@mui/material/Box";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Dashboard = (props) => {
  const [rows, setRows] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [addNewField, setAddNewField] = useState(false);
  const [updateFieldInputs, setUpdateFieldInputs] = useState({});

  const fetchTexts = () => {
    fetch("http://localhost:8000/texts")
      .then((response) => response.json())
      .then((data) => setRows(data));
  };

  const handleClose = () => {
    setSelectedRow(null);
    setAddNewField(false);
  };

  const handleSetSelectedRow = (index) => {
    setUpdateFieldInputs(rows[index]);
    setSelectedRow(index);
  };

  const handleUpdateFieldInputsChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setUpdateFieldInputs((values) => ({ ...values, [name]: value }));
  };

  const handleDeleteRow = (index) => {
    console.log(rows[index].id);
    fetch("http://localhost:8000/text/" + rows[index].id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    }).then(() => fetchTexts());
  };

  const handleUpdateSubmit = (event) => {
    event.preventDefault();
    fetch("http://localhost:8000/text/" + updateFieldInputs.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateFieldInputs),
    }).then(() => fetchTexts());
    setUpdateFieldInputs({});
    handleClose();
  };

  const handleAddSubmit = (event) => {
    event.preventDefault();
    fetch("http://localhost:8000/text", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateFieldInputs),
    }).then(() => fetchTexts());
    setUpdateFieldInputs({});
    handleClose();
  };

  useEffect(() => {
    fetchTexts();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>
          <FormattedMessage id="hello" />
        </h1>
        <p>
          <Link to="/">
            <FormattedMessage id="go_home" />
          </Link>
        </p>
        <div className="table">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <b>Felt ID</b>
                  </TableCell>
                  <TableCell align="right">
                    <b>en-us</b>
                  </TableCell>
                  <TableCell align="right">
                    <b>no-nb</b>
                  </TableCell>
                  <TableCell align="right"></TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, index) => (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.id}
                    </TableCell>
                    <TableCell align="right">{row["en_us"]}</TableCell>
                    <TableCell align="right">{row["no_nb"]}</TableCell>
                    <TableCell align="right">
                      <Button
                        color="primary"
                        onClick={() => handleSetSelectedRow(index)}
                      >
                        Update
                      </Button>
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        color="primary"
                        onClick={() => handleDeleteRow(index)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Button color="primary" onClick={() => setAddNewField(true)}>
            Add new field
          </Button>
          {selectedRow !== null && (
            <Modal
              open={selectedRow !== null}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <p>
                  Update field <b>{rows[selectedRow]["id"]}</b>
                </p>
                <form onSubmit={handleUpdateSubmit}>
                  <label>
                    en_us:
                    <input
                      type="text"
                      name="en_us"
                      value={updateFieldInputs.en_us || ""}
                      onChange={handleUpdateFieldInputsChange}
                    />
                  </label>
                  <br />
                  <label>
                    no_nb:
                    <input
                      type="text"
                      name="no_nb"
                      value={updateFieldInputs.no_nb || ""}
                      onChange={handleUpdateFieldInputsChange}
                    />
                  </label>
                  <br />
                  <input type="submit" />
                </form>
              </Box>
            </Modal>
          )}
          {addNewField && (
            <Modal
              open={addNewField}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <p>Add new field</p>
                <form onSubmit={handleAddSubmit}>
                  <label>
                    id:
                    <input
                      type="text"
                      name="id"
                      value={updateFieldInputs.id || ""}
                      onChange={handleUpdateFieldInputsChange}
                    />
                  </label>
                  <br />
                  <label>
                    en_us:
                    <input
                      type="text"
                      name="en_us"
                      value={updateFieldInputs.en_us || ""}
                      onChange={handleUpdateFieldInputsChange}
                    />
                  </label>
                  <br />
                  <label>
                    no_nb:
                    <input
                      type="text"
                      name="no_nb"
                      value={updateFieldInputs.no_nb || ""}
                      onChange={handleUpdateFieldInputsChange}
                    />
                  </label>
                  <br />
                  <input type="submit" />
                </form>
              </Box>
            </Modal>
          )}
        </div>
      </header>
    </div>
  );
};

export default Dashboard;
