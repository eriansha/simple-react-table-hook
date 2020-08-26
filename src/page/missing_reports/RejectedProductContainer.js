import React, { useState, useEffect } from 'react'

import RejectedProductSimpleTable from './RejectedProductSimpleTable'
import RejectedProductTable from './RejectedProductTable'

import RejectedProductApi from '../../services/rejected-service'

function RejectedProductContainer(props) {
  const [rejectedProducts, setRejectedProducts] = useState([])
  const [pagination, setPagination] = useState({})

  const onFetchRejectedProduct = (tableState) => {
    RejectedProductApi.gets(tableState)
    .then((response) => {
      setRejectedProducts(response.data.seller_rejected_products)
      setPagination(response.data.meta)
    })
    .catch((error) => {
      alert(error)
    })
  }

  return(
    <>
      <RejectedProductSimpleTable columns={columns} data={rejectedProducts} />
      <div style={{ marginBottom: '100px' }}></div>
      <RejectedProductTable
        data={rejectedProducts} 
        pagination={pagination}
        onFetchData={onFetchRejectedProduct}
      />
    </>
  )
}

export default RejectedProductContainer