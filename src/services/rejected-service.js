import axios from 'axios'
import { formatGetParams } from './helpers'

const RejectedProductApi = {

  gets: async (tableState) => {
    const endponint = `http://localhost:3000/api/v2/admins/sellers/products/rejected?${formatGetParams(tableState)}`
    console.log(endponint)
    const response = await axios.get(endponint)
    return response
  }
}

export default RejectedProductApi