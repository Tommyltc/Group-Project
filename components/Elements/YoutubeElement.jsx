import { PureComponent } from "react";
import { Card } from "react-bootstrap";
import moment from "moment";

export default class YoutubeElement extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { title, description, photo, datetime } = this.props.data;

    return (
      <>
        <Card className="element youtube">
          <Card.Img variant="top" src={photo} />
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
