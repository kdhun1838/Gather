import React, { useEffect, useState } from "react";
import { users } from "./lib/api/user";

const App: React.FC = () => {
  const [userData, setUserData] = useState<any>(null); // userData를 저장할 상태

  const fetchData = async () => {
    try {
      const response = await users();
      setUserData(response.data); // 응답 데이터를 상태에 저장
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchData(); // 컴포넌트가 마운트되면 데이터를 가져옴
  }, []);

  return (
    <div className="App">
      <h1>안녕하세요</h1>
      {userData && (
        <div>
          <h2>사용자 정보</h2>
          <pre>{JSON.stringify(userData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default App;
