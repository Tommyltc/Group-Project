import { PureComponent } from "react";
import { Card } from "react-bootstrap";
import moment from "moment";

export default class FlickerElement extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { title, description, photo, datetime } = this.props.data;

    return (
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={photo} />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Subtitle>{description}</Card.Subtitle>
        </Card.Body>
        <Card.Footer className="small p-1 pl-3 bg-info text-white"><b>Flicker</b> on {moment(datetime).format("YYYY-MM-DD")}</Card.Footer>
      </Card>
    );
  }
}
