import React, { useState } from 'react';
import { Row, Col, Card, ButtonGroup, Button, ListGroup, Image } from 'react-bootstrap';
import 'chart.js/auto';
import { Line, Pie } from 'react-chartjs-2';
import { format, startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfYear, endOfYear } from 'date-fns';

const VendorDashboard = () => {
  const [chartType, setChartType] = useState('daily'); // Default chart type is 'daily'

  // Sample data for the charts (replace with your actual data)
  const dailyChartData = {
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

  const weeklyChartData = {
    // Weekly chart data
    labels: ['l', 'Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
    datasets: [
      {
        label: 'Sales',
        data: [111, 12, 19, 3, 5, 2, 3, 10],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        fill: false,
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

  // Top 5 best-selling products data
  const topProducts = [
    {
      id: 1,
      image: 'https://firebasestorage.googleapis.com/v0/b/module-2-p1.appspot.com/o/productimg%2FF7IO8jpjgGa9WZxKQTIH%2FfAvhAT8JBImMQzzqkwsG%2Fhk1.jpg?alt=media&token=3784d85e-2486-4fdf-969a-cb43161d8f86',
      title: 'Small Hand Towel (1 piece)',
      price: 1.50,
      totalSold: 5,
    },
    {
      id: 2,
      image: 'https://firebasestorage.googleapis.com/v0/b/module-2-p1.appspot.com/o/productimg%2FF7IO8jpjgGa9WZxKQTIH%2Fp6rlCCiViOG91FYBL6Xq%2Fft1.jpg?alt=media&token=d4e87342-64f1-4082-b6ad-472d709af291',
      title: 'Face Towel 100% Cotton 35*75cm Hotel Grade Towel Water Absorption Soft Cotton Face Towel',
      price: 4.50,
      totalSold: 3,
    },
    // Add more products as needed
  ];

  // Lifetime sales data
  const lifetimeSalesData = {
    labels: ['Completed', 'Canceled'],
    datasets: [
      {
        label: 'Lifetime Sales',
        data: [8, 0], // Replace with your actual data
        backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(192, 75, 75, 0.2)'], // Green and Red colors for completed and canceled orders respectively
        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(192, 75, 75, 1)'],
        borderWidth: 1,
        orders: 8,
        lifetimesales: 21.00,
      },
    ],
  };

  

  return (
    <div className='vendorpage'>
      <h1>Dashboard</h1>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>{`${chartType.charAt(0).toUpperCase() + chartType.slice(1)} Sales`}</Card.Title>
              <ButtonGroup className="mb-3">
                <Button variant="secondary" onClick={() => handleChartTypeChange('daily')} active={chartType === 'daily'}>
                  Daily
                </Button>
                <Button variant="secondary" onClick={() => handleChartTypeChange('weekly')} active={chartType === 'weekly'}>
                  Weekly
                </Button>
                <Button variant="secondary" onClick={() => handleChartTypeChange('monthly')} active={chartType === 'monthly'}>
                  Monthly
                </Button>
                <Button variant="secondary" onClick={() => handleChartTypeChange('annual')} active={chartType === 'annual'}>
                  Annual
                </Button>
              </ButtonGroup>
              <Line data={getChartData()} options={options} />
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <Card.Title>Top 5 Best-Selling Products</Card.Title>
              <ListGroup variant="flush">
                {topProducts.map((product) => (
                  <ListGroup.Item key={product.id}>
                    <Row>
                      <Col xs={3}>
                        <Image src={product.image} rounded fluid />
                      </Col>
                      <Col xs={9}>
                        <h6>{product.title}</h6>
                        <p>Price: RM{product.price}</p>
                        <p>Total Sold: {product.totalSold}</p>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Lifetime Sales</Card.Title>
              <ul className='bullet-list'>
                <li>{lifetimeSalesData.datasets[0].orders} orders</li>
                <li>RM{lifetimeSalesData.datasets[0].lifetimesales} lifetime sales</li>
                <li>{lifetimeSalesData.datasets[0].data[0]} of orders completed</li>
                <li>{lifetimeSalesData.datasets[0].data[1]} of orders cancelled</li>
              </ul>
              <Pie data={lifetimeSalesData} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          {/* <Card>
            <Card.Body>
              <Card.Title>Top 5 Best-Selling Products</Card.Title>
              <ListGroup variant="flush">
                {topProducts.map((product) => (
                  <ListGroup.Item key={product.id}>
                    <Row>
                      <Col xs={3}>
                        <Image src={product.image} rounded fluid />
                      </Col>
                      <Col xs={9}>
                        <h6>{product.title}</h6>
                        <p>Price: ${product.price}</p>
                        <p>Total Sold: {product.totalSold}</p>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card> */}
        </Col>
      </Row>
    </div>
  );
};

export default VendorDashboard;
