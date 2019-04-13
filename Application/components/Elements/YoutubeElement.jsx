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
        <style type="text/css">{`
          .bg-youtube{
            background-color: rgb(255, 0, 0);
          }
        `}</style>
        <Card style={{ width: "18rem" }}>
          <Card.Img variant="top" src={photo} />
          <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Subtitle>{description}</Card.Subtitle>
          </Card.Body>
          <Card.Footer className="small p-1 pl-3 bg-youtube text-white">
            <b>Youtube</b> on {moment(datetime).format("YYYY-MM-DD")}
          </Card.Footer>
        </Card>
      </>
    );
  }
}
