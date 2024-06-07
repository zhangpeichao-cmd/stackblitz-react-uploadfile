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

/**
 * 简易ajax
 */
export const simpleRequest = ({
  url,
  method = "POST",
  data,
  headers,
  onprogress
}: SimpleRequestParams) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
    headers && Object.keys(headers).forEach(key =>
      xhr.setRequestHeader(key, headers[key])
    );
    xhr.send(data);
    xhr.onload = resolve;
    xhr.onerror = reject;
    onprogress && (xhr.onprogress = ev => {
      onprogress(ev.loaded)
    })
  });
}


interface SimpleRequestParams {
  url: string;
  method?: "POST",
  data?: XMLHttpRequestBodyInit,
  headers?: { [key: string]: string }
  onprogress?: (ev: number) => void
}