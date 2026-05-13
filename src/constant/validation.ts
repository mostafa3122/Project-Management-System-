export const VALIDATIONS = {
  email: {
    required: "Email is required",
    invalid: "Email is not valid",
    regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  seed: {
    required: "Seed is required",
    invalid: "Seed must be 4 digits",
    regex: /^\d{4}$/,
  },
  password: {
    required: "Password is required",
    invalid: "Password must contain uppercase, lowercase and number",
    regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
  },
confirmPassword:{
     required: "Password is required",
},
  username: {
    required: "Username is required",
    min: "Minimum 3 characters",
    max: "Maximum 20 characters",
    invalid: "Username must contain letters and end with numbers",
    regex: /^[a-zA-Z]+[0-9]+$/,
  },

  country: {
    required: "Country is required",
    invalid: "Only letters allowed",
    regex: /^[a-zA-Z\s]+$/,
  },

  phone: {
    required: "Phone number is required",
    invalid: "Enter valid Egyptian phone number",
    regex: /^01[0125][0-9]{8}$/,
  },
};
