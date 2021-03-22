import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { GlobalConsumer } from "context/store/store";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

function TableProductionReport({ stateData }) {
  const classes = useStyles();
  let currentDate = new Date().toLocaleDateString();
  let data = stateData.filter((value) => value.date === currentDate);
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Production Time</StyledTableCell>
            <StyledTableCell align="right">Line</StyledTableCell>
            <StyledTableCell align="right">OK Parts</StyledTableCell>
            <StyledTableCell align="right">NG Parts</StyledTableCell>
            <StyledTableCell align="center">Masalah</StyledTableCell>
            <StyledTableCell align="center">
              Waktu Berhenti (Menit)
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell component="th" scope="row">
                {row.productionTime}
              </StyledTableCell>
              <StyledTableCell align="right">{row.line}</StyledTableCell>
              <StyledTableCell align="right">{row.quantity_OK}</StyledTableCell>
              <StyledTableCell align="right">{row.quantity_NG}</StyledTableCell>
              <StyledTableCell align="center">{row.problem}</StyledTableCell>
              <StyledTableCell align="center">{row.stopTime}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default GlobalConsumer(TableProductionReport);
