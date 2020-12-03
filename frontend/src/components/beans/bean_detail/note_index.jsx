import React from "react";
import * as API from "../../../util/api";
import { NoteIndexItem } from "./note_index_item";
// import { BackButton } from "../../back";
import { Link } from "react-router-dom";

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
        <Link to={`/beans/${this.props.match.params.id}`}>
          <div className="backButton"> go back </div>
          <br></br>
        </Link>
        <div className="notes-index">
          <ul className="notes-list">
            {notesList}
          </ul>
        </div>
      </div>
    );
  }
}

