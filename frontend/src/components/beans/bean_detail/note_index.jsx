import React from "react";
import * as API from "../../../util/api";
import { NoteIndexItem } from "./note_index_item";
import { Link, Route } from "react-router-dom";
import { Header } from '../../header';
import { NoteForm } from '../bean_detail/note_form';

export class NoteIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      beanId: '',
      emptyNotes: true
    };
    // this.handleDelete = this.handleDelete.bind(this);  
  }

  componentDidMount() {
    API.getNotesByBeanId(this.props.match.params.id)
      .then((notes) => {
        this.setState({notes: notes.data});
        this.setState({beanId: this.props.match.params.id})
        this.setState({emptyNotes: false});
      })
      .catch((err) => console.log(err));
  }

  handleDelete(note) {
    API.deleteNote(note._id)
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  }

  render() {
    const notesList = this.state.notes.length ? this.state.notes.map((note, i) => {
      return <NoteIndexItem 
        key={i} 
        note={note} 
        handleDelete={this.handleDelete} 
        handleEdit={this.handleEdit}
      />
    }) : [];
    return (
      <div className="note-index-page">
        <Header />
        <div className="notes-container"> 
          <Link to={`/beans/${this.props.match.params.id}`}>
            <div className="backButton"> go back </div>
          </Link>
          <div className="brewEntriesNotes"> Brew Entries </div>
          <Link 
            to={{
              pathname: "/notes/new",
              state: {
                beanId: this.state.beanId,
                emptyNotes: this.state.emptyNotes
              }  
            }}>
            <button className="addNewBrewEntry">
              <i className="fas fa-plus"></i>
            </button>
          </Link>
        </div>
        <div className="notes-index">
          <ul className="notes-list">
            {notesList}
          </ul>
        </div>
      </div>
    );
  }
}

