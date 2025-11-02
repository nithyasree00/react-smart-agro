const Customer = require("../models/Customer");
const Seller = require("../models/Farmer");
const Admin = require("../models/Admin");
const Delivery = require("../models/Delivery");
const bcrypt = require("bcryptjs");

const models = {
  customer: Customer,
  farmer: Farmer,
  admin: Admin,
  delivery: Delivery
};
