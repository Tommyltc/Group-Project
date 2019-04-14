import { PureComponent } from "react";
import { Modal, Container, Row, Col, Image } from "react-bootstrap";

export default class PinterestModal extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { show, onHide, imgSrc } = this.props;

    return (
      <div>
        <style jsx global>{`
          .PinterestModal {
            max-width: 70vw;
            width: 70vw;
          }
          .PinterestModal .img-center {
            display: block;
            margin-left: auto;
            margin-right: auto;
            max-width: 100%;
          }
        `}</style>

        <Modal
          show={show}
          onHide={onHide}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          dialogClassName="PinterestModal"
        >
          <Modal.Header closeButton />
          <Modal.Body>
            <Container fluid>
              <Row>
                <Col>
                  <Image src={imgSrc} alt="" className="img-center" />
                </Col>
              </Row>
            </Container>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}
