import React, { useState } from 'react'

import RejectedProductSimpleTable from './RejectedProductSimpleTable'
import RejectedProductCustomTable from './RejectedProductCustomTable'

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
      <RejectedProductSimpleTable />
      <RejectedProductCustomTable
        data={rejectedProducts} 
        pagination={pagination}
        onFetchData={onFetchRejectedProduct}
      />
    </>
  )
}

export default RejectedProductContainer