import { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { styled } from "styled-components";
import { selectEmployees } from "../store/employeesSlice";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";

// Styled components pour le tableau
const TableContainer = styled.div`
  padding: 1rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  font-size: 0.9em;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
  border-radius: 5px;
  overflow: hidden;
`;

const TableHeader = styled.thead`
  background-color: #009879;
  color: white;
  text-align: left;
  font-weight: bold;
`;

const TableRow = styled.tr`
  border-bottom: 1px solid #dddddd;

  &:nth-of-type(even) {
    background-color: #f3f3f3;
  }

  &:last-of-type {
    border-bottom: 2px solid #009879;
  }
`;

const TableCell = styled.td`
  padding: 12px 15px;
`;

const TableHeaderCell = styled.th`
  padding: 12px 15px;
  cursor: pointer;

  &:hover {
    background-color: #008068;
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
`;

const PageInfo = styled.span``;

const PageButton = styled.button`
  padding: 5px 10px;
  margin: 0 5px;
  border: 1px solid #ccc;
  background-color: ${(props) => (props.active ? "#009879" : "white")};
  color: ${(props) => (props.active ? "white" : "black")};
  cursor: pointer;
  border-radius: 3px;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

const SearchInput = styled.input`
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 200px;
`;

const PageSizeSelector = styled.select`
  padding: 5px;
  border-radius: 4px;
`;

export function EmployeeList() {
  const employees = useSelector(selectEmployees);
  const [globalFilter, setGlobalFilter] = useState("");

  // Définition des colonnes
  const columns = useMemo(
    () => [
      {
        header: "First Name",
        accessorKey: "firstName",
      },
      {
        header: "Last Name",
        accessorKey: "lastName",
      },
      {
        header: "Hire Date",
        accessorKey: "hireDate",
      },
      {
        header: "Department",
        accessorKey: "department",
      },
      {
        header: "Date of Birth",
        accessorKey: "birthDate",
      },
      {
        header: "Address",
        accessorKey: "address",
      },
      {
        header: "City",
        accessorKey: "city",
      },
      {
        header: "State",
        accessorKey: "state",
      },
      {
        header: "Zip Code",
        accessorKey: "zipCode",
      },
    ],
    []
  );

  // Configuration du tableau
  const table = useReactTable({
    data: employees,
    columns,
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  return (
    <TableContainer>
      <h1>Current Employees</h1>

      {/* Recherche globale */}
      <SearchInput
        value={globalFilter ?? ""}
        onChange={(e) => setGlobalFilter(e.target.value)}
        placeholder="Search all columns..."
      />

      {/* Le tableau */}
      {employees.length === 0 ? (
        <p>No employees found. Please add employees from the home page.</p>
      ) : (
        <StyledTable>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHeaderCell
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {/* Indicateur de tri */}
                    {{ asc: " 🔼", desc: " 🔽" }[header.column.getIsSorted()] ??
                      ""}
                  </TableHeaderCell>
                ))}
              </tr>
            ))}
          </TableHeader>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </tbody>
        </StyledTable>
      )}

      {/* Pagination */}
      <Pagination>
        <div>
          <PageSizeSelector
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </PageSizeSelector>
        </div>

        <PageInfo>
          Page{" "}
          <strong>
            {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </strong>
        </PageInfo>

        <div>
          <PageButton
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            {"<<"}
          </PageButton>
          <PageButton
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {"<"}
          </PageButton>
          <PageButton
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {">"}
          </PageButton>
          <PageButton
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            {">>"}
          </PageButton>
        </div>
      </Pagination>
    </TableContainer>
  );
}
