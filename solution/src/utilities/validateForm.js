export const validateForm = (newInputName, names) => {
  let error = '';

  if (!newInputName) {
    error = 'please enter a name';
  } else if (names.includes(newInputName)) {
    error = 'this name has already been taken';
  }

  return error;
};
