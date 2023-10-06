import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

type EditorPropType = {
  onChangeForm: (data: { key: string; value: string }) => void;
  content: string;
};

const MyQuillEditor: React.FC<EditorPropType> = ({ onChangeForm, content }) => {
  const handleChange = (content: string) => {
    onChangeForm({ key: "content", value: content });
  };

  return (
    <div>
      <ReactQuill
        value={content}
        onChange={(content) => handleChange(content)}
      />
    </div>
  );
};

export default MyQuillEditor;
