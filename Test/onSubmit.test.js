//Unit testing for submit button

const checkNullUserLogin = require("./checkNullUserLogin");

var testObject = { email: "dineth@gmail.com", password: "May@2022" };

test("Loging details checked successfully", () => {
  expect(checkNullUserLogin(testObject)).toBe("success");
});
