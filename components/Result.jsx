import { PureComponent } from "react";

import Masonry from "react-masonry-component";

import FlickerElement from "../components/Elements/FlickerElement";
import InstagramElement from "../components/Elements/InstagramElement";
import PinterestElement from "../components/Elements/PinterestElement";
import YoutubeElement from "../components/Elements/YoutubeElement";

export default class Result extends PureComponent {
  reformArray(data) {
    let result = [];

    //Group into single array
    for (let platform in data) {
      if (data.hasOwnProperty(platform)) {
        for (let i in data[platform]) {
          const element = data[platform][i];
          element.platform = platform;
          result.push(element);
        }
      }
    }

    //Sort by date DESC
    result.sort((a, b) => {
      if (a.datetime < b.datetime) {
        return 1;
      } else if (a.datetime > b.datetime) {
        return -1;
      } else {
        return 0;
      }
    });

    return result;
  }

  render() {
    let { data } = this.props;

    data = this.reformArray(data);

    return (
      <Masonry className="mt-3">
        {data.map((element, i) => {
          let element_dom;
          switch (element.platform) {
            case "flickerData":
              element_dom = <FlickerElement data={element} key={i} />;
              break;
            case "instagramData":
              element_dom = <InstagramElement data={element} key={i} />;
              break;
            case "pinterestData":
              element_dom = <PinterestElement data={element} key={i} />;
              break;
            case "youtubeData":
              element_dom = <YoutubeElement data={element} key={i} />;
              break;
          }
          return <div className="m-2">{element_dom}</div>;
        })}
      </Masonry>
    );
  }
}
