import { useState, useEffect } from "react";
import { db } from "../../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import NavbarComm from "../committeeNavbar/NavbarComm";

function GenerateCommittee() {
  const searchParams = new URLSearchParams(window.location.search);
  const eventId = searchParams.get("eventid");
  const userEmail = searchParams.get("email");
  const [committees, setCommittees] = useState([]);
  const [showCommitteeData, setShowCommitteeData] = useState(false);

  useEffect(() => {
    const getCommittees = async () => {
      console.log("Fetching committees...");
      const committeesCollectionRef = collection(db, "Committee");
      const eventQuery = query(committeesCollectionRef, where("committeeEvents", "array-contains", eventId));
      try {
        const data = await getDocs(eventQuery);
        const committeesData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        console.log("Fetched committees:", committeesData);
        setCommittees(committeesData);
        setShowCommitteeData(committeesData.length > 0);
      } catch (error) {
        console.error("Error fetching committees:", error);
      }console.log(committees);
    };

    getCommittees();
  }, [eventId]);

  const handleDownload = () => {
    const csv = [
      ["No", "Username", "Email", "Matric No", "Events"],
      ...committees.map((committee, index) => [
        index + 1,
        committee.committeeUsername,
        committee.committeeEmail,
        committee.committeeMatricNo
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const downloadLink = document.createElement("a");
    const blob = new Blob(["\ufeff", csv], { type: "text/csv;charset=utf-8" });
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = `${eventId}_attendance.csv`;
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
      {showCommitteeData ? (
      <div>
        <blockquote className="blockquote text-center">
          <h1 className="mb=0 mt-5">Committee's lists</h1>
          <footer>Below is the list of committee responsible</footer>
        </blockquote>
          <div className="table-responsive" style={{ overflow: "scroll", maxHeight: "600px", marginInline: "30px" }}>
            <Table bordered hover striped>
              <thead className="thead-light">
                <tr>
                  <th>No</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Matric No</th>
                </tr>
              </thead>
              <tbody>
                {committees.map((user, index) => (
                  <tr key={user.id}>
                    <td>{index + 1}</td>
                    <td>{user.committeeUsername}</td>
                    <td>{user.committeeEmail}</td>
                    <td>{user.committeeMatricNo}</td>
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
            <p>No committee data available for this event.</p>
            <p>Please add more committee in the event</p>
          </div>
        )}
    </div>
  );
}

export default GenerateCommittee;
