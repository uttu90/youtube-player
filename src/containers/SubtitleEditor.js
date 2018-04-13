import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { addLine, editLine, removeLine } from '../reducers/plugin-states/subtitle';

class SubtitleEditor extends Component {
  constructor(props) {
    super(props);

    this.add = this.add.bind(this);
  }
  
  render() {
    const { subtitles, videoId } = this.props;
    if (!videoId) return null;
    const subtitle = subtitles[videoId] || [];
    return (
      <div>
        <button onClick={this.add.bind(this)}>click me to add subtitle</button>
        <ul>
        {
          subtitle.map(({ time, text }, index) => (
            <li key={index}>{`${time.toFixed(2)} : ${text}`}</li>
          ))
        }
        </ul>
      </div>
    );
  }

  add() {
    const { player, addLine, videoId } = this.props;
    addLine(videoId, { time: player.currentTime, text: `Subtitle at ${player.currentTime}`});
  }
}

function mapStateToProps(state) {
  const { player: { player, videoId }, data: { subtitles } } = state;
  return {
    player,
    subtitles,
    videoId
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addLine: compose(dispatch, addLine),
    editLine: compose(dispatch, editLine),
    removeLine: compose(dispatch, removeLine)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubtitleEditor);