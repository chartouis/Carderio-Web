import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL } from "../config";
import { getHeaders } from "../config";

export default function ProgressIndicator() {
  const [progress, setProgress] = useState({
    learn: 0,
    know: 0,
  });

  useEffect(() => {
    update();
  }, []);

  const update = () => {

    const timestamp = new Date().toISOString();
    const localDateTime = { localDateTime: timestamp};
    
    axios
      .post(API_URL + "/cards/request/progress", localDateTime, {
        headers: getHeaders(),
      })
      .then((response) => {
        setProgress(response.data);
      });
  };
  return (
    <div className="row">
      <div className="m-2 p-5 border rounded border-info col">
        <span className="text-info row justify-content-center fs-4">
          {progress.learn}
        </span>
        <span className="text-info row fs-4">learn</span>
      </div>
      <div className="m-2 p-5 border rounded border-info col">
        <span className="text-info row justify-content-center fs-4">
          {progress.know}
        </span>
        <span className="text-info row fs-4">know</span>
      </div>
    </div>
  );
}
