import { PureComponent } from "react";
import { InputGroup, FormControl, Button } from "react-bootstrap";

export default class Searchbar extends PureComponent {
  render() {
    return (
      <div>
        <InputGroup>
          <FormControl
            placeholder="What you want to search?"
            aria-label="What you want to search?"
            aria-describedby="basic-addon2"
            defaultValue={this.props.default_keyword}
            onChange={e => {
              this.props.handleInputText(e.target.value);
            }}
            onKeyPress={e => {
              if (e.which == 13) {
                this.props.handleSearch();
              }
            }}
          />
          <InputGroup.Append>
            <Button
              variant="primary"
              disabled={this.props.loading}
              onClick={e => {
                if (!this.props.loading) {
                  this.props.handleSearch();
                }
              }}
            >
              {this.props.loading ? "Searching…" : "Search"}
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </div>
    );
  }
}
