import { encode } from "blurhash";
import sharp from "sharp";
import axios from "axios";

const encodeImg2hash = async (link: string) => {
  if (!link) return "";
  const input = (await axios({ url: link, responseType: "arraybuffer" }))
    .data as Buffer;
  const { data: pixels, info: metadata } = await sharp(input)
    .raw()
    .ensureAlpha()
    .resize(3, 4)
    .toBuffer({ resolveWithObject: true });
  return new Promise((resolve, reject) => {
    try {
      const clampedImg = new Uint8ClampedArray(pixels);
      resolve(encode(clampedImg, metadata.width, metadata.height, 4, 4));
    } catch (e) {
      reject(e);
    }
  });
};

export default encodeImg2hash;
