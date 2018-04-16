import React, { Component } from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from '../reducers';
import Player from '../containers/Player';

const propsToContainerStyle = (props) => ({
  display: 'flex',
  height: props.height
})

class YoutubeApp extends Component {
  constructor(props) {
    super(props);

    this.store = createStore(reducer);
  }
  render() {
    const { src, children, ...sizeProps } = this.props;
    const videoId = src.indexOf("=") >=0 ? src.split("=")[1] : src;
    const videoCover = [];
    const rightPane = [];
    const belowPane = [];
    React.Children.forEach(children, child => {
      switch (child.props.position) {
        case "cover":
          videoCover.push(child);
          break;
        case "right":
          rightPane.push(child);
          break;
        default:
          belowPane.push(child);
          break;
      }
    })
    return (
      <Provider store={this.store} >
        <div>
          <div style={propsToContainerStyle(this.props)}>
            <Player videoId={videoId} {...sizeProps}>
              {
                videoCover
              }
            </Player>
            {
              rightPane
            }
          </div>
          {
            belowPane
          }
        </div>
      </Provider>
    );
  }
}

export default YoutubeApp;