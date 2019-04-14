import { PureComponent } from "react";

import Masonry from "react-masonry-component";

import FlickrElement from "../components/Elements/FlickrElement";
import InstagramElement from "../components/Elements/InstagramElement";
import PinterestElement from "../components/Elements/PinterestElement";
import YoutubeElement from "../components/Elements/YoutubeElement";

export default class Result extends PureComponent {
  render() {
    let { data, keyword } = this.props;

    return (
      <>
        <style jsx global>{`
          .bg-youtube {
            background-color: rgb(255, 0, 0);
          }
          .bg-pinterest{
            background-color: rgb(189, 8, 28);
          }
          .element {
            width: 18rem;
            word-break: break-all;
          }
          .element img{
            max-width: 100%;
          }
          @media (max-width: 607px) {
            .element {
              width: 100%;
            }
          }
          .card-footer a {
            color: #FFF;
          }
        `}</style>
        <Masonry className="mt-1">
          {data.map((element, i) => {
            let element_dom;
            switch (element.platform) {
              case "flickrData":
                element_dom = <FlickrElement data={element} keyword={keyword} key={i} />;
                break;
              case "instagramData":
                element_dom = <InstagramElement data={element} keyword={keyword} key={i} />;
                break;
              case "pinterestData":
                element_dom = <PinterestElement data={element} keyword={keyword} key={i} />;
                break;
              case "youtubeData":
                element_dom = <YoutubeElement data={element} keyword={keyword} key={i} />;
                break;
            }
            return (
              <div className="m-2" key={i}>
                {element_dom}
              </div>
            );
          })}
        </Masonry>
      </>
    );
  }
}
