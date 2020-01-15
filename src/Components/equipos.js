import React from 'react'
import { MDBBtn } from 'mdbreact'


class BadgesList extends React.Component {
  render() {
    return (
      <div >
        <ul>
          {this.props.badges.map(badge => {
            return (
              <li key={badge.id}>
               
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default BadgesList;