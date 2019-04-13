import { PureComponent } from "react";
import { InputGroup, FormControl, Button } from "react-bootstrap";

export default class Searchbar extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      keyword: ""
    };
  }

  handleInputText(keyword) {
    this.setState({ keyword });
  }

  render() {
    const { handleSearch } = this.props;

    return (
      <div>
        <InputGroup>
          <FormControl
            placeholder="What you want to search?"
            aria-label="What you want to search?"
            aria-describedby="basic-addon2"
            onChange={e => {
              this.handleInputText(e.target.value);
            }}
            onKeyPress={e => {
              if (e.which == 13) {
                handleSearch(this.state.keyword);
              }
            }}
          />
          <InputGroup.Append>
            <Button
              variant="primary"
              onClick={e => {
                handleSearch(this.state.keyword);
              }}
            >
              Search
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </div>
    );
  }
}
