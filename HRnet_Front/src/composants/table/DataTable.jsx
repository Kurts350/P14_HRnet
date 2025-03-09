import { useState } from "react";
import PropTypes from "prop-types";
import { styled } from "styled-components";
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
  width: 100%;
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

const EmptyMessage = styled.p`
  text-align: center;
  margin: 20px 0;
`;

/**
 * Composant DataTable réutilisable
 * @param {Object} props - Les propriétés du composant
 * @param {Array} props.data - Les données à afficher dans le tableau
 * @param {Array} props.columns - Les colonnes à afficher
 * @param {string} props.emptyMessage - Message à afficher quand il n'y a pas de données
 * @param {Array} props.pageSizeOptions - Options pour le nombre d'éléments par page
 * @param {number} props.defaultPageSize - Taille de page par défaut
 * @param {boolean} props.showGlobalFilter - Afficher le filtre global ou non
 * @param {boolean} props.showPagination - Afficher la pagination ou non
 */
export function DataTable({
  data = [],
  columns = [],
  emptyMessage = "No data available",
  pageSizeOptions = [10, 20, 30, 40, 50],
  defaultPageSize = 10,
  showGlobalFilter = true,
  showPagination = true,
}) {
  const [globalFilter, setGlobalFilter] = useState("");

  // Configuration du tableau
  const table = useReactTable({
    data,
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
        pageSize: defaultPageSize,
      },
    },
  });

  return (
    <TableContainer>
      {/* Recherche globale */}
      {showGlobalFilter && (
        <SearchInput
          value={globalFilter ?? ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search all columns..."
          aria-label="Search all columns"
        />
      )}

      {/* Le tableau */}
      {data.length === 0 ? (
        <EmptyMessage>{emptyMessage}</EmptyMessage>
      ) : (
        <StyledTable>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHeaderCell
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    role="columnheader"
                    aria-sort={header.column.getIsSorted() ? (header.column.getIsSorted() === "asc" ? "ascending" : "descending") : "none"}
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
      {showPagination && data.length > 0 && (
        <Pagination>
          <div>
            <PageSizeSelector
              value={table.getState().pagination.pageSize}
              onChange={(e) => {
                table.setPageSize(Number(e.target.value));
              }}
              aria-label="Rows per page"
            >
              {pageSizeOptions.map((pageSize) => (
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
              aria-label="First page"
            >
              {"<<"}
            </PageButton>
            <PageButton
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              aria-label="Previous page"
            >
              {"<"}
            </PageButton>
            <PageButton
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              aria-label="Next page"
            >
              {">"}
            </PageButton>
            <PageButton
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
              aria-label="Last page"
            >
              {">>"}
            </PageButton>
          </div>
        </Pagination>
      )}
    </TableContainer>
  );
}

DataTable.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  emptyMessage: PropTypes.string,
  pageSizeOptions: PropTypes.arrayOf(PropTypes.number),
  defaultPageSize: PropTypes.number,
  showGlobalFilter: PropTypes.bool,
  showPagination: PropTypes.bool,
};