const User = require("../model/user_model");

const home = async (req, res) => {
  try {
    res.status(200).send("home page");
  } catch (error) {
    console.log(error);
  }
};
const contact = async (req, res) => {
  try {
    const { name, mail, photo, title, time,city, date, count,cost,theater } = req.body;
    
    const userCreated = await User.create({
      name,
      mail,
      photo,
      title,
      time,
      city,
      date,
      count,
      cost,
      theater
    });
    res.status(200).json({ message: req.body });
  } catch (error) {
    console.log(error);
  }
};
module.exports = { home, contact };
