import { useState, useEffect } from "react";
import { db } from "../../firebase";
import { collection, getDocs, query, where, doc, getDoc } from "firebase/firestore";
import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import NavbarComm from "../committeeNavbar/NavbarComm";

function GenerateAttendance() {
  const searchParams = new URLSearchParams(window.location.search);
  const eventId = searchParams.get("eventid");
  const userEmail = searchParams.get('email');
  const [users, setUsers] = useState([]);
  const [eventName, setEventName] = useState("");
  const [participantsExist, setParticipantsExist] = useState(true);
  useEffect(() => {
    const getEventDetails = async () => {
      const eventDocRef = doc(db, "EventDetails", eventId);
      const eventDoc = await getDoc(eventDocRef);
      if (eventDoc.exists()) {
        const eventData = eventDoc.data();
        setEventName(eventData.eventName);
      } else {
        console.log("Event ID does not exist");
      }
    };

    getEventDetails();
  }, [eventId]);

  useEffect(() => {
    const getUsers = async () => {
      const usersCollectionRef = collection(db, "Participant");
      const eventQuery = query(usersCollectionRef, where("eventID", "==", eventId));
      const data = await getDocs(eventQuery);
      const participants = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setUsers(participants);
      setParticipantsExist(participants.length > 0);
    };

    getUsers();
  }, [eventId]);

  const handleDownload = () => {
    const csv = [
      ["No", "Username", "Email", "Matric No", "Phone No", "Year of Study", "School"],
      ...users.map((user, index) => [
        index + 1,
        user.participantUsername,
        user.participantEmail,
        user.participantMatricNo,
        user.participantPhoneNo,
        user.participantYear,
        user.participantSchool,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const downloadLink = document.createElement("a");
    const blob = new Blob(["\ufeff", csv], { type: "text/csv;charset=utf-8" });
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = `${eventName}_attendance.csv`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div>
      <NavbarComm 
        eventId={eventId} 
        userEmail={userEmail}
      />
      <Link to={`/generatemain/?eventid=${eventId}&email=${encodeURIComponent(userEmail)}`}>
        <Button variant="outline-dark" style={{ marginTop: '10px', marginBottom: '5px', marginLeft:'30px', float: 'left' }}>
          Back
        </Button>
      </Link>
      {participantsExist ? (
      <div>
      <blockquote className="blockquote text-center">
        <h1 className="mb=0 mt-5">Participants' lists</h1>
        <footer>Below is the list of participants' attendance</footer>
      </blockquote>
        <div className="table-responsive" style={{ overflow: "scroll", maxHeight: "600px", marginInline: "30px" }}>
          <Table bordered hover striped>
            <thead className="thead-light">
              <tr>
                <th>No</th>
                <th>Username</th>
                <th>Email</th>
                <th>Matric No</th>
                <th>Phone No</th>
                <th>Year of Study</th>
                <th>School</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.id}>
                  <td>{index + 1}</td>
                  <td>{user.participantUsername}</td>
                  <td>{user.participantEmail}</td>
                  <td>{user.participantMatricNo}</td>
                  <td>{user.participantPhoneNo}</td>
                  <td>{user.participantYear}</td>
                  <td>{user.participantSchool}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        <div className="mb-5">
          <Button variant="primary" style={{ float: "right", marginRight: "30px" }} onClick={handleDownload}>
            Download as CSV
          </Button>
        </div>
        </div>
      ) : (
        <div className="text-center mt-5">
          <p>There are no participants filling the attendance yet.</p>
          <p>Please share the link with them to allow this functionality to work :)</p>
        </div>
      )}
      
    </div>
  );
}

export default GenerateAttendance;
