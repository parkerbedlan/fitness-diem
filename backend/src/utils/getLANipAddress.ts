import os from "os";
export const getLANipAddress = () => {
  return os.networkInterfaces()["Wi-Fi"]?.find((ip) => ip.family === "IPv4")!
    .address;
};
