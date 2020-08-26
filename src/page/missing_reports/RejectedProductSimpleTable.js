import React, { useEffect } from 'react'
import { useAsyncDebounce } from 'react-table'
import { useTable } from 'react-table'
import { Table } from 'reactstrap';

function RejectedProductSimpleTable({ data, onFetchData, pagination}) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state
  } = useTable({
    columns,
    data,
  })

   // It's important that we're using React.useMemo 
  // here to ensure that our data isn't recreated on every render
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
          },
          {
            Header: 'Reason',
            id: 'reason',
            accessor: 'reject_reason',
          },
        ]
      },
      {
        Header: 'Quantity',
        columns: [
          {
            Header: 'Rejected',
            accessor: 'quantity',
          },
          {
            Header: 'Rejected Missing',
            accessor: 'quantity_rejected_missing'
          }
        ]
      }
    ], []
  )

  // set delay every time call onFetchData
  const onDebounceFetch = useAsyncDebounce(() => {
    onFetchData(state)
  }, 500)


  // Server-side fetch data if the state changed
  useEffect(() => {
    onDebounceFetch()
  }, [state])

  return(
    <>
      <h2>Simple Table</h2>
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
                  {// Render the header
                  column.render('Header')}
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
    </>
  )
}

export default RejectedProductSimpleTable