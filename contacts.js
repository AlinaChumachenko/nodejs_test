// const fs = require("fs").promises;
// const path = require("path");
// const { nanoid } = require("nanoid");

// const contactsPath = path.join(__dirname, "bd", "contacts.json");


// async function listContacts() {
//     const allContacts = await fs.readFile(contactsPath);
//     return JSON.parse(allContacts);
//     // console.log(data);
// };
// async function getContactById(contactId) {
//     const contacts = await listContacts();
//     const result = contacts.find((item) => item.id === contactId);
//     return result || null;
//   }
//   async function addContact(name, email, phone) {
//     const contacts = await listContacts();
//     const newContact = { id: nanoid(), name, email, phone };
//     contacts.push(newContact);
//     await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
//     return newContact;
//   }

//   async function removeContact(contactId) {
//     const contacts = await listContacts();
//     const index = contacts.findIndex((item) => item.id === contactId);
//     if (index === -1) {
//         return null;
//     }
//     const [result] = contacts.splice(index, 1);
//     await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
//     return result;
//     }

//   async function updateContactById(contactId, name, email, phone) {
//     const contacts = await listContacts();
//     const index = contacts.findIndex((item) => item.id === contactId);
//     if (index === -1) {
//         return null;
//     }
//     contacts[index] = { id: contactId, name, email, phone };
//     await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
//     return contacts[index];
//     }
  
 
  
  

// module.exports = {
//     listContacts,
//     getContactById,
//     addContact,
//     removeContact,
//     updateContactById
// }