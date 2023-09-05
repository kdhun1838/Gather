import React, { useEffect, useState } from "react";
import { boards } from "./lib/api/board";
import { users } from "./lib/api/user";

const App: React.FC = () => {
  const [userData, setUserData] = useState<any>(null);
  const [boardData, setBoardData] = useState<any>(null);

  const fetchData = async () => {
    try {
      const response = await users();
      const boardResponse = await boards();
      setUserData(response.data);
      setBoardData(boardResponse.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      <h1>안녕하세요</h1>
      {userData && (
        <div>
          <h2>사용자 정보</h2>
          <pre>{JSON.stringify(userData, null, 2)}</pre>
          <pre>{JSON.stringify(boardData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default App;
