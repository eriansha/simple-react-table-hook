import React from 'react'
import { Input } from 'reactstrap'


const DefaultColummnFilter = ({
  column: { 
    filterValue, 
    preFilteredRows, 
    setFilter 
  }
}) => {

  const count = preFilteredRows.length

  return(
    <Input
      value={filterValue || ''}
      onChange={ e => {
        setFilter(e.target.value || undefined)
      }}
      placeholder={`Search ${count} records...`}
    />
  )
}

export default DefaultColummnFilter