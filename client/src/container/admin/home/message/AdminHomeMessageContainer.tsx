import React from "react";
import AdminHomeMessage from "../../../../components/admin/home/message/AdminHomeMessage";
import { getMessages, postMessages } from "../../../../lib/api/admin";
import { MessageType } from "../../../../types/adminTypes";
import { Loading, LoadingImage } from "../../../auth/LoginForm";
import { useSelector } from "react-redux";
import { RootState } from "../../../../modules";
import Swal from "sweetalert2";

const AdminHomeMessageContainer = () => {
  const { userId } = useSelector((state: RootState) => ({
    userId: state.user.user.id,
  }));
  const [data, setData] = React.useState<MessageType[]>();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [text, setText] = React.useState<string>("");
  const [onPost, setOnPost] = React.useState<boolean>(false);

  const getData = async () => {
    setLoading(true);
    const response = await getMessages();
    setData(response.data);
    console.log("카카카", response.data);
    setLoading(false);
  };

  const onChangeMsg = React.useCallback((message: string) => {
    setText(message);
    console.log("text---", message);
  }, []);

  const onPostMsg = React.useCallback(async () => {
    Swal.fire({
      title: "메시지 등록하기",
      text: "이 메시지를 등록하시겠습니까?",
      showCancelButton: true,
      cancelButtonText: "취소",
      confirmButtonText: "등록",
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        setOnPost(!onPost);
        try {
          await postMessages(text, userId);
        } catch (error) {
          console.error("에러:", error);
        }
      },
    }).then((res: any) => {
      if (res.isConfirmed) {
        Swal.fire({
          icon: "success",
          text: "등록 성공",
        });
      }
    });
  }, [text, userId, onPost]);

  React.useEffect(() => {
    getData();
  }, [onPost]);

  return (
    <>
      {loading ? (
        <Loading>
          <LoadingImage src="/loading.gif" alt="로딩 중" />
        </Loading>
      ) : (
        <AdminHomeMessage
          message={data}
          onChangeMsg={onChangeMsg}
          onPostMsg={onPostMsg}
          text={text}
        />
      )}
    </>
  );
};

export default AdminHomeMessageContainer;
