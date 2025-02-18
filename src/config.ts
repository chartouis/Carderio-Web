export const API_URL = "https://carderio-api.onrender.com";

export const getHeaders = () => ({
  Authorization: "Bearer " + localStorage.getItem("jwt"),
  "Content-Type": "application/json",
});
//fix this shit until commit

//http://localhost:8080
//https://carderio-api.onrender.com