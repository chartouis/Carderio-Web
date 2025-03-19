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
      <div>
        <ProgressIndicator />
      </div>
      {/* <div>
      <CardList />
    </div> */}
    </div>
  );
}
