export const idToString = (el) => {
  el._id = el._id.toString();
  if (el.user_id) {
    el.user_id = el.user_id.toString();
  }
  return el;
};
