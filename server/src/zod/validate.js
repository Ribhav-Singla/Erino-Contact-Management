const z = require("zod");

const contactvalidateSchema = z.object({
  firstName: z.string().trim().min(1).max(50),
  lastName: z.string().trim().max(50).optional(),
  email: z.string().email().trim().max(50),
  phoneNumber: z.string().trim().length(10).regex(/^\d+$/),
  company: z.string().trim().min(1).max(50),
  jobTitle: z.string().trim().min(1).max(50),
});

module.exports = {
  contactvalidateSchema,
};
