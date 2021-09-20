const errorCodes = {
  duplicateEmail: 'The provided email already exists',
  duplicateUsername: 'The provided username already exists',
  failedEdit: 'Failed edit attempt, please try again',
  failedFetch: 'Failed to fetch data',
  failedLogin: 'Failed login attempt, please try again',
  failedRegister: 'Failed to register the user, please try again',
  failedSubmit: 'Failed to submit the request',
  failedValidate: 'Failed to validate your token, please log in again',
  privateRoute: 'You need to log in to access this page',
  unauthorizedAccess:
    'Unauthorized access - make sure that you are logged in and are accessing a valid resource',
};

export default errorCodes;
