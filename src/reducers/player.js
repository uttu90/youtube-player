const SET_PLAYER = 'youtube-player/set-player';
const SET_PLAY = 'youtube-player/set-play';
const SET_PAUSE = 'youtube-player/set-pause';
const SET_ENDED = 'youtube-player/set-ended';
const SET_TIME = 'youtube-player/set-time';
const SET_DURATION = 'youtube-player/set-duration';
const SET_VIDEOID = 'youtube-player/set-videoid';

export function setPlayer(player) {
  return {
    type: SET_PLAYER,
    payload:  {
      player
    }
  }
}

export function setDuration(duration) {
  return {
    type: SET_DURATION,
    payload: {
      duration
    }
  }
}

export function setPlay() {
  return {
    type: SET_PLAY
  }
}

export function setPause() {
  return {
    type: SET_PAUSE
  }
}

export function setEnded() {
  return {
    type: SET_ENDED
  }
}

export function setTime(time) {
  return {
    type: SET_TIME,
    payload: {
      time
    }
  }
}

export function setVideoId(videoId) {
  return {
    type: SET_VIDEOID,
    payload: {
      videoId
    }
  }
}

export default function playerReducer(state={}, action) {
  switch (action.type) {
    case SET_PLAYER:
      return {
        ...state,
        player: action.payload.player
      };
    case SET_PLAY:
      return {
        ...state,
        playing: true,
        ended: false
      }
    case SET_PAUSE:
      return {
        ...state,
        playing: false
      }
    case SET_ENDED:
      return {
        ...state,
        playing: false,
        ended: true
      }
    case SET_TIME:
      return {
        ...state,
        currentTime: action.payload.time
      }
    case SET_DURATION:
      return {
        ...state,
        duration: action.payload.duration
      }
    case SET_VIDEOID:
      return {
        ...state,
        videoId: action.payload.videoId
      }
    default:
      return state;
  }
}