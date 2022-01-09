import axios from 'axios'

export const apsi_backend = axios.create({
  // TODO: add url to env variables
  // Add url to your api gateway
  baseURL: 'https://w9fcjtpplj.execute-api.eu-central-1.amazonaws.com/prod/',
});
