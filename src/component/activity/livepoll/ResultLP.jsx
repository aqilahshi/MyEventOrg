import React, { useState, useEffect } from 'react';
import { Container, Card } from 'react-bootstrap';
import { db } from '../../../firebase';
import { collection, query, where, getDocs, onSnapshot } from 'firebase/firestore';
import { Bar } from 'react-chartjs-2';
import NavbarPart from '../../participant/NavbarPart';

function ResultLP() {
  const searchParams = new URLSearchParams(window.location.search);
  const eventId = searchParams.get('eventid');
  const participantMatricNo = searchParams.get('matricno');
  const [liveQuestion, setLiveQuestion] = useState('');
  const [liveOption1, setLiveOption1] = useState('');
  const [liveOption2, setLiveOption2] = useState('');
  const [option1Count, setOption1Count] = useState(0);
  const [option2Count, setOption2Count] = useState(0);
  const [totalParticipants, setTotalParticipants] = useState(0);
  const [option1Percentage, setOption1Percentage] = useState(0);
  const [option2Percentage, setOption2Percentage] = useState(0);
  console.log('EventID: ', eventId);
  console.log('MatricNo: ', participantMatricNo);

  useEffect(() => {
    const fetchLivePollData = async () => {
      const pollCollectionRef = collection(db, 'LivePoll');
      const querySnapshot = await getDocs(query(pollCollectionRef, where('eventID', '==', eventId)));

      if (!querySnapshot.empty) {
        const docData = querySnapshot.docs[0].data();
        console.log('Live Question:', docData.liveQuestion);
        console.log('Live Option 1:', docData.liveOption1);
        console.log('Live Option 2:', docData.liveOption2);
        setLiveQuestion(docData.liveQuestion);
        setLiveOption1(docData.liveOption1);
        setLiveOption2(docData.liveOption2);
      }
    };

    fetchLivePollData();

    const participantCollectionRef = collection(db, 'Participant');
    //real-time updates onsnapshot func
    const unsubscribe = onSnapshot(
      query(participantCollectionRef, where('eventID', '==', eventId)),
      (snapshot) => {
        let countOption1 = 0;
        let countOption2 = 0;

        snapshot.forEach((doc) => {
          const data = doc.data();
          if (data.participantLiveOption === liveOption1) {
            countOption1++;
          } else if (data.participantLiveOption === liveOption2) {
            countOption2++;
          }
        });

        setOption1Count(countOption1);
        setOption2Count(countOption2);

        const totalCount = snapshot.size;
        setTotalParticipants(totalCount);

        const option1Percentage = totalCount > 0 ? (countOption1 / totalCount) * 100 : 0;
        const option2Percentage = totalCount > 0 ? (countOption2 / totalCount) * 100 : 0;

        setOption1Percentage(option1Percentage.toFixed(2));
        setOption2Percentage(option2Percentage.toFixed(2));

        console.log('Option 1 Count:', countOption1);
        console.log('Option 2 Count:', countOption2);
        console.log('Total Participants:', totalCount);
        console.log('Option 1 Percentage:', option1Percentage.toFixed(2));
        console.log('Option 2 Percentage:', option2Percentage.toFixed(2));
      }
    );

    return () => unsubscribe();
  }, [eventId, liveOption1, liveOption2]);

  return (
    <div>
    <NavbarPart 
      participantMatricNo={participantMatricNo}
      eventId={eventId}/>
    <Container className='mt-5 mb-5 mx-auto'>
      <Card>
        <Card.Body>
          <div>
            <h2>Live Poll Results</h2>
            <Card.Text>
              Question: {liveQuestion}
              <br />
            </Card.Text>
            {liveOption1 && liveOption2 && (
              <div>
                <Bar
                  style={{ height: '500px' }}
                  data={{
                    labels: [liveOption1, liveOption2],
                    datasets: [
                      {
                        label: 'Percentage',
                        data: [option1Percentage, option2Percentage],
                        backgroundColor: ['#36A2EB', '#FF6384'],
                        borderColor: ['#36A2EB', '#FF6384'],
                        borderWidth: 1,
                      },
                    ],
                  }}
                  options={{
                    indexAxis: 'x',
                    plugins: {
                      legend: {
                        display: false,
                      },
                    },
                    scales: {
                      x: {
                        grid: {
                          display: false,
                        },
                      },
                      y: {
                        beginAtZero: true,
                        max: 100,
                        grid: {
                          display: true,
                        },
                      },
                    },
                  }}
                />
                <div>
                  <p>Total Participants: {totalParticipants}</p>
                  <p>
                    {liveOption1}: {option1Count}/{totalParticipants} people ({option1Percentage}%)
                  </p>
                  <p>
                    {liveOption2}: {option2Count}/{totalParticipants} people ({option2Percentage}%)
                  </p>
                </div>
              </div>
            )}
          </div>
        </Card.Body>
      </Card>
    </Container>
    </div>
  );
}

export default ResultLP;
