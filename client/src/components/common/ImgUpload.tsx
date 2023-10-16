import React, { useState, ChangeEvent } from "react";
import axios from "axios";

const ImgUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files && event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    console.log("sss");
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await axios.post("/admin/uploadImg", formData, {
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
      console.log("업로드할 파일이 선택되지 않았습니다.");
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleUpload}>업로드</button>
    </div>
  );
};

export default ImgUpload;
