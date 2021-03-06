//Used for deployment
//export const SERVICE_URL = "http://phyrem.pt"
//export const SERVICE_API = "http://phyrem.pt/api/"

//Used for development or testing
//  By default, nginx should reverse-proxy the requests so localhost is fine
//  If problems arise and if using docker use command do get the SERVICE_API IP address : 
//      docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' phyrem-backend
export const SERVICE_URL = "http://localhost:80"
export const SERVICE_API = "http://localhost:80/api/"