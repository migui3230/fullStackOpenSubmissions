const mongoose = require("mongoose");

const password = process.argv[2];
const name = process.argv[3]; // TODO: make this a string
const number = process.argv[4]; // TODO: make this a string
console.log(process.argv.length);

const Person = mongoose.model("Person", {
  name: String,
  number: String,
});

const saveEntryInDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://migui0323:${password}@cluster0.iu8kym5.mongodb.net/?retryWrites=true&w=majority`
    );

    await Person.create({
      name: name,
      number: number,
    });
    console.log(`Added ${name} number ${number} to phonebook`);
  } catch (error) {
    console.log(error);
  } finally {
    await mongoose.connection.close();
  }
};

const showAllEntries = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://migui0323:${password}@cluster0.iu8kym5.mongodb.net/?retryWrites=true&w=majority`
    );
    const persons = await Person.find({});
    console.log("phonebook:");
    persons.forEach((person) => {
      console.log(`${person.name} ${person.number}`);
    });
  } catch (error) {
    console.log(error);
  } finally {
    await mongoose.connection.close();
  }
};

const displayAllEntries = async () => {};

if (process.argv.length === 5) {
  saveEntryInDB();
}

if (process.argv.length === 3) {
  showAllEntries();
}
