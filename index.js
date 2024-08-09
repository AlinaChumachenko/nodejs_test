const { listContacts, getContactById, addContact, removeContact } = require("./contacts");
const { Command } = require("commander");
const program = new Command();

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

// TODO: рефакторити
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const allContacts = await listContacts();
      return console.table(allContacts);
      break;

    case "get":
      const oneContact = await getContactById(id);
      return console.log(oneContact);
      break;

    case "add":
      const newContact = await addContact(name, email, phone);
      return console.log(newContact);
      break;

      case "remove":
        const deleteContact = await removeContact(id);
        return console.log(deleteContact);
        break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(options);