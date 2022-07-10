 import * as types from './types'

// INITIALIZES CLOCK ON SERVER
export const serverRenderClock = () => (dispatch) =>
  dispatch({
    type: types.TICK,
    payload: { light: false, ts: Date.now() },
  })

// INITIALIZES CLOCK ON CLIENT
export const startClock = () => (dispatch) =>
  setInterval(() => {
    dispatch({ type: types.TICK, payload: { light: true, ts: Date.now() } })
  }, 1000)

// INCREMENT COUNTER BY 1
export const incrementCount = () => ({ type: types.INCREMENT })

// DECREMENT COUNTER BY 1
export const decrementCount = () => ({ type: types.DECREMENT })

// RESET COUNTER
export const resetCount = () => ({ type: types.RESET })

export const setNotification = (value) => ({ type: types.SETNOTIFICATION,value:value });
export const loadListUser = (value) => ({ type: types.UPDATE_LIST_USER,value:value })
export const showXND = (value) => ({ type: types.SHOW_XND,value:value })
export const searchProduct = (value) => ({ type: types.SEARCH_PRODUCT,value:value });
export const CountMessage = (value) => ({ type: types.COUNT_MESSAGE,value:value })



