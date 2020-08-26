import React, { useMemo } from 'react'
import { useTable } from 'react-table'
import { Table } from 'reactstrap';

function RejectedProductSimpleTable(props) {
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

  // Use static data
  // It's important that we're using React.useMemo 
  // here to ensure that our data isn't recreated on every render
  // see https://react-table.tanstack.com/docs/quick-start
  const data = useMemo(
    () => [
      {
        id: 71747,
        inbound_id: 4168,
        is_quantity_valid: true,
        product_info: "& Other Stories Silver Backpack",
        quantity: 1,
        quantity_rejected_missing: 0,
        reject_reason: "cannot_verify_authenticity",
        seller_name: "Hani Kenisha",
        seller_product_id: 200450,
        seller_return_id: 5488,
      },
      {
        id: 71747,
        inbound_id: 4168,
        is_quantity_valid: true,
        product_info: "& Other Stories Silver Backpack",
        quantity: 1,
        quantity_rejected_missing: 0,
        reject_reason: "cannot_verify_authenticity",
        seller_name: "Hani Kenisha",
        seller_product_id: 200450,
        seller_return_id: 5488,
      },
      {
        id: 71747,
        inbound_id: 4168,
        is_quantity_valid: true,
        product_info: "& Other Stories Silver Backpack",
        quantity: 1,
        quantity_rejected_missing: 0,
        reject_reason: "cannot_verify_authenticity",
        seller_name: "Hani Kenisha",
        seller_product_id: 200450,
        seller_return_id: 5488,
      },
      {
        id: 717,
        inbound_id: 4168,
        is_quantity_valid: true,
        product_info: "& Other Stories Silver Backpack",
        quantity: 1,
        quantity_rejected_missing: 0,
        reject_reason: "cannot_verify_authenticity",
        seller_name: "Hani Kenisha",
        seller_product_id: 200450,
        seller_return_id: 5488,
      }
    ]
  )

  /* Initialize table instance */
  // useTable at the very least needs to be provided with an object containing the memoized
  const tableInstance = useTable({ columns, data })


  /* Minimum configuration of react table */
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = tableInstance

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