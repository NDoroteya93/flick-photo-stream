const Photostream = require('./../model');

const getPhotostreams = async () => {
  try {
    return await Photostream.find();
  } catch (err) {
    return err;
  }
};

const getPhotostream = async (id) => {
  try {
    return await Photostream.findOne({ _id: id });
  } catch (err) {
    return err;
  }
};

const createPhotostream = async (photostreamData, author='dory') => {
  try {
    const newPhotostream = new Photostream(photostreamData);
    // TODO! Get data from logged user
    newPhotostream.author = author;
    // newPhotostream.author_id  = author._id;
    return await newPhotostream.save();
  } catch (err) {
    console.log(err);
    return err;
  }
};

const deletePhotostream = async (id) => {
  try {
    return await Exoplanet.findOneAndRemove({ _id: id });
  } catch (err) {
    console.log(err);
    return err;
  }
};

module.exports = {
  getPhotostreams,
  getPhotostream,
  createPhotostream,
  deletePhotostream
};
