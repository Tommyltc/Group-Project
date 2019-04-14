import { PureComponent, Fragment } from "react";
import { Card } from "react-bootstrap";
import moment from "moment";

import PinterestModal from "../Modals/PinterestModal";

export default class PinterestElement extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { modalShow: false };
  }

  render() {
    const { title, description, photo, datetime } = this.props.data;

    let modalClose = () => this.setState({ modalShow: false });

    return (
      <Fragment>
        <Card className="element pinterest">
          <Card.Img
            variant="top"
            src={photo}
            onClick={() => this.setState({ modalShow: true })}
            style={{ cursor: "pointer" }}
          />
          <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Subtitle>{description}</Card.Subtitle>
          </Card.Body>
          <Card.Footer
            className="small p-1 pl-3 bg-pinterest text-white"
            title={moment(datetime).format("YYYY-MM-DD HH:mm")}
          >
            <b>Pinterest</b> on {moment(datetime).fromNow()}
          </Card.Footer>
        </Card>

        <PinterestModal
          show={this.state.modalShow}
          onHide={modalClose}
          imgSrc={photo}
        />
      </Fragment>
    );
  }
}
