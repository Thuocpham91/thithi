import { combineReducers } from 'redux'
import * as types from './types'

// COUNTER REDUCER
const counterReducer = (state = -1, { type, value }) => {
  switch (type) {
    case types.INCREMENT:
      return state + 1
    case types.DECREMENT:
      return state - 1
    case types.RESET:
      return 0
    case types.SETNOTIFICATION: {
      state = value;
      return state
    }

    default:
      return state
  }
}

const updateList = (listUser = -1,{ type, value }) => {
  switch (type) {
    case types.UPDATE_LIST_USER:
      return listUser + 1
    case types.DECREMENT:
      return listUser - 1
    case types.RESET:
      return 0


    default:
      return listUser
  }
}
const showXND = ( showXND = false, { type, value }) => {
  switch (type) {
 
    case types.SHOW_XND: {
      showXND = value;
      return showXND
    }
    default:
      return showXND
  }
}
const showProduct = ( showXND = -1, { type, value }) => {
  switch (type) {
 
    case types.SEARCH_PRODUCT: {
      showXND = value;
      return showXND
    }
    default:
      return showXND
  }
}


// INITIAL TIMER STATE
const initialTimerState = {
  lastUpdate: 0,
  light: false,
}

// TIMER REDUCER
const timerReducer = (state = initialTimerState, { type, payload }) => {
  switch (type) {
    case types.TICK:
      return {
        lastUpdate: payload.ts,
        light: !!payload.light,
      }
    default:
      return state
  }
}

// COMBINED REDUCERS
const reducers = {
  counter: counterReducer,
  timer: timerReducer,
  updateList: updateList,
  showXND:showXND,
  showProduct,
}

export default combineReducers(reducers)
