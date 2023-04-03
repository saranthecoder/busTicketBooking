const { User } = require("../schemas/SCHEMA");
const Joi = require("joi");

// Define a schema for the output data
const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(30),
});

/*

creating user

*/

const createUser = async (req, res) => {
  try {
    const result = schema.validate(req.body);
    if (result.error) {
      console.log(result.error);
      res.send(result.error.details[0].message);
      return;
    }

    const user = await User.create(req.body);
    res.json({ messege: "User is created Succesfully" });
    console.log("User is created Succesfully");
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  createUser,
};
