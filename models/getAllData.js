import getDataFlickr from "../models/flickr";
import getDataInstagram from "../models/instagram";
import getDataPinterest from "../models/pinterest";
import getDataYoutube from "../models/youtube";

export default async function getAllData(keyword) {
  const [
    flickrData,
    instagramData,
    pinterestData,
    youtubeData
  ] = await Promise.all([
    getDataFlickr(keyword),
    getDataInstagram(keyword),
    getDataPinterest(keyword),
    getDataYoutube(keyword)
  ]);

  return { flickrData, instagramData, pinterestData, youtubeData };
}
