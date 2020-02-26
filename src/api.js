import axios from 'axios'

const BACKEND_URL_BASE = "http://localhost:3001"
const BUNDLES_ENDPOINT = "/bundles"

export const loadBundleConfigurations = axios.get(
  BACKEND_URL_BASE + BUNDLES_ENDPOINT,
  {
    responseType: "json"
  }
)