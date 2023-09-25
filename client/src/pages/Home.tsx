import React, { useEffect, useState } from "react";
import { users } from "../lib/api/user";
import { boards } from "../lib/api/board";
import { list } from "../lib/api/register";
import { useNavigate } from "react-router";

const Home: React.FC = () => {
  const [userData, setUserData] = useState<any[]>([]); // 빈 배열로 초기화
  const [boardData, setBoardData] = useState<any[]>([]); // 빈 배열로 초기화
  const [registerData, setRegisterData] = useState<any[]>([]); // 빈 배열로 초기화

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await users();
      const boardResponse = await boards();
      const registerResponse = await list();
      setUserData(response.data);
      setBoardData(boardResponse.data);
      setRegisterData(registerResponse.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const goWrite = () => {
    navigate("/register");
  };

  return (
    <div>
      <button onClick={() => goWrite()}>글쓰기</button>
      <div>
        <h2>User Data:</h2>
        <ul>
          {userData.map((item: any, index: number) => (
            <li key={index}>{item.name}</li>
          ))}
        </ul>
      </div>

      <div>
        <h2>Board Data:</h2>
        <ul>
          {boardData.map((item: any, index: number) => (
            <li key={index}>{item.title}</li>
          ))}
        </ul>
      </div>

      <div>
        <h2>Register Data:</h2>
        <ul>
          {registerData.map((item: any, index: number) => (
            <li key={index}>
              {item.category} - {item.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
