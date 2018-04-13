const ADD_LINE = 'subtitle/add-line';
const EDIT_LINE = 'subtitle/edit-line';
const REMOVE_LINE = 'subtitle/remove-line';

export function addLine(videoId, { time, text }) {
  return {
    type: ADD_LINE,
    meta: videoId,
    payload: {
      time, 
      text
    }
  }
}

export function editLine(videoId, lineIndex, { time, text }) {
  return {
    type: EDIT_LINE,
    meta: videoId,
    payload: {
      time, 
      text,
      lineIndex
    }
  }
}

export function removeLine(videoId, lineIndex) {
  return {
    type: REMOVE_LINE,
    meta: videoId,
    payload: {
      lineIndex
    }
  }
}

function addLineHelper( videoSubtitle, data ) {
  if (!videoSubtitle) return [ data ];
  return [
    ...videoSubtitle,
    data
  ]
}

function editLineHelper( videoSubtitle, data ) {
  const { lineIndex, ...content } = data;
  return videoSubtitle.map((line, index) => {
    if (index !== lineIndex) return line;
    return {
      ...line,
      ...content
    }
  })
}

function removeLineHelper( videoSubtitle, data) {
  const { lineIndex } = data;
  return videoSubtitle.filter((line, index) => index !== lineIndex)
}

export default function subtitleReducer(state={}, action) {
  let videoId = undefined;
  if (action && action.meta) videoId = action.meta;
  switch (action.type) {
    case ADD_LINE:
      return {
        ...state,
        [videoId]: addLineHelper(state[videoId], action.payload)
      };
    case EDIT_LINE:
      return {
        ...state,
        [videoId]: editLineHelper(state[videoId], action.payload)
      }
    case REMOVE_LINE:
      return {
        ...state,
        [videoId]: removeLineHelper(state[videoId], action.payload)
      }
    default:
      return state;
  }
}