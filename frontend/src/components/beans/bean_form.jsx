import React from "react";
import * as API from "../../util/api";
import { originArray, roastArray } from "../../util/coffee_ref";
import { BackButton } from "../back";

const defaultState = {
  name: "",
  roaster: "",
  origin: "",
  roast: "",
  rating: 0,
};

export class BeanForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      roaster: "",
      origin: "",
      roast: "",
      rating: 0,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit() {
    const newBean = {
      userId: window.currentUser.id,
      name: this.state.name,
      roaster: this.state.roaster,
      origin: this.state.origin,
      roast: this.state.roast,
      rating: this.state.rating,
    };
    console.log(newBean);
    API.createNewBean(newBean)
      .then((bean) => {
        this.setState({ ...defaultState });
        console.log(bean);
      })
      .catch((err) => console.log(err.response.data));
  }

  render() {
    //these can be moved outside of class once were sure they're static
    const roastOptions = roastArray.map((roast, i) => {
      return (
        <option value={roast} key={i + 1}>
          {roast}
        </option>
      );
    });

    const ratingOptions = [1, 2, 3, 4, 5].map((score, i) => {
      return (
        <option value={score} key={i + 1}>
          {score}
        </option>
      );
    });

    return (
      <div>
        <BackButton />
        <form>
          <div className="bean-field">
            <label>Name</label>
            <input
              onChange={this.handleChange}
              type="text"
              name="name"
              value={this.state.name}
            ></input>
          </div>
          <div className="bean-field">
            <label>Roaster</label>
            <input
              onChange={this.handleChange}
              type="text"
              name="roaster"
              value={this.state.roaster}
            ></input>
          </div>
          <div className="bean-field">
            <label>Place of Origin</label>
            <input
              onChange={this.handleChange}
              type="text"
              name="origin"
              value={this.state.origin}
            ></input>
          </div>
          <div className="bean-field">
            <label>Roast</label>
            <select
              onChange={this.handleChange}
              name="roast"
              value={this.state.roast}
            >
              <option value="" key="0" disabled>
                Roast
              </option>
              {roastOptions}
            </select>
          </div>
          <div className="bean-field">
            <label>Rating</label>
            <select
              onChange={this.handleChange}
              name="rating"
              value={this.state.rating}
            >
              <option value="0" key="0" disabled>
                Rating
              </option>
              {ratingOptions}
            </select>
          </div>
        </form>
        <button onClick={this.handleSubmit}>Add Bean</button>
      </div>
    );
  }
}
