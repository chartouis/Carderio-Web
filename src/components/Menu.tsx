import { useEffect } from "react";
import ProgressIndicator from "./ProgressIndicator";
import { useNavigate } from "react-router-dom";
export default function Menu() {

  const navigate = useNavigate()

  useEffect(()=>{
    if(!localStorage.getItem("jwt")){
      navigate("/login")
    }
  },[])

  return (
    <div>
      <ProgressIndicator />
    </div>
  );
}
