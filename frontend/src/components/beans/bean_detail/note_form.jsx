import React from "react";
import * as API from "../../../util/api";
import { withRouter, Link } from "react-router-dom";

const defaultState = {
  brewMethod: "",
  time: "",
  ratio: "",
  notes: "",
  beanId: "",
}

class NoteFormComponent extends React.Component {
  constructor(props) {
    super(props);
    this.defaultState = this.props.location.state.note ?
    {...this.props.location.state.note} : {...defaultState}
    this.state = this.defaultState;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    if(this.props.location.state.beanId) {
      this.setState({beanId: this.props.location.state.beanId})
    }
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit() {

    console.log(this.state);

    const newNote = {
      userId: window.currentUser.id,
      beanId: this.state.beanId,
      brewMethod: this.state.brewMethod,
      ratio: this.state.ratio,
      time: this.state.time,
      notes: this.state.notes,
    }
    if(this.props.location.state.note) {
      API.updateNote(newNote)
      .then(() => {
        console.log('new note succesfully updated');
      })
      .catch((err) => console.log(err));
    } else {
      API.createNewNote(newNote)
        .then(() =>{
          console.log('new note successfully added');
        })
        .catch((err) => console.log(err));
    }
    // this.props.history.push(`/notes/bean/${this.state.beanId}`);
  }

  render() {
    return (
      <div>
        <Link
          to={`/notes/bean/${this.state.beanId}`}
        >
          <button>
            <i className="fas fa-angle-left"></i>
          </button>
        </Link>
        <form>        
          <div className="note-field">
            <label>Brew Method</label>
            <input
              onChange={this.handleChange}
              type="text"
              name="brewMethod"
              value={this.state.brewMethod}
            ></input>
          </div>
          <div className="note-field">
            <label>Brew Time</label>
            <input
              onChange={this.handleChange}
              type="text"
              name="time"
              value={this.state.time}
            ></input>
          </div>
          <div className="note-field">
            <label>Coffee to Water Ratio</label>
            <input
              onChange={this.handleChange}
              type="text"
              name="ratio"
              value={this.state.ratio}
            ></input>
          </div>
          <div className="note-field">
            <label>Notes</label>
            <input
              onChange={this.handleChange}
              type="text"
              name="notes"
              value={this.state.notes}
            ></input>
          </div>
        </form>
        <button onClick={this.handleSubmit}> submit </button>
      </div>
    );
  }
}

export const NoteForm = withRouter(NoteFormComponent);