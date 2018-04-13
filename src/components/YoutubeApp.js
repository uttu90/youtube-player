import React, { Component } from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from '../reducers';
import Player from '../containers/Player';

class YoutubeApp extends Component {
  constructor(props) {
    super(props);

    this.store = createStore(reducer);
  }
  render() {
    const { src, children } = this.props;
    const videoId = src.indexOf("=") >=0 ? src.split("=")[1] : src;
    return (
      <Provider store={this.store} >
        <div>
          <Player videoId={videoId} />
          {
            children
          }
        </div>
      </Provider>
    );
  }
}

export default YoutubeApp;