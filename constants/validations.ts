export const signupValidations = {
  username: {
    message: "Username is invalid",
    min: 'Username must contain at least 3 characters',
    max: 'Username max characters are less than 50',
  },
  password: {
    message: "Password is invalid",
    min: 'Password must contain at least 6 characters',
    max: 'Password max characters are less than 50',
    regex: {
      value: ".*[A-Z].*",
      message: "Password must contain atleast one uppercase character."
    }
  },
  confirm: {
    message: "Passwords don't match",
    path: ["confirm"],
  }
}