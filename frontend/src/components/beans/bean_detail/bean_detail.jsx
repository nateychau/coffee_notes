import React from "react";
import * as API from "../../../util/api";
import { BackButton } from "../../back";
import { StaticDetail } from "./static_detail";
import { BeanForm } from "../bean_form";
// import { Header } from "../../header";

export class BeanDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      bean: null,
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleStopEditing = this.handleStopEditing.bind(this);
  }

  handleDelete() {
    API.deleteBean(this.state.bean._id)
      .then((res) => {
        this.props.history.push("/");
      })
      .catch((err) => console.log(err));
  }

  handleEdit() {
    this.setState({ editing: true });
  }

  handleStopEditing() {
    this.setState({ editing: false });
    API.getBeanById(this.props.match.params.id)
      .then((bean) => {
        this.setState({ bean: bean.data });
      })
      .catch((err) => console.log(err));
  }

  componentDidMount() {
    this.setState({ editing: false });
    API.getBeanById(this.props.match.params.id)
      .then((bean) => {
        this.setState({ bean: bean.data });
      })
      .catch((err) => console.log(err));
  }

  render() {
    if (!this.state.bean) return null;

    const component = this.state.editing ? (
      <BeanForm
        bean={this.state.bean}
        handleStopEditing={this.handleStopEditing}
      />
    ) : (
      <StaticDetail
        bean={this.state.bean}
        handleDelete={this.handleDelete}
        handleEdit={this.handleEdit}
      />
    );

    return <div>{component}</div>;
  }
}
