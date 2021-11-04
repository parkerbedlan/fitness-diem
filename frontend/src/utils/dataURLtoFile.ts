export const dataURLtoFile = (dataurl: string) => {
  const match1 = dataurl.match(/(data:image\/(\w+);)|(.(\w+)$)/);
  const extension = (match1 && (match1[2] || match1[4])) || "PNG";

  const arr = dataurl.split(",");
  // const mime = arr[0].match(/:(.*?);/)![1];
  // const bstr = atob(arr[1]);
  const bstr = Buffer.from(arr[1], "base64").toString();
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], `testimage.${extension}`, {
    type: `image/${extension}`,
  });
};
