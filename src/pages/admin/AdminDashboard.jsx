import React, { useState } from 'react';
import { Container, Row, Col, Card, ButtonGroup, Button, Table, Form, Pagination} from 'react-bootstrap';
import 'chart.js/auto';
import { Line, Doughnut, Bar } from 'react-chartjs-2';
import { format, startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfYear, endOfYear } from 'date-fns';
import './Admin.css';


const AdminDashboard = () => {

  const [chartType, setChartType] = useState('daily'); // Default chart type is 'daily'

  // Sample data for the charts (replace with your actual data)
  const dailyChartData = {
    labels: ['12.00AM', '6:00AM', '12:00PM', '6:00PM', '12.00AM'],
    datasets: [
        {
          label: 'Order Shipped',
          data: [4, 2, 1, 2, 0, 1],
          backgroundColor: 'rgba(0, 150, 255, 0.1)',
          borderColor: 'rgba(0, 150, 255, 1)',
          borderWidth: 1,
          fill: true,
        },
        {
            label: 'Sales',
            data: [5, 0, 2, 2, 0, 1],
            backgroundColor: 'rgb(255, 0, 73, 0.1)',
            borderColor: 'rgba(255, 0, 109, 1)',
            borderWidth: 1,
            fill: true,
          },
      ],
  };

  const weeklyChartData = {
    labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
    datasets: [
        {
          label: 'Order Shipped',
          data: [10, 2, 10, 5, 20, 0, 15],
          backgroundColor: 'rgba(0, 150, 255, 0.1)',
          borderColor: 'rgba(0, 150, 255, 1)',
          borderWidth: 1,
          fill: true,
        },
        {
            label: 'Sales',
            data: [12, 20, 3, 5, 2, 3, 10],
            backgroundColor: 'rgb(255, 0, 73, 0.1)',
            borderColor: 'rgba(255, 0, 109, 1)',
            borderWidth: 1,
            fill: true,
          },
      ],
  };

  const monthlyChartData = {
    // Monthly chart data
    labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
    datasets: [
      {
        label: 'Sales',
        data: [12, 19, 3, 5, 2, 3, 10],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        fill: false,
      },
    ],
  };

  const annualChartData = {
    // Annual chart data
    labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
    datasets: [
      {
        label: 'Sales',
        data: [12, 19, 3, 5, 2, 3, 10],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        fill: false,
      },
    ],
  };

  const formatDate = (date) => {
    return format(date, 'MMM d');
  };

  const generateWeeklyLabels = () => {
    const today = new Date();
    const labels = [];

    for (let i = 31; i >= 0; i--) {
      const startDate = startOfWeek(today);
      startDate.setDate(startDate.getDate() - i * 7);
      const endDate = endOfWeek(startDate);
      labels.push(`${formatDate(startDate)} - ${formatDate(endDate)}`);
    }

    return labels;
  };

  const options = {
    scales: {
      x: {
        display: true,
      },
      y: {
        display: true,
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: true,
      },
    },
    elements: {
      point: {
        radius: 2, // Set the radius to 0 to remove the markers
      },
      line: {
        tension: 0.4, // Set the tension value to control the curve
      },
    },
  };

  const simpleoptions = {
    scales: {
      x: {
        display: false, // Hide the x-axis labels
      },
      y: {
        display: false, // Hide the y-axis labels
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        mode: 'index',
        intersect: false,
        callbacks: {
          title: function () {
            return ''; // Empty string to hide the tooltip title
          },
          label: function (context) {
            if (context.parsed.y !== null) {
              return context.parsed.y; // Display y-axis value as the tooltip label
            }
            return ''; // Empty string or alternative message for null values
          },
        },
      },
    },
    elements: {
      point: {
        radius: 0, // Set the radius to 0 to remove the markers
      },
      line: {
        tension: 0.5, // Set the tension value to control the curve
      },
    },
  };
  

  const handleChartTypeChange = (type) => {
    setChartType(type);
  };

  const getChartData = () => {
    switch (chartType) {
      case 'weekly':
        return weeklyChartData;
      case 'monthly':
        return monthlyChartData;
      case 'annual':
        return annualChartData;
      default:
        return dailyChartData;
    }
  };


  // dummy 1,2,3
  const chartData1 = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June','January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Sales',
        data: [2, 5, 3, 6, 8, 3, 7, 10, 7, 11, 14, 12],
        fill: true,
        backgroundColor: 'rgb(255, 0, 73, 0.1)',
        borderColor: 'rgba(255, 0, 109, 1)',
        borderWidth: 1,
      },
    ],
  };

  const doughnutdata1 = {
    labels: ['Total Vendor', 'Removed Vendor', 'Total Admin'],
    datasets: [
      {
        data: [300, 50, 100],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  const doughnutdata = {
    labels: ['Sales', 'Profit', 'Quantity Sold'],
    datasets: [
      {
        data: [80, 50, 90],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  const doughnutdata2 = {
    labels: ['Sales', 'Profit', 'Quantity Sold'],
    datasets: [
      {
        data: [8, 5, 3],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  const doughnutdata3 = {
    labels: ['Sales', 'Profit', 'Quantity Sold'],
    datasets: [
      {
        data: [4, 2, 10],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  const bardata = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Sales',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
      {
        label: 'Quantity Sold',
        data: [18, 2, 18, 9, 1, 4],
        backgroundColor: '#FF6384',
        borderColor: '#FF6384',
        borderWidth: 1,
      },
    ],
  };

  
  

  





  


  return (
    <div className='vendorpage'>
      <Container fluid>
        {/* <h2>Dashboard</h2> */}

        {/* 1st outer row */}
        <Row>
            {/* big graph */}
            <Col style={{ maxWidth: '50%', minWidth: '250px'}}>
              <Card className="shadow expandable-card" style={{ height: '310px'}}>
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <Card.Title>Vendor {`${chartType.charAt(0).toUpperCase() + chartType.slice(1)} Sales`}</Card.Title>
                    <ButtonGroup>
                      <Button variant="secondary" size="sm" onClick={() => handleChartTypeChange('daily')} active={chartType === 'daily'}>
                        Daily
                      </Button>
                      <Button variant="secondary" size="sm" onClick={() => handleChartTypeChange('weekly')} active={chartType === 'weekly'}>
                        Weekly
                      </Button>
                      <Button variant="secondary" size="sm" onClick={() => handleChartTypeChange('monthly')} active={chartType === 'monthly'}>
                        Monthly
                      </Button>
                      <Button variant="secondary" size="sm" onClick={() => handleChartTypeChange('annual')} active={chartType === 'annual'}>
                        Annual
                      </Button>
                    </ButtonGroup>
                  </div>
                  <Line data={getChartData()} options={options} height={245} width={650}/>
                </Card.Body>
              </Card>

            </Col>
            
            {/* small 3 graph in 3 row */}
            <Col style={{ maxWidth: '25%', minWidth: '250px'}}>
              {/* 1st row */}
              <Row>
                <Card className="shadow expandable-card" style={{ height: '95px', marginTop: '14px' }}>
                  <Card.Body style={{ display: 'flex', alignItems: 'center', padding: 0, position: 'relative' }}>
                    <div style={{ position: 'absolute', top: 10 }}>
                      <Card.Title>Average Vendor Sales</Card.Title>
                      <h6>RM29/month</h6>
                    </div>
                    <div style={{ flex: '1', display: 'flex', justifyContent: 'flex-end', zIndex: '1' }}>
                      <div style={{ maxWidth: '60%', minWidth: '50px'}}>
                        <Line data={chartData1} options={{ ...simpleoptions }} />
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Row>


              {/* 2nd row */}
              <Row>
                <Card className="shadow expandable-card" style={{ height: '95px', marginTop: '12px' }}>
                  <Card.Body style={{ display: 'flex', alignItems: 'center', padding: 0, position: 'relative' }}>
                    <div style={{ position: 'absolute', top: 10 }}>
                      <Card.Title>Average Shipped Item</Card.Title>
                      <h6>21/day</h6>
                    </div>
                    <div style={{ flex: '1', display: 'flex', justifyContent: 'flex-end', zIndex: '1' }}>
                    <div style={{ maxWidth: '60%', minWidth: '50px'}}>
                        <Line data={chartData1} options={{ ...simpleoptions }} />
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Row>


              {/* 3rd row */}
              <Row>
                <Card className="shadow expandable-card" style={{ height: '95px', marginTop: '13px' }}>
                  <Card.Body style={{ display: 'flex', alignItems: 'center', padding: 0, position: 'relative' }}>
                    <div style={{ position: 'absolute', top: 10 }}>
                      <Card.Title>Total Sales</Card.Title>
                      <h6>RM2514.30</h6>
                    </div>
                    <div style={{ flex: '1', display: 'flex', justifyContent: 'flex-end', zIndex: '1' }}>
                    <div style={{ maxWidth: '60%', minWidth: '50px'}}>
                        <Line data={chartData1} options={{ ...simpleoptions }} />
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Row>
            </Col>

            {/* data in right column */}
            <Col style={{ maxWidth: '25%', minWidth: '250px'}}>
              <Card className="shadow expandable-card" style={{ height: '310px'}}>
                  <Card.Body>
                    <div style={{ backgroundColor: 'lightblue', padding: '10px' }}>
                      <h6>Admin Faisal approved a vendor.</h6>
                      {/* <h6>Dummy Curve Line Graph 3</h6>
                      <h6>Dummy Curve Line Graph 3</h6> */}
                    </div>
                    <div style={{ flex: 2 }}>
                      <h6>MyShop4 request a vendor application.</h6>
                      <h6>ArtsGalleria request a vendor application.</h6>
                      <h6>KateTaki request a vendor application.</h6>
                    </div>
                  </Card.Body>
                </Card>
                {/* 1st row */}
                {/* <Row>

                </Row> */}

                {/* 2nd row */}
                {/* <Row>

                </Row> */}
            </Col>
        </Row>


        {/* 2nd outer row */}
        <Row>
            {/* 1st details */}
            <Col style={{ maxWidth: '37%'}}>
            <Card className="shadow expandable-card" style={{ height: '340px'}}>
                  <Card.Body>
                  <Card.Title>Vendor Application</Card.Title>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Business Username</th>
                    <th>Business Name</th>
                    <th>Comment</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>	MyShop4</td>
                    <td>MyEventOrgTrial</td>
                    <td>Information is clear.</td>
                    <td>Approved</td>
                  </tr>
                  <tr>
                    <td>ArtsGalleria</td>
                    <td>ArtsGalleria</td>
                    <td></td>
                    <td>Pending</td>
                  </tr>
                  <tr>
                    <td>KateTaki</td>
                    <td>KateTaki</td>
                    <td></td>
                    <td>Pending</td>
                  </tr>
                </tbody>
              </Table>
              </Card.Body>
                </Card>
            </Col>

            {/* 2nd details with graph */}
            <Col style={{ maxWidth: '25%'}}>
              <Card className="shadow  expandable-card" style={{ height: '340px'}}>
                  <Card.Body>
                    <Doughnut data={doughnutdata1} />
                  </Card.Body>
                </Card>
            </Col>

            {/* 3rd grapgh in 2 rows */}
            <Col style={{ marginTop: '14px', maxWidth: '37%'}}>
                {/* 1st row circle graph */}
                <Row>
                <Card className="shadow  expandable-card" style={{ height: '128px' }}>
                  <Card.Body style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Card.Title>Top Vendor Sales</Card.Title>
                  <div style={{ width: '20%' }}>
                      <Doughnut data={doughnutdata} />
                    </div>
                    <div style={{ width: '20%' }}>
                      <Doughnut data={doughnutdata2} />
                    </div>
                    <div style={{ width: '20%' }}>
                      <Doughnut data={doughnutdata3} />
                    </div>
                    {/* <div style={{ width: '20%' }}>
                      <Doughnut data={doughnutdata1} />
                    </div> */}
                    {/* <div style={{ width: '20%' }}>
                      <Doughnut data={doughnutdata3} />
                    </div> */}
                  </Card.Body>
                </Card>
                </Row>

                {/* 2nd row bar graph */}
                <Row>
                  <Card className="shadow expandable-card" style={{ height: '200px', marginTop: '12px'}}>
                    <Card.Body>
                      <Bar data={bardata} height={120}/>
                    </Card.Body>
                  </Card>
                </Row>
            </Col>
        </Row>
        </Container>
    </div>
  );
};

export default AdminDashboard;



// col-md-6 offset-md-3