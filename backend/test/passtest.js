const bcrypt = require('bcrypt');

const hashedPassword = "$2b$10$F8KuRMsusr0f41MAOrA2be/XPqnRbuEbvuy7thtWuR6LVjMDqVG8S";
const passwordToTest = "Me@456";

bcrypt.compare(passwordToTest, hashedPassword, (err, result) => {
    if (result) {
        console.log("Password matches the hash.");
    } else {
        console.log("Password does not match the hash.");
    }
});