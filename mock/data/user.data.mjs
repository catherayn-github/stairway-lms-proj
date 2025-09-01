import { faker } from "@faker-js/faker";

const roles = ["Admin", "Student", "Instructor", "Contact Person"];

const users_data = [
  {
    id: "1",
    first_name: "Admin",
    last_name: "Admin",
    added_by: "admin admin",
    email: "admin@gmail.com",
    role: "Admin",
    date_added: faker.date.past().toISOString().split("T")[0],
  },
];

for (let i = 2; i <= 500; i++) {
  users_data.push({
    id: i.toString(),
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    email: faker.internet.email(),
    added_by: "Admin Admin",
    role: faker.helpers.arrayElement(roles),
    date_added: faker.date.past().toISOString().split("T")[0],
  });
}

export default users_data;
