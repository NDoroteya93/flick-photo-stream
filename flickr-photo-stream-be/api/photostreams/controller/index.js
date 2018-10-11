const queries = require('./../query');

const getPhotostreams = async (req, res) => {
  try {
    // const author = req.user;
    const photostreams = await queries.getPhotostreams();
    res.json({ result: photostreams });
  } catch (err) {
    console.log(err);
    return err;
  }
};

const getPhotostream = async (req, res) => {
  try {
    // for authentication
    // const author = req.user;
    const id = req.params.id;
    const photostream = await queries.getPhotostream(id);
    res.json({ result: photostream });
  } catch (err) {
    return err;
  }
};

const postPhotostream = async (req, res) => {
  try {
    // const author = req.user;
    console.log(req.body.data);
    const photostream = req.body.data;
    const newPhotostream = await queries.createPhotostream(photostream);
    res.json({ message: 'Photostream created', result: newPhotostream });
  } catch (err) {
    console.log(err);
    return err;
  }
};

const deletePhotostream = async (req, res) => {
  try {
    const id = req.params.id;
    await queries.deletePhotostream(id);
    res.json({ message: 'Photostream deleted' });
  } catch (err) {
    console.log(err);
    return err;
  }
};

const getPhotostreamByTag = async (req, res) => { 
  try {

    if (req.query.tags) {
      const result = await queries.getPhotostreamByTag(term);
      res.json({ result });
    } 
  } catch (err) {
    console.log(err);
    return err;
  }
}

module.exports = {
  getPhotostreams,
  getPhotostream,
  postPhotostream,
  deletePhotostream, 
  getPhotostreamByTag
};
