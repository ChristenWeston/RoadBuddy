import * as c from './../actions/ActionTypes';

export default (state = {}, action) => {
  const { id } = action;
  // const { names, location, issue, id, formattedWaitTime, timeOpen } = action;
  switch (action.type) {
    
  case c.DELETE_TRIP:
    let newState = { ...state };
    delete newState[id];
    return newState;

    default:
      return state;
  }
};