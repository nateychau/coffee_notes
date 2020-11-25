const Validator = require("validator");

module.exports = function validateCoffeeInput(data){
  let errors = {}; 

  // if (!Validator.isEmpty(data.date)) {
  //   errors.date = "Date is required";
  // }

  // if (!Validator.isDate(data.date)) {
  //   errors.date = "Date is invalid";
  // }

  // if (!Validator.isBefore(data.date, new Date())) {
  //   errors.date = "Date cannot be in the future";
  // }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
}