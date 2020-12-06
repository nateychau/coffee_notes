import React from "react";
import * as API from "../../../util/api";
import { NoteIndexItem } from "./note_index_item";
import { Link } from "react-router-dom";
import { Header } from '../../header';

export class NoteIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
    }
  }

  componentDidMount() {
    API.getNotesByBeanId(this.props.match.params.id)
      .then((notes) => {
        this.setState({notes: notes.data});
      })
      .catch((err) => console.log(err));
  }

  render() {
    const notesList = this.state.notes.length ? this.state.notes.map((note, i) => {
      return <NoteIndexItem key={i} note={note} />
    }) : [];
    return (
      <div>
        <Header />
        <div className="notes-container"> 
          <Link to={`/beans/${this.props.match.params.id}`}>
            <div className="backButton"> go back </div>
          </Link>
          <div className="brewEntriesNotes"> Brew Entries </div>
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

