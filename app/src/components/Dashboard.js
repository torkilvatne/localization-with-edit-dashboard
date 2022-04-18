import React, { useState, useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

const Dashboard = (props) => {
  const [rows, setRows] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);

  useEffect(() => {
    // GET request using fetch inside useEffect React hook
    fetch("http://localhost:8000/texts")
      .then((response) => response.json())
      .then((data) => setRows(data));

    // empty dependency array means this effect will only run once (like componentDidMount in classes)
  }, []);

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
                {rows.map((row) => (
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
                      <Button color="primary">Edit</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </header>
    </div>
  );
};

export default Dashboard;
