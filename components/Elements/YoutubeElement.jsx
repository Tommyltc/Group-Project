import { PureComponent } from "react";
import { Card } from "react-bootstrap";
import moment from "moment";

export default class YoutubeElement extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { id, title, description, photo, datetime } = this.props.data;
    var link = "https://www.youtube.com/watch?v="+id;
    console.log("youtube render");
    console.log(link);
    return (
      <>
        <Card className="element youtube">
          <a target="_blank" href={"https://www.youtube.com/watch?v="+id}><Card.Img variant="top" src={photo} /></a>
          <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Subtitle>{description}</Card.Subtitle>
          </Card.Body>
          <Card.Footer
            className="small p-1 pl-3 bg-youtube text-white"
            title={moment(datetime).format("YYYY-MM-DD HH:mm")}
          >
            <b>Youtube</b> on {moment(datetime).fromNow()}
          </Card.Footer>
        </Card>
      </>
    );
  }
}
