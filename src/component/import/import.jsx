import React from 'react';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebase';

const ImportDataFromJson = () => {
  const handleFileUpload = async (event) => {
    const files = event.target.files;

    for (const file of files) {
      const reader = new FileReader();

      reader.onload = async (e) => {
        try {
          const jsonData = JSON.parse(e.target.result);
          const collectionName = file.name.split('.json')[0]; // Extract the collection name from the file name

          await uploadDataToFirestore(collectionName, jsonData);

          console.log(`Successfully uploaded data to collection ${collectionName}`);
        } catch (error) {
          console.error('Error uploading data:', error);
        }
      };

      reader.readAsText(file);
    }
  };

  const uploadDataToFirestore = async (collectionName, data) => {
    const firestore = getFirestore();
    const collectionRef = collection(firestore, collectionName);

    for (const documentId in data) {
      await addDoc(collectionRef, {
        id: documentId,
        ...data[documentId]
      });
    }
  };

  return (
    <div>
      <input type="file" accept=".json" multiple onChange={handleFileUpload} />
      <button type="submit">Upload</button>
    </div>
  );
};

export default ImportDataFromJson;
