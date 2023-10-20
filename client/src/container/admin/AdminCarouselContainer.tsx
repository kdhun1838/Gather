import React from "react";
import AdminCarousel from "../../components/admin/AdminCarousel";
import { deleteCarousel, getCarousel } from "../../lib/api/admin";
import client from "../../lib/api/client";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

const AdminCarouselContainer = () => {
  const [data, setData] = React.useState<any>(null);
  const [file, setFile] = React.useState<File | null>(null);
  const [isDelete, setIsDelete] = React.useState<boolean>(false);
  const navigate = useNavigate();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files && event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const initFile = () => {
    setFile(null);
  };

  const handleUpload = async (
    content: string,
    link: string,
    isUpdate: boolean,
    carouselNum: number
  ) => {
    console.log("sss", content, link, isUpdate, carouselNum);

    if (isUpdate) {
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("content", content);
        formData.append("link", link);
        formData.append("carouselNum", carouselNum.toString());

        try {
          const response = await client.post(
            "/admin/updateCarousel",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );

          if (response.status === 200) {
            console.log("파일이 성공적으로 업로드되었습니다.");
          } else {
            console.error("파일 업로드 실패:", response.statusText);
          }
        } catch (error) {
          console.error("파일 업로드 중 오류 발생:", error);
        }
      } else {
        alert("업로드할 파일이 선택되지 않았습니다.");
      }
    } else {
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("content", content);
        formData.append("link", link);

        try {
          const response = await client.post("/admin/uploadImg", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });

          if (response.status === 200) {
            console.log("파일이 성공적으로 업로드되었습니다.");
          } else {
            console.error("파일 업로드 실패:", response.statusText);
          }
        } catch (error) {
          console.error("파일 업로드 중 오류 발생:", error);
        }
      } else {
        alert("업로드할 파일이 선택되지 않았습니다.");
      }
    }
  };

  const getData = async () => {
    try {
      const response = await getCarousel();
      setData(response.data);
    } catch (error) {
      console.error("에러:", error);
    }
  };
  React.useEffect(() => {
    getData();
  }, [isDelete]);

  const handleDelete = async (carouselNum: number) => {
    // const num=carouselNum;
    Swal.fire({
      title: "삭제하기",
      text: "이 광고를 삭제하시겠습니까?",
      showCancelButton: true,
      cancelButtonText: "취소",
      confirmButtonText: "삭제",
      showLoaderOnConfirm: true,
      preConfirm: () => {
        setIsDelete(!isDelete);
        try {
          deleteCarousel(carouselNum);
          const updateData = data.filter(
            (item: any) => item.carouselNum !== carouselNum
          );
          setData(updateData);
        } catch (error) {
          console.error("에러:", error);
        }
      },
    }).then((res: any) => {
      if (res.isConfirmed) {
        Swal.fire({
          icon: "success",
          text: "삭제 성공",
        });
        getData();
      }
    });
  };

  return (
    <div>
      <AdminCarousel
        data={data}
        handleFileChange={handleFileChange}
        handleUpload={handleUpload}
        file={file}
        initFile={initFile}
        getData={getData}
        handleDelete={handleDelete}
        setFile={setFile}
      />
    </div>
  );
};

export default AdminCarouselContainer;
