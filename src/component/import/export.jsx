import React, { useRef } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const ExportDataToJson = () => {
  const fileInputRef = useRef(null);

  const exportData = async () => {
    try {
      const db = getFirestore();
      const tables = [
        { name: 'Participant', fileName: 'Participant.json' },
        { name: 'User', fileName: 'User.json' },
        { name: 'CreateQuiz', fileName: 'CreateQuiz.json' },
        { name: 'Quiz', fileName: 'Quiz.json' },
        { name: 'EventDetails', fileName: 'EventDetails.json' },
        { name: 'LivePoll', fileName: 'LivePoll.json' }
      ]; // Specify the collection names and corresponding file names
  
      for (const table of tables) {
        const querySnapshot = await getDocs(collection(db, table.name));
        const data = {};
  
        querySnapshot.forEach((doc) => {
          data[doc.id] = doc.data();
        });
  
        // Convert data to JSON string
        const jsonData = JSON.stringify(data, null, 2);
  
        // Create a Blob object with the JSON data
        const blob = new Blob([jsonData], { type: 'application/json' });
  
        // Generate a download URL for the Blob
        const downloadURL = URL.createObjectURL(blob);
  
        // Create a temporary link element to trigger the download
        const tempLink = document.createElement('a');
        tempLink.href = downloadURL;
        tempLink.download = table.fileName;
        tempLink.style.display = 'none';
  
        // Append the link element to the body
        document.body.appendChild(tempLink);
  
        // Simulate a click event to trigger the download
        tempLink.click();
  
        // Clean up the temporary link and URL object
        document.body.removeChild(tempLink);
        URL.revokeObjectURL(downloadURL);
  
        console.log(`Exported ${querySnapshot.size} documents from collection ${table.name}.`);
      }
    } catch (error) {
      console.error('Error exporting data:', error);
    }
  };
  

  return (
    <div>
      <button onClick={exportData}>Export Data</button>
      <input type="file" style={{ display: 'none' }} ref={fileInputRef} />
    </div>
  );
};

export default ExportDataToJson;



// to download a single table form db
// import React, { useRef } from 'react';
// import { getFirestore, collection, getDocs } from 'firebase/firestore';

// const ExportDataToJson = () => {
//   const fileInputRef = useRef(null);

//   const exportData = async () => {
//     try {
//       const collectionName = 'Participant'; // Specify the collection name
//       const db = getFirestore();

//       const querySnapshot = await getDocs(collection(db, collectionName));

//       const data = {};

//       querySnapshot.forEach((doc) => {
//         data[doc.id] = doc.data();
//       });

//       // Convert data to JSON string
//       const jsonData = JSON.stringify(data, null, 2);

//       // Create a Blob object with the JSON data
//       const blob = new Blob([jsonData], { type: 'application/json' });

//       // Generate a download URL for the Blob
//       const downloadURL = URL.createObjectURL(blob);

//       // Create a temporary link element to trigger the download
//       const tempLink = document.createElement('a');
//       tempLink.href = downloadURL;
//       tempLink.download = 'data.json';
//       tempLink.style.display = 'none';

//       // Append the link element to the body
//       document.body.appendChild(tempLink);

//       // Simulate a click event to trigger the download
//       tempLink.click();

//       // Clean up the temporary link and URL object
//       document.body.removeChild(tempLink);
//       URL.revokeObjectURL(downloadURL);

//       console.log(`Exported ${querySnapshot.size} documents from collection ${collectionName}.`);
//     } catch (error) {
//       console.error('Error exporting data:', error);
//     }
//   };

//   return (
//     <div>
//       <button onClick={exportData}>Export Data</button>
//       <input type="file" style={{ display: 'none' }} ref={fileInputRef} />
//     </div>
//   );
// };

// export default ExportDataToJson;