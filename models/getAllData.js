import getDataFlickr from "../models/flickr";
import getDataInstagram from "../models/instagram";
import getDataPinterest from "../models/pinterest";
import getDataYoutube from "../models/youtube";

export default async function getAllData(keyword, platforms = []) {
  keyword = keyword === "" ? "polyu" : keyword;

  const [
    flickrData,
    instagramData,
    pinterestData,
    youtubeData
  ] = await Promise.all([
    platforms.length === 0 || platforms.indexOf("flickr") !== -1 ? getDataFlickr(keyword) : getEmptyData(),
    platforms.length === 0 || platforms.indexOf("instagram") !== -1 ? getDataInstagram(keyword) : getEmptyData(),
    platforms.length === 0 || platforms.indexOf("pinterest") !== -1 ? getDataPinterest(keyword) : getEmptyData(),
    platforms.length === 0 || platforms.indexOf("youtube") !== -1 ? getDataYoutube(keyword) : getEmptyData()
  ]);
  console.log(flickrData, instagramData, pinterestData, youtubeData);
  return { flickrData, instagramData, pinterestData, youtubeData };
}

async function getEmptyData(){
  await new Promise(resolve => setTimeout(resolve, 2500));

  return [];
}
