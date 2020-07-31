const Contact = require("../../models/ContactAppModal");

module.exports = {
  createContact: (args) => {
    return Contact.findOne({ title: args.contactInput.title })
      .then((contact) => {
        if (contact) {
          throw new Error("CONTACTO YA EXISTE");
        }

        const newContact = new Contact({
          title: args.contactInput.title,
          contact: args.contactInput.contact,
          type: args.contactInput.type,
        });
        return newContact.save();
      })
      .then((result) => {
        console.log(result);
        return { ...result._doc, _id: result._doc._id.toString() };
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  },
};
