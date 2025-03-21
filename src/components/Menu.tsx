import { useEffect } from "react";
import ProgressIndicator from "./ProgressIndicator";
import { useNavigate } from "react-router-dom";
export default function Menu() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("jwt")) {
      navigate("/login");
    }
  }, []);

  return (
    <div className="overflow-y-auto overflow-x-hidden max-w-full mx-auto px-4 pt-20">
      <div className="absolute top-2/5 right-1/2 left-1/2">
        <ProgressIndicator />
      </div>
      {/* <div>
      <CardList />
    </div> */}
    </div>
  );
}
