const zod = require("zod");

const create = zod.object({
  first: zod.string(),
  last: zod.string(),
  username: zod.string(),
  password: zod.string().min(4),
  email: zod.string().email(),
  phno: zod.string(),
  address: zod.string(),
});

module.exports = {
  create,
};
