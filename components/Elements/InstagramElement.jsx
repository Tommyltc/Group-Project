import { PureComponent, Fragment } from "react";
import { Card } from "react-bootstrap";
import moment from "moment";

import InstagramModal from "../Modals/InstagramModal";

export default class InstagramElement extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { modalShow: false };
  }

  render() {
    const { title, description, src, datetime } = this.props.data;
    const { keyword } = this.props;

    const alt =
      title || "Image" + (keyword ? " about " + keyword : "") + " on Instagram";

    let modalClose = () => this.setState({ modalShow: false });

    return (
      <Fragment>
        <Card className="element instagram">
          <Card.Img
            variant="top"
            src={src}
            onClick={() => this.setState({ modalShow: true })}
            style={{ cursor: "pointer" }}
            alt={alt}
            title={alt}
          />
          <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Subtitle>{description}</Card.Subtitle>
          </Card.Body>
          <Card.Footer
            className="small p-1 pl-3 bg-dark text-white"
            title={moment(datetime).format("YYYY-MM-DD HH:mm")}
          >
            <b>Instagram</b> on {moment(datetime).fromNow()}
          </Card.Footer>
        </Card>

        <InstagramModal
          show={this.state.modalShow}
          onHide={modalClose}
          title={alt}
          description={description}
          alt={alt}
          imgSrc={src}
        />
      </Fragment>
    );
  }
}
