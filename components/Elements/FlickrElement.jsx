import { PureComponent } from "react";
import { Card } from "react-bootstrap";
import moment from "moment";

export default class FlickrElement extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { title, src, datetime } = this.props.data;

    return (
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={src} />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
        </Card.Body>
        <Card.Footer className="small p-1 pl-3 bg-info text-white"><b>Flickr</b> on {moment(datetime).format("YYYY-MM-DD")}</Card.Footer>
      </Card>
    );
  }
}
