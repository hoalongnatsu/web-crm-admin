export const loading_by_action = (action) => {
  return (state) => state.loading[action]
}

export const loading_by_actions = (actions = []) => {
  return (state) => actions.some((action) => state.loading[action])
}
