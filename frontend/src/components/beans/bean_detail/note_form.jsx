import React from "react";
import * as API from "../../../util/api";
import { withRouter, Link } from "react-router-dom";

class NoteFormComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: "",
      brewMethod: "",
      time: "",
      ratio: "",
      notes: "",
      beanId: this.props.location.state.beanId,
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit() {
    const newNote = {
      userId: window.currentUser.id,
      beanId: this.state.beanId,
      brewMethod: this.state.brewMethod,
      ratio: this.state.ratio,
      time: this.state.time,
      date: this.state.date,
      notes: this.state.notes,
    }

    API.createNewNote(newNote)
      .then(() =>{
        console.log('new note successfully added')
      })
      .catch((err) => console.log(err));
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
            ></input>
          </div>
          <div className="note-field">
            <label>Brew Time</label>
            <input
              onChange={this.handleChange}
              type="text"
              name="time"
            ></input>
          </div>
          <div className="note-field">
            <label>Coffee to Water Ratio</label>
            <input
              onChange={this.handleChange}
              type="text"
              name="ratio"
            ></input>
          </div>
          <div className="note-field">
            <label>Notes</label>
            <input
              onChange={this.handleChange}
              type="text"
              name="notes"
            ></input>
          </div>
        </form>
        <button onClick={this.handleSubmit}> submit </button>
      </div>
    );
  }
}

export const NoteForm = withRouter(NoteFormComponent);