import { faker } from "@faker-js/faker";

const roles = ["Admin", "Student", "Instructor", "Contact Person"];

const users_data = [
  {
    id: 1,
    first_name: "admin",
    last_name: "admin",
    added_by: "admin admin",
    email: "admin",
    role: "Admin",
    date_added: faker.date.past().toISOString().split("T")[0],
  },
];

for (let i = 2; i <= 5; i++) {
  users_data.push({
    id: i,
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    email: faker.internet.email(),
    added_by: "admin admin",
    role: faker.helpers.arrayElement(roles),
    date_added: faker.date.past().toISOString().split("T")[0],
  });
}

console.log(users_data);
export default users_data;
