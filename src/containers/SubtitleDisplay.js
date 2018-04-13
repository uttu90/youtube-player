import React, { Component } from 'react';
import { connect } from 'react-redux';

class Line extends Component {
  lineRef = React.createRef();
  render() {
    const { active, text } = this.props;
    return (
      <div
        ref={this.lineRef}
        style={{
          fontWeight: active ? 'bold' : 'normal'
        }}
        onClick={this.props.onClick}
      >
        {text}
      </div>
    )
  }

  componentDidUpdate(prevProps, prevState) {
    const { active: lastActive } = prevProps;
    const { active } = this.props;
    if (!lastActive && active) {
      this.lineRef.current.scrollIntoView({
        block: 'center',
        inline: 'center'
      });
    }
  }
}

class SubtitleDisplay extends Component {
  constructor(props) {
    super(props);

    this.onClickHandler = this.onClickHandler.bind(this);
  }

  render() {
    const { videoId, subtitles, currentTime, duration } = this.props;
    if (!videoId) return null;
    const subtitle = subtitles[videoId] || [];
    return (
      <div style={{height: 200, overflow: 'scroll'}}>
        {
          subtitle.map((line, index) => {
            const nextTime = !subtitle[index + 1] ? duration : subtitle[index + 1].time;
            return (
              <Line 
                key={index} 
                active={currentTime > line.time && currentTime < nextTime} 
                text={line.text}
                onClick={this.onClickHandler(line.time)}
              />
          )})
        }
      </div>
    );
  }

  onClickHandler(time) {
    const that = this;
    return function() {
      that.props.player.currentTime = time;
    }
  }
}

function mapStateToProps(state) {
  const { player: { videoId, currentTime, player, duration }, data: { subtitles } } = state;
  return {
    videoId,
    currentTime,
    subtitles,
    player,
    duration
  }
}

export default connect(mapStateToProps)(SubtitleDisplay);