import React, { Component } from 'react';
import { connect } from 'react-redux';

class SimpleControl extends Component {
  render() {
    const { currentTime, duration } = this.props;
    return (
      <div>
        <button onClick={this.playVideo.bind(this)}>Play</button>
        <button onClick={this.pauseVideo.bind(this)}>Pause</button>
        <button onClick={this.seek.bind(this)}>Seek</button>
        <button>{`${currentTime.toFixed(2)}:${duration.toFixed(2)}`}</button>
      </div>
    );
  }

  playVideo() {
    this.props.player.play()
  }

  pauseVideo() {
    this.props.player.pause();
  }

  seek() {
    this.props.player.currentTime = 30;
  }
}

function mapStateToProps(state) {
  const { playing, player, currentTime=0, duration=0 } = state.player;
  return {
    playing,
    player,
    currentTime,
    duration
  }
}

export default connect(mapStateToProps)(SimpleControl);