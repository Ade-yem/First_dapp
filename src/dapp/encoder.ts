import { ethers } from "ethers";

const coder = new ethers.utils.AbiCoder()

export const encodeData = (data: any): string => {
  const dataString = JSON.stringify(data);
  const encoding = coder.encode(["string"], [dataString])
  return encoding;
}
export const decodeData = (data: string): ethers.utils.Result => {
  const decoding = coder.decode(["string"], data)
  return decoding;
}