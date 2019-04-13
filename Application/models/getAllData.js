import getDataFlicker from "../models/flicker";
import getDataInstagram from "../models/instagram";
import getDataPinterest from "../models/pinterest";
import getDataYoutube from "../models/youtube";

export default async function getAllData(keyword) {
  const [
    flickerData,
    instagramData,
    pinterestData,
    youtubeData
  ] = await Promise.all([
    getDataFlicker(keyword),
    getDataInstagram(keyword),
    getDataPinterest(keyword),
    getDataYoutube(keyword)
  ]);

  return { flickerData, instagramData, pinterestData, youtubeData };
}
