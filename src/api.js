import axios from 'axios'

const BACKEND_URL_BASE = "http://localhost:3001"
const BUNDLES_ENDPOINT = "/bundles"
const LOG_ENDPOINT = "/shipments/log"

export const loadBundleConfigurations = axios.get(
  BACKEND_URL_BASE + BUNDLES_ENDPOINT,
  {
    responseType: "json"
  }
)

export const logShipmentCalculations = (shipments, totalPrice) => {
  return axios.post(
    BACKEND_URL_BASE + LOG_ENDPOINT, 
    {
      totalPrice,
      shipments
    }
  )
}