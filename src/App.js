import React, { Component } from 'react';
import YoutubeApp from './components/YoutubeApp';
import SimpleControl from './containers/SimpleControl';
import SubtitleEditor from './containers/SubtitleEditor';

const favours = [
  "https://www.youtube.com/watch?v=JGwWNGJdvx8",
  "https://www.youtube.com/watch?v=XRuDQ6aYeD0",
  "https://www.youtube.com/watch?v=cLPbBfpEAYg",
  "https://www.youtube.com/watch?v=1qqGaxTUPvA"
];

function getSource(){
  return favours[Math.floor(Math.random() * favours.length)];
}

class App extends Component {
  state = {
    src: getSource()
  }

  render() {
    return (
      <div>
        <YoutubeApp src={this.state.src} >
          <SimpleControl />
          <SubtitleEditor />
        </YoutubeApp>
        <button onClick={() => this.setState({
            src: getSource()
          })}
        >
          Change me
        </button>
      </div>
    );
  }
}

export default App;
