export const API_URL = "http://localhost:8080";

export const getHeaders = () => ({
  Authorization: "Bearer " + localStorage.getItem("jwt"),
  "Content-Type": "application/json",
});
//fix this shit until commit

//http://localhost:8080
//https://carderio-api.onrender.com