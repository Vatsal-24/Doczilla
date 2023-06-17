const Document = require("../models/documentModel");

exports.getDocument = async (id) => {
  if (id === null) return;
  const document = await Document.findById(id);
  if (document) return document;
  return await Document.create({ _id: id, data: "" });
};

exports.updateDocument = async (id, data) => {
  return await Document.findByIdAndUpdate(id, { data });
};
