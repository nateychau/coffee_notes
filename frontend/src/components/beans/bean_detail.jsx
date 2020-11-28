import React from 'react';
import * as API from '../../util/api';

export class BeanDetail extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      bean: null,
    }
  }

  componentDidMount(){
    API.getBeanById(this.props.match.params.id)
      .then((bean) => {
        this.setState({bean: bean.data});
      })
      .catch((err) => console.log(err));
  }

  render(){
    if (!this.state.bean) return null;

    return (
      <div>{this.state.bean.name}</div>
    )
  }
}