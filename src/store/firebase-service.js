import * as firebase from "firebase";
// Required for side-effects
require("firebase/firestore");

var config = {
  apiKey: "AIzaSyCGBKMAPR3W6lNNTKPmA4iXva20WBYBZE0",
  authDomain: "swipeapp-c0671.firebaseapp.com",
  databaseURL: "https://swipeapp-c0671.firebaseio.com",
  projectId: "swipeapp-c0671",
  storageBucket: "swipeapp-c0671.appspot.com",
  messagingSenderId: "233600848634"
};

!firebase.apps.length && firebase.initializeApp(config);

const firestore = firebase.firestore();
const settings = { /* your settings... */ timestampsInSnapshots: true };
firestore.settings(settings);

export const getObjectId = _type => {
  debugger;
  let collection = firebase.firestore().collection(_type);
  let ref = collection.doc();
  return ref.id;
};
export const destroyObject = (_type, _id) => {
  debugger;
  let collection = firebase.firestore().collection(_type);
  return collection.doc(_id).delete();
};

export const createObject = (_type, _data) => {
  let collection = firebase.firestore().collection(_type);
  let ref = collection.doc();
  let entity = {
    ..._data,
    id: ref.id,
    created: new Date()
  };

  return ref
    .set(entity, { merge: true })
    .then(_data => {
      console.log("Document written/updated with ID: ", entity.id);
      return entity;
    })
    .catch(error => {
      console.error("Error adding document: ", error);
      return error;
    });
};

export const getAllWithQuery = (_type, _query) => {
  let entities = [];
  return firebase
    .firestore()
    .collection(_type)
    .where(_query[0], _query[1], _query[2])
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        entities.push({
          ...doc.data(),
          id: doc.id
        });
      });
      return entities;
    })
    .catch(error => {
      return error;
    });
};
export const getAll = _type => {
  let entities = [];
  return firebase
    .firestore()
    .collection(_type)
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        entities.push({
          ...doc.data(),
          id: doc.id
        });
      });
      return entities;
    })
    .catch(error => {
      return error;
    });
};
