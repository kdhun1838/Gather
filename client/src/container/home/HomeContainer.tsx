import React, { useEffect, useState } from "react";
import { users } from "../../lib/api/user";
import { boards } from "../../lib/api/board";
import { list } from "../../lib/api/register";
import { useNavigate } from "react-router";
import Home from "../../components/home/Home";

const HomeContainer: React.FC = () => {
  const [userData, setUserData] = useState<any[]>([]); // 빈 배열로 초기화
  const [boardData, setBoardData] = useState<any[]>([]); // 빈 배열로 초기화
  const [registerData, setRegisterData] = useState<any[]>([]); // 빈 배열로 초기화
  //   const {loading} = useSelector((state:RootState)=>({
  //     loading:loading[""]
  //   }))

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
      <Home
        goWrite={goWrite}
        userData={userData}
        boardData={boardData}
        registerData={registerData}
      />
    </div>
  );
};

export default HomeContainer;
