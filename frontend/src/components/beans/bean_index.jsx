import React from "react";
import * as API from "../../util/api";
import { BeanIndexItem } from "./bean_index_item";
import { CurrentBeanItem } from "./current_bean";

export class BeanIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      beans: [],
    }
  }

  componentDidMount(){
    API.getUserBeans(window.currentUser.id)
      .then((beans) => {
        // console.log(beans);
        this.setState({beans: beans.data});
      })
      .catch((err) => console.log(err));
  }

  render() {
    const beanList = this.state.beans.length ? this.state.beans.map((bean, i) => {
      if(i === 0){
        return <CurrentBeanItem key={i} bean={bean}/>
      } else return <BeanIndexItem key={i} bean={bean} />
    }) : [];
    return (
      <div className="bean-index">
        <ul className="bean-list">
          {beanList}
        </ul>
      </div>
    );
  }
}
