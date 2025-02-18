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
    <div className="overflow-y-auto overflow-x-hidden">
      <div>
        <ProgressIndicator />
      </div>
      {/* <div>
        <CardList />
      </div> */}
    </div>
  );
}
