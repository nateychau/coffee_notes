import React from "react";
import * as API from "../../../util/api";
import { withRouter, Link } from "react-router-dom";
import { Header } from '../../header';

const defaultState = {
  brewMethod: "",
  time: "",
  ratio: "",
  notes: "",
  beanId: "",
  updatedAt: "",
}

const fixTimeStamp = (date) => {  
  let timeStamp = date;
  return timeStamp.slice(0,9);
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
    const newNote = {
      userId: window.currentUser.id,
      beanId: this.state.beanId,
      brewMethod: this.state.brewMethod,
      ratio: this.state.ratio,
      time: this.state.time,
      notes: this.state.notes,
    }
    if(this.props.location.state.note) {
      newNote.id = this.state._id;
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
    this.props.history.push(`/notes/bean/${this.state.beanId}`);
  }

  render() {
    return (
      <div>
        <Header />
        <div className="note-index-page">
          <Link
            to={`/notes/bean/${this.state.beanId}`}
          >
            <button>
              <i className="fas fa-angle-left"></i>
            </button>
          </Link>
          <div className="brewEntriesNotes"> Brew Entries </div>
          <button onClick={this.handleSubmit}> finished </button>
          <form>
            <div className="brew-entry-form">
              <div className="note-container">
                {/* <div className="note-wrapper">
                  <div className="note-item-header"> Date </div>
                  <div className="note-input-text timestamp">{fixTimeStamp(this.state.updatedAt)}</div>
                </div> */}
                <div className="note-wrapper">
                  <div className="note-item-header"> Brew Method </div>
                  <input
                    className="note-input-text"
                    onChange={this.handleChange}
                    type="text"
                    name="brewMethod"
                    value={this.state.brewMethod}
                  ></input>
                </div>   
                <div className="note-wrapper">
                  <div className="note-item-header"> Brew Time </div>
                  <input
                    className="note-input-text"
                    onChange={this.handleChange}
                    type="text"
                    name="time"
                    value={this.state.time}
                  ></input>
                </div>
                <div className="note-wrapper">
                  <div className="note-item-header"> Coffee to Water Ratio </div>
                  <input
                    className="note-input-text"
                    onChange={this.handleChange}
                    type="text"
                    name="ratio"
                    value={this.state.ratio}
                  ></input>
                </div>
                <div className="note-wrapper">
                  <div className="note-item-header"> Notes </div>
                  <input
                    onChange={this.handleChange}
                    className="note-input-text my-notes"
                    type="text"
                    name="notes"
                    value={this.state.notes}
                  ></input>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export const NoteForm = withRouter(NoteFormComponent);