import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './home.css';
import Header from '../Layout/Header/Header';
import { Container,Row,Col, Modal, Spinner } from 'react-bootstrap';
import Details from '../Layout/Modal/Details'

function Home(){
  const [latitude, setLatitude] = useState('');
  const [longitude, setlongitude] = useState('');
  const [latitudeError, setLatitudeError] = useState('');
  const [longitudeError, setLongitudeError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);

  // const handleOpen = () => {
  //   setShowModal(true)
  // }

  const handleClose = () => {
    setShowModal(false)
  }

  const handleChange = (e) => {
    const { value } = e.target;
    // Allow only numbers and a single decimal point
    if (/^\d*\.?\d*$/.test(value)) {
      setLatitude(value);
    }
  };

  const handleLongitude = (e) => {
    const { value } = e.target;
    if (/^\d*\.?\d*$/.test(value)) {
      setlongitude(value);
    }
  };

  const handleSubmit = async () => {
    if (latitude.trim() === '') {
      setLatitudeError('Latitude cannot be blank');
    }
    if (longitude.trim() === '') {
      setLongitudeError('Longitude cannot be blank');
    }
    if (latitude.trim() !== '' && longitude.trim() !== '') {
      setLoading(true);
      const API = 'https://api.openweathermap.org/data/2.5/weather'+'?lat='+latitude+'&lon='+longitude+'&appid='+process.env.REACT_APP_API_KEY;
      const response = await fetch(API);
      const data = await response.json();
      setWeatherData(data);
      setLoading(false);
      setShowModal(true); // Show modal if there are no errors
      // console.log(data);
    }
  };

  useEffect(() => {
    const errorTimeout = setTimeout(() => {
      setLatitudeError('');
      setLongitudeError('');
    }, 1000); // Set timeout to 2000 milliseconds (2 seconds)
    return () => clearTimeout(errorTimeout);
  }, [latitudeError, longitudeError]);


  return (
    <>
    <Header></Header>
    <Container className='h-100'>
      <Row className='h-100'>
        <Col className='d-flex align-items-center justify-content-center h-100'>
            <div className="contenir">
              <div className="input-wrapper">
                <input
                  type="text"
                  className="search"
                  id="search-inp"
                  placeholder="Latitude"
                  value={latitude}
                  onChange={handleChange}
                />
                {latitudeError && <div className="error-message">{latitudeError}</div>}
              </div>  
              <span className="pipe">|</span> {/* Pipe character */}
              <div className="input-wrapper">
                <input
                  type="text"
                  className="search"
                  id="search-inp"
                  placeholder="Longitude"
                  value={longitude}
                  onChange={handleLongitude}
                />
                {longitudeError && <div className="error-message">{longitudeError}</div>}
              </div>  
              <button className="search-btn" onClick={handleSubmit}  id="search-inp-btn">&#x027A4;</button>
            </div>
        </Col>
      </Row>
    </Container>
    {loading && <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
    </Spinner>}
    {showModal && <Details open={showModal} onClose={handleClose} data={weatherData} />}
    </>
  );
}

export default Home;