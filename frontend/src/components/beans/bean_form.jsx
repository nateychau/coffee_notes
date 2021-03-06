import React from "react";
import * as API from "../../util/api";
import { originArray, roastArray } from "../../util/coffee_ref";
import { Header } from "../../components/header";
import { BackButton } from "../back";
import { withRouter } from "react-router-dom";

const defaultState = {
  name: "",
  roaster: "",
  origin: "",
  roast: "",
  rating: 0,
  song: "",
};

class BeanFormComponent extends React.Component {
  constructor(props) {
    super(props);
    this.defaultState = this.props.bean ? 
    {...this.props.bean} : {...defaultState}
    this.state = this.defaultState; 
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleCancel(){
    this.setState({...this.defaultState});
    this.props.handleStopEditing();
  }

  handleSubmit() {
    const newBean = {
      userId: window.currentUser.id,
      name: this.state.name,
      roaster: this.state.roaster,
      origin: this.state.origin,
      roast: this.state.roast,
      rating: this.state.rating,
      song: this.state.song,
    };
    if(this.props.bean){
      newBean.id = this.props.bean._id
    }
    const formAction = this.props.bean ? 
    API.updateBean(newBean) : API.createNewBean(newBean);
    console.log(newBean);
    formAction
      .then((bean) => {
        // console.log(bean);
        if(this.props.bean){
          this.props.handleStopEditing();
        } else {
          this.setState({ ...defaultState });
          this.props.history.push('/');
        }
      })
      .catch((err) => console.log(err));
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

    const buttonText = this.props.bean ? 
    'Save' : 'Add Bean';

    return (
      <div className="static-detail">
        <Header />
        {!this.props.bean ? <BackButton /> : null}
        <div className="detail-card">
          <form>
            <div style={{  paddingTop: '20px', width: '75%'}}
              className="bean-field detail-text detail-text-left">
              <label>Name</label>
              <input
                onChange={this.handleChange}
                type="text"
                name="name"
                value={this.state.name}
              ></input>
            </div>
            <div className="bean-field detail-text detail-text-left">
              <label>Roaster</label>
              <input
                onChange={this.handleChange}
                type="text"
                name="roaster"
                value={this.state.roaster}
              ></input>
            </div>
            <div className="bean-field detail-text detail-text-left">
              <label>Place of Origin</label>
              <input
                onChange={this.handleChange}
                type="text"
                name="origin"
                value={this.state.origin}
              ></input>
            </div>
            <div className="bean-field detail-text detail-text-left">
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
            <div className="bean-field detail-text detail-text-left">
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
          { this.state.song ? (
            <div className="bean-field">
              <div 
                className="songContainer songCenter">
                <img 
                  className="songImage"
                  alt="album cover" src={`${this.state.song.album.images[0].url}`}
                  width="60"
                  height="60"
                  >
                </img>
                <div className="songText">
                  <div> {this.state.song.album.name} </div>
                  <div> {this.state.song.artists[0].name} </div>
                  <div> {this.state.song.name} </div>
                </div>
              </div>
            </div>
          ) : null }
          {
            this.props.bean ? 
            <button 
              className="cancelButton"
              onClick={this.handleCancel}>Cancel</button> : null
          }
          <button className="detail-btn-container" 
            onClick={this.handleSubmit}>
              {buttonText}
          </button>
        </div>
      </div>
    );
  }
}

export const BeanForm = withRouter(BeanFormComponent);