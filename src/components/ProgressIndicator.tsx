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
    <div className="flex flex-row gap-4">
    <div className="m-2 p-5 border rounded border-cyan-400 flex-1">
      <span className="text-cyan-400 flex justify-center text-xl">
        {progress.learn}
      </span>
      <span className="text-cyan-400 text-xl">learn</span>
    </div>
    <div className="m-2 p-5 border rounded border-cyan-400 flex-1">
      <span className="text-cyan-400 flex justify-center text-xl">
        {progress.know}
      </span>
      <span className="text-cyan-400 text-xl">know</span>
    </div>
  </div>
  );
}
