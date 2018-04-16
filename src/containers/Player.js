import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { loadYoutubeSDK } from '../utils';
import { setPlayer, setPlay, setPause, setEnded, setTime, setDuration, setVideoId } from '../reducers/player';

const propsToContainerStyle = (props) => ({
  position: 'relative',
  width: props.width,
  height: props.height,
});

class Player extends Component {
  constructor(props) {
    super(props);

    this.state = {
      timeGetting: null,
      durationPolling: null
    }

    this.setPlayer = this.setPlayer.bind(this);
    this.onPlayerStateChange = this.onPlayerStateChange.bind(this);
    this.getTime = this.getTime.bind(this);
    this.onPlayerReady = this.onPlayerReady.bind(this);
    this.stopTiming = this.stopTiming.bind(this);
    this.pollDuration = this.pollDuration.bind(this);

    this.onPlay = this.onPlay.bind(this);
    this.onPause = this.onPause.bind(this);
    this.onEnded = this.onEnded.bind(this);
  }

  componentDidMount() {
    !window.YT && loadYoutubeSDK(this.setPlayer);
    this.props.setVideoId(this.props.videoId);
  }

  componentDidUpdate(prevProps, prevState) {
    const { videoId: prevId } = prevProps;
    const { videoId } = this.props;
    if (videoId !== prevId) {
      this.player.loadVideoById(videoId, 0, "large");
      this.setState({
        durationPolling: setInterval(this.pollDuration)
      });
      this.props.setVideoId(videoId);
    }
  }

  render() {
    const { width, height, children } = this.props;
    return (
      <div style={propsToContainerStyle({ width, height })}>
        <div id="player">
        </div>
        {
          children
        }
      </div>
    );
  }

  setPlayer(YT) {
    this.player = new YT.Player("player", {
      height: this.props.height,
      width: this.props.width,
      videoId: this.props.videoId,
      events: {
        "onReady": this.onPlayerReady,
        "onStateChange": this.onPlayerStateChange
      }
    });
  }

  getTime() {
    this.setState({
      timeGetting: requestAnimationFrame(this.getTime)
    })
    this.props.setTime(this.player.getCurrentTime());
  }

  pollDuration() {
    const duration = this.player.getDuration();
    if (isFinite(duration) && duration > 0) {
      this.props.setDuration(duration);
      clearInterval(this.state.durationPolling);
    }
  }

  onPlayerReady() {
    this.props.setDuration(this.player.getDuration());
    const that = this;
    // Make the player like the audio-player
    const player = {
      play() {
        that.player.playVideo()
      },
      pause() {
        that.player.pauseVideo()
      },
      get currentTime() {
        return that.player.getCurrentTime();
      },
      set currentTime(time) {
        that.player.seekTo(time);
      }
    }
    this.props.setPlayer(player);
  }

  stopTiming() {
    cancelAnimationFrame(this.state.timeGetting);
  }

  onPlayerStateChange() {
    const playerState = this.player.getPlayerState();
    switch (playerState) {
      case 0:
        return this.onEnded();
      case 1:
        return this.onPlay();
      case 2:
        return this.onPause();
      case 3:
        return this.stopTiming();
      case 5:
        return this.stopTiming();
      default:
        return;
    }
  }

  onPlay() {
    this.props.setPlay()
    this.getTime();
  }

  onPause() {
    this.props.setPause();
    this.stopTiming();
  }

  onEnded() {
    this.props.setEnded();
    this.stopTiming();
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setPlayer: compose(dispatch, setPlayer),
    setPlay: compose(dispatch, setPlay),
    setPause: compose(dispatch, setPause),
    setTime: compose(dispatch, setTime),
    setEnded: compose(dispatch, setEnded),
    setDuration: compose(dispatch, setDuration),
    setVideoId: compose(dispatch, setVideoId),
  }
}

Player.defaultProps = {
  height: 360,
  width: 640
}

export default connect(undefined, mapDispatchToProps)(Player);
