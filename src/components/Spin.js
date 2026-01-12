import React, { Component } from 'react'
import spinner from './Spinner@1x-1.0s-200px-200px.gif'
export class Spin extends Component {
  render() {
    return (
       <div className='text-center'>
        <img src={spinner} className="spinner"alt="spinner"></img>
      </div>
    )
  }
}

export default Spin
