export const getFileSize = async (file: File) => {
  console.log(getFileChunkList(file));
};

/**
 * 切片大小 100kB
 */
const CHUNK_SIZE = 100 * 1024;

/**
 * 文件切片
 */
export const getFileChunkList = (file: File) => {
  const fileSize = file.size;
  const length = Math.ceil(fileSize / CHUNK_SIZE);
  return new Array(length).fill('').map((_, index) => {
    const start = index * CHUNK_SIZE;
    return file.slice(start, start + CHUNK_SIZE);
  });
};
