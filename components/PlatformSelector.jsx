import { PureComponent } from "react";
import { Form } from "react-bootstrap";

export default class PlatformSelector extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      selected_platform: ["instagram", "youtube", "flickr", "pinterest"]
    };
  }

  handleCheckboxChange(platform, enable) {
    let selected_platform = this.state.selected_platform;

    if(enable && selected_platform.indexOf(platform) === -1){
      selected_platform.push(platform);
    }

    if(!enable){
      selected_platform.splice(selected_platform.indexOf(platform), 1);
    }

    this.setState({ selected_platform });
    this.props.handleSelectPlatform(this.state.selected_platform);
  }

  render() {
    const { handleSearch } = this.props;

    return (
      <div className="p-2 platformSelector">
        <style jsx global>{`
          .platformSelector {
            background-color: #FFFFBB;
            opacity: 0.9;
          }
          .bg-youtube {
            background-color: rgb(255, 0, 0) !important;
          }
          .bg-pinterest {
            background-color: rgb(189, 8, 28) !important;
          }
          label{
            font-weight: bold;
            cursor: pointer;
            font-size: 0.9rem;
            text-transform: capitalize;
          }
          @media (max-width: 399px) {
            label {
              font-size: 0.7rem;
              padding-top: 0.3rem;
            }
          }
          label[for="checkbox-instagram"]{
            color: #343a40;
          }
          label[for="checkbox-youtube"]{
            color: #FF0000;
          }
          label[for="checkbox-flickr"]{
            color: #17a2b8;
          }
          label[for="checkbox-pinterest"]{
            color: rgb(189, 8, 28);
          }
        `}</style>
        {["instagram", "youtube", "flickr", "pinterest"].map(platform => (
          <Form.Check
            custom
            inline
            label={platform}
            type="checkbox"
            id={`checkbox-${platform}`}
            key={platform}
            defaultChecked={this.state.selected_platform.indexOf(platform) !== -1}
            onChange={e => {
              this.handleCheckboxChange(platform, e.target.checked);
            }}
          />
        ))}
      </div>
    );
  }
}
