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
  const handleClose = () => setSelectedRow(null);

  useEffect(() => {
    // GET request using fetch inside useEffect React hook
    fetch("http://localhost:8000/texts")
      .then((response) => response.json())
      .then((data) => setRows(data));

    // empty dependency array means this effect will only run once (like componentDidMount in classes)
  }, []);

  console.log(selectedRow);

  return (
    <div className="App">
      <header className="App-header">
        <h1>
          <FormattedMessage id="hello" />
        </h1>
        <p>
          <Link to="/">Go home</Link>
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
                        onClick={() => setSelectedRow(index)}
                      >
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {selectedRow !== null && (
            <Modal
              open={selectedRow !== null}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <p>Edit field '{rows[selectedRow]["id"]}'</p>
              </Box>
            </Modal>
          )}
        </div>
      </header>
    </div>
  );
};

export default Dashboard;
