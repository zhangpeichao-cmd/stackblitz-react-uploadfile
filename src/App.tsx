import { ChangeEvent, useRef, useState } from "react";
import { Toaster, toast } from "sonner";
import { simpleRequest } from "./file_upload";

function App() {
  const fileRef = useRef<File>();

  const [state, setState] = useState("0%");

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    fileRef.current = e.target.files?.[0];
  };

  const onUpload = async () => {
    if (!fileRef.current) {
      return toast.error("暂无文件！");
    }
    let oood = undefined;
    const fileFormData = new FormData();
    fileFormData.append("file", fileRef.current);
    const uploadPromise = simpleRequest({
      url: "http://localhost:3000/upload",
      method: "POST",
      data: fileFormData,
      onprogress: (ev) => {
        console.log("ev :>> ", ev);
        toast.promise(uploadPromise, {
          loading: `${Math.floor(ev.loaded / ev.total * 100)}%`,
          id: oood!,
        });
      },
    });
    oood = toast.promise(uploadPromise, {
      loading: state,
      success: "上传成功！",
    });
  };

  return (
    <>
      <Toaster richColors />
      <input type="file" multiple={false} onChange={onFileChange} />
      <button onClick={onUpload}>上传</button>
    </>
  );
}

export default App;
