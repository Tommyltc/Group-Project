import randomInt from "../utils/randomInt";
import padLeft from "../utils/padLeft";

export default async function getData(keyword) {
  // const response = await axios.get('https://call-your-api-like-that/thank-you-very-much');
  await new Promise(resolve => setTimeout(resolve, 2000)); //Just for demo, sleep(2000)

  let object = () => {
    return {
      title: "Test Flicker title #" + randomInt(1, 9999),
      description:
        "Test Flicker description! Do you want to find something about " +
        keyword +
        "?",
      photo:
        "https://s.yimg.com/ny/api/res/1.2/4OMiPyFzUesBF3dtTLSqTg--~A/YXBwaWQ9aGlnaGxhbmRlcjtzbT0xO3c9NTMwO2g9Mzk2/http://media.zenfs.com/zh-Hant-HK/homerun/heawork.tumblr.com/4b481e2526229821f2e759e860b87d9a",
      datetime: "2019-"  + padLeft(randomInt(1, 12), 2) + "-" + padLeft(randomInt(1, 28), 2) + " 00:00:00"
    };
  };

  let array = [];

  for (let i = 0; i < 10; i++) {
    array[i] = object();
  }

  return array;
}
