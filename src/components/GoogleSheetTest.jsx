import { useEffect, useState } from "react";
import { getTripData } from "../services/googleSheetApi";

function GoogleSheetTest() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    getTripData()
      .then(setData)
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  if (error) {
    return (
      <div style={{ padding: "20px", color: "red" }}>
        API Error: {error}
      </div>
    );
  }

  if (!data) {
    return <div style={{ padding: "20px" }}>Loading Google Sheets...</div>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Google Sheets Connected ✅</h2>

      <p>
        Members: {data.Members?.length || 0}
      </p>

      <p>
        Payments: {data.Payments?.length || 0}
      </p>

      <p>
        Train Tickets: {data["Train Tickets"]?.length || 0}
      </p>

      <pre>
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}

export default GoogleSheetTest;