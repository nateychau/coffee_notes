import React from 'react';
import * as API from '../../util/api';
import { BackButton } from '../back';

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
      <div>
        <BackButton />
        <div>{this.state.bean.name}</div>
      </div>
    )
  }
}