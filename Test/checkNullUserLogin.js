// This function checks the login values are null or not

// if it is null, it returns fail status

function checkNullLogingDetails(variable) {
  if (variable.email && variable.password) {
    return "success";
  } else {
    return "fail";
  }
}

module.exports = checkNullLogingDetails;
