import { PureComponent } from "react";
import { Modal, Container, Row, Col } from "react-bootstrap";

export default class FlickrModal extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { show, onHide, imgSrc } = this.props;

    return (
      <div className="FlickrModal">
        <style jsx global>{`
          .img-center {
            display: block;
            margin-left: auto;
            margin-right: auto;
          }
        `}</style>

        <Modal
          show={show}
          onHide={onHide}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
        <Modal.Header closeButton />
          <Modal.Body>
            <Container>
              <Row>
                <Col>
                  <img src={imgSrc} alt="" className="img-center" />
                </Col>
              </Row>
            </Container>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}
