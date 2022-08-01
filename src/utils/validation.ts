export const validate = (value, inputType) => {
  let error = false;
  switch (inputType) {
    case 'email':
      error = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
      break;
    case 'phone':
      error = value.match(/^\+7[" "|-]?[0-9]{3}[" "|-]?[0-9]{3}[" "|-]?[0-9]{4}$/);
      break;
    case 'textarea':
      error = value
        .trimEnd()
        .trimStart()
        .match(/^.{10,300}$/);
      break;
    case 'name':
      error = value.match(/^[A-Z]{3,30}\s[A-Z]{3,30}$/);
      break;
  }
  return !error;
};
