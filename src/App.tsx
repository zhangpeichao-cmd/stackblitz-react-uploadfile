import { ChangeEvent } from 'react';
import { Toaster, toast } from 'sonner';
import { getFileSize } from './file_upload';

function App() {
  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return toast.warning('暂无文件！');
    getFileSize(file);
  };

  return (
    <>
      <Toaster />
      <input type="file" multiple={false} onChange={onFileChange} />
    </>
  );
}

export default App;
