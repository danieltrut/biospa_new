import React, { useContext } from "react";
import { GlobalContext } from "./../../Context";

import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";

// For fetching data
import GenericBtn from "./GenericBtn";
import EmailSender from "./EmailSender";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Protseduur",
  },
  {
    id: "description",
    numeric: true,
    disablePadding: false,
    label: "Kirjeldus",
  },
  {
    id: "duration",
    numeric: true,
    disablePadding: false,
    label: "Kestvus (m)",
  },
  {
    id: "price",
    numeric: true,
    disablePadding: false,
    label: "Hind (€)",
  },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  // Table Header -------------------------------------------------------
  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "Vajuta kõike protseduuridele",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {/* {procedures?.length === 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          tühi array
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Protseduurid
        </Typography>
      )} */}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

// Table part by itsesf --------------------------------------------------------------------

export default function EnhancedTable() {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("price");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const { procedures, setProcedures } = useContext(GlobalContext); // Catches chosen Procedures in Tabel
  const { proceduresValue, setProceduresValue } = useContext(GlobalContext); // Catches chosen Procedures in Tabel

  //   useEffect(() => {
  //     loadProcedures();
  //   }, []);
  //   console.log(procedures);

  // Tabele header arrows for sorting
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  // All checkboxes handle function
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = procedures.map((n) => n.proc_title_et);
      setProceduresValue(newSelecteds);
      return;
    }
    setProceduresValue([]);
  };

  // // Every Fetching Result Row Checkbox
  // const handleSelectedProcecures = (event, proc_title_et) => {
  //   const selectedIndex = proceduresValue.indexOf(proc_title_et);
  //   let newSelected = [];

  //   if (selectedIndex === -1) {
  //     newSelected = newSelected.concat(proceduresValue, proc_title_et);
  //   } else if (selectedIndex === 0) {
  //     newSelected = newSelected.concat(proceduresValue.slice(1));
  //   } else if (selectedIndex === proceduresValue.length - 1) {
  //     newSelected = newSelected.concat(proceduresValue.slice(0, -1));
  //   } else if (selectedIndex > 0) {
  //     newSelected = newSelected.concat(
  //       proceduresValue.slice(0, selectedIndex),
  //       proceduresValue.slice(selectedIndex + 1)
  //     );
  //   }

  //   setProceduresValue(newSelected);
  //   console.log(setProcedures);
  // };

  // const handleSelectedProcecures = (event, proc_title_et) => {
  //   const selectedIndex = proceduresValue(proc_title_et);
  //   let newSelected = [];

  //   newSelected.indexOf(selectedIndex) === -1
  //     ? newSelected.push(selectedIndex)
  //     : console.log("This item already exists");
  //   setProceduresValue(newSelected);
  //   console.log(setProcedures);
  // };

  const handleSelectedProcecures = (event, proc_title_et) => {
    const selectedIndex = proceduresValue(proc_title_et);
    let newSelected = [];

    if (!newSelected.includes(selectedIndex)) {
      newSelected.push(selectedIndex);
    }
    setProceduresValue(newSelected);
    console.log(setProcedures);
  };

  // Changing pages
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handling rows per page
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Counting of how much is selected
  const isSelected = (proc_title_et) =>
    proceduresValue.indexOf(proc_title_et) !== -1;
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - procedures.length) : 0;

  // Passing values to Generic button

  return (
    <Box sx={{ width: "100%" }}>
      {/*  Button fetches procedures data */}
      <GenericBtn />

      {/*
       *  If statement - if array length is not null table is shown
       */}

      {procedures?.length === 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="h6"
          component="div"
        ></Typography>
      ) : (
        <Paper sx={{ width: "100%", mb: 2 }}>
          <Typography
            sx={{ flex: "1 1 100%" }}
            style={{ marginLeft: 15, paddingTop: 15 }}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            Märgi protseduurid, mida soovid saada e-postile
          </Typography>
          <TableContainer>
            <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
              <EnhancedTableHead
                numSelected={proceduresValue.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={procedures.length}
              />
              <TableBody procedures={procedures}>
                {/* if you don't need to support IE11, you can replace the `stableSort` call with:
               rows.slice().sort(getComparator(order, orderBy)) */}
                {stableSort(procedures, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((procedure, index) => {
                    const isItemSelected = isSelected(procedure.proc_title_et);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        onClick={(event) =>
                          handleSelectedProcecures(
                            event,
                            procedure.proc_title_et
                          )
                        }
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={procedure.proc_title_et}
                        selected={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            color="primary"
                            checked={isItemSelected}
                            inputProps={{
                              "aria-labelledby": labelId,
                            }}
                          />
                        </TableCell>
                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="none"
                        >
                          {procedure.proc_title_et}
                        </TableCell>
                        <TableCell align="left">
                          {procedure.proc_descr_et}
                        </TableCell>
                        <TableCell align="right">
                          {procedure.proc_duration}
                        </TableCell>
                        <TableCell align="right">
                          {procedure.proc_price}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              labelRowsPerPage={"Ridade arv lehekülje kohta"}
              component="div"
              count={procedures.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableContainer>
        </Paper>
      )}

      {/*  Table consistens */}

      {/* <EnhancedTableToolbar numSelected={selected.length} /> */}

      <EmailSender />
    </Box>
  );
}
