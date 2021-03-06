import React, { useEffect } from 'react'
import { useTable, usePagination, useFilters, useAsyncDebounce } from 'react-table'
import { Table, Input, Pagination, PaginationLink, PaginationItem } from 'reactstrap';

import { REJECTED_REASON } from '../../data'
import DefaultColummnFilter from '../../components/tables/DefaultColumnFilter';


// Formating reject reason
const formatReason = ({ value }) => {
  const reason = REJECTED_REASON.find((reason) => reason.value === value ) 
  return reason.label
}

  // This is a custom filter UI for selecting
  // a unique option from a list
  function SelectColumnFilter({
    column: { filterValue, setFilter },
  }) {
    // Render a multi-select box
    return (
      <Input
        type="select"
        value={filterValue}
        onChange={e => {
          setFilter(e.target.value || undefined)
        }}
      >
        <option value="">All</option>
        {REJECTED_REASON.map((rejected_reason, i) => (
          <option key={i} value={rejected_reason.value}>
            {rejected_reason.label}
          </option>
        ))}
      </Input>
    )
  }

function RejectedProductCustomTable({ data, pagination, onFetchData}) {

  // default filter for all filterable columns
  const defaultColumn = React.useMemo(
    () => ({
      Filter: DefaultColummnFilter
    }),
    []
  )

  // It's important that we're using React.useMemo 
  // here to ensure that our data isn't recreated on every render.
  // see https://react-table.tanstack.com/docs/quick-start
  const columns = React.useMemo(
    () => [
      {
        Header: 'Seller',
        columns: [
          {
            Header: 'ID',
            accessor: 'id',
          },
          {
            Header: 'Inbound ID',
            accessor: 'inbound_id',
          },
          {
            Header: 'Seller Return ID',
            accessor: 'seller_return_id',
          },
          {
            Header: 'Product Info',
            accessor: 'product_info',
            disableFilters: true
          },
          {
            Header: 'Reason',
            id: 'reason',
            accessor: 'reject_reason',
            // Expected JSX / Function for customizing
            Filter: SelectColumnFilter,
            Cell: (row) => (
              <div>{formatReason(row)}</div>
            )
          },
        ]
      },
      {
        Header: 'Quantity',
        columns: [
          {
            Header: 'Rejected',
            accessor: 'quantity',
            disableFilters: true
          },
          {
            Header: 'Rejected Missing',
            accessor: 'quantity_rejected_missing',
            disableFilters: true
          }
        ]
      }
    ], []
  )

  /* table instance */
  const tableInstance = useTable({
    columns,
    data,
    defaultColumn,
    initialState: {
      pageSize: 10,
      pageIndex: 1,
    },
    pageCount: pagination.total_count,
    // it must be true if we implement filtering/pagination outside the table (e.i server-side)
    manualPagination: true,
    manualFilters: true
  },
    useFilters,
    usePagination
  )
 
  const {
    /* required instance */
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    /* final state object of the table  
    since we add `initialState`, it should included in the `state`
    {
      filters: [{…}]
      hiddenColumns: []
      ...
      pageIndex: 1
      pageSize: 10
      }
    }
    */
    state,
    /* pagination */
    canPreviousPage,
    canNextPage,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
  } = tableInstance

  // set delay every time call onFetchData
  const onDebounceFetch = useAsyncDebounce(() => {
    onFetchData(state)
  }, 500)


  // Server-side fetch data if the state changed
  useEffect(() => {
    console.log(state)
    onDebounceFetch()
  }, [state])

  return(
    // apply the table props
    <>
      <h2>Custome Table</h2>
      <Table 
        {...getTableProps()}
        bordered
      >
        <thead>
        {// Loop over the header rows
          headerGroups.map(headerGroup => (
            // Apply the header row props
            <tr {...headerGroup.getHeaderGroupProps()}>
              {// Loop over the headers in each row
              headerGroup.headers.map(column => (
                // Apply the header cell props
                <th {...column.getHeaderProps()}>
                  {column.render('Header')}
                  <div>{column.canFilter ? column.render('Filter') : null}</div>
                </th>
              ))}
            </tr>
          ))
        }
        </thead>
        {/* Apply the table body props */}
        <tbody {...getTableBodyProps()}>
          {// Loop over the table rows
          rows.map(row => {
            // Prepare the row for display
            prepareRow(row)
              return (
                // Apply the row props
                <tr {...row.getRowProps()}>
                  {// Loop over the rows cells
                  row.cells.map(cell => {
                    // Apply the cell props
                    return (
                      <td {...cell.getCellProps()}>
                        {// Render the cell contents
                        cell.render('Cell')}
                      </td>
                    )
                  })}
                </tr>
              )
            })
          }
        </tbody>
      </Table>
      <>
        <Pagination  
          size="lg" 
          aria-label="Page navigation example"
        >

          <PaginationItem>
            <PaginationLink 
              previous 
              onClick={() => previousPage()} 
              disabled={!canPreviousPage} 
            />
          </PaginationItem>
        
          <PaginationItem>
            <Input
              type='number'
              value={state.pageIndex}
              onChange={e => {
                const page = e.target.value ? Number(e.target.value) : 1
                gotoPage(page)
              }}
            />
            of Pages {pageCount}
          </PaginationItem>

          <PaginationItem>
            <PaginationLink 
              next 
              onClick={() => nextPage()}
              disabled={!canNextPage}
            />
          </PaginationItem>

        </Pagination>
      </>
    </>
  )
}

export default RejectedProductCustomTable