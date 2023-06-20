import React, { useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';

// Initialize Firebase
const firebaseConfig = {
  // Your Firebase config here
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const ImportDataFromJson = () => {
  useEffect(() => {
    const importData = async () => {
      try {
        // Read the JSON file
        const response = await fetch('firestore_data.json');
        const data = await response.json();

        // Import each document
        for (const collectionName in data) {
          const documents = data[collectionName];
          for (const documentId in documents) {
            const documentData = documents[documentId];
            const documentRef = db.collection(collectionName).doc(documentId);
            await documentRef.set(documentData);
          }
        }

        console.log('JSON import completed.');
      } catch (error) {
        console.error('Error importing data:', error);
      }
    };

    importData();
  }, []);

  return <div>Importing data from JSON...</div>;
};

export default ImportDataFromJson;
