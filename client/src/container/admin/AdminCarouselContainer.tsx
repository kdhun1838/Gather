import React from "react";
import AdminCarousel from "../../components/admin/AdminCarousel";
import { getCarousel } from "../../lib/api/admin";
import client from "../../lib/api/client";

const AdminCarouselContainer = () => {
  const [data, setData] = React.useState<any>(null);
  const [file, setFile] = React.useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files && event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const initFile = () => {
    setFile(null);
  };

  const handleUpload = async (content: string, link: string) => {
    console.log("sss", content, link);
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
  }, []);
  console.log("데이타", data);
  return (
    <div>
      <AdminCarousel
        data={data}
        handleFileChange={handleFileChange}
        handleUpload={handleUpload}
        file={file}
        initFile={initFile}
        getData={getData}
      />
    </div>
  );
};

export default AdminCarouselContainer;
