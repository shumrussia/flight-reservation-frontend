import { React, useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import './styles/DisplayFlights.css';
import Button from '@mui/material/Button';
import { tableContainerStyle } from './styles/styles';

const DisplayFlights = () => {

  const [flights, setFlights] = useState([]);

  const params = useParams();

  useEffect(() => {
    axios.get(`http://localhost:8080/flightservices/flights?from=${params.from}` +
      `&to=${params.to}&date=${params.departureDate}`)
      .then(response => {
        setFlights(response.data);
      })
      .catch(error => {
        console.error('Error', error);
      });
  }, []);

  return (
      <TableContainer component={Paper} sx={tableContainerStyle}>
        <Table aria-label="table of flights">
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={5}><h2>Flights</h2></TableCell></TableRow>
            <TableRow>
              <TableCell align="center"><h3>Airlines</h3></TableCell>
              <TableCell align="center"><h3>Departure city</h3></TableCell>
              <TableCell align="center"><h3>Arrival city</h3></TableCell>
              <TableCell align="center" colSpan={2}><h3>Departure date and time</h3></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {flights.map((flight) => (
              <TableRow
                key={flight.id}>
                <TableCell align="center">{flight.operatingAirlines}</TableCell>
                <TableCell align="center">{flight.departureCity}</TableCell>
                <TableCell align="center">{flight.arrivalCity}</TableCell>
                <TableCell align="center">
                  {new Date(flight.estimatedDepartureTime).toLocaleString("en-US",
                    {
                      year: "numeric",
                      month: "long",
                      weekday: "long",
                      hour: "numeric",
                      minute: "numeric",
                    }
                  )}
                </TableCell>
                <TableCell align="center">
                  <Button variant="contained" href={`/passengerDetails/${flight.id}`}>Select</Button>
                </TableCell>
              </TableRow>))}
          </TableBody>
        </Table>
      </TableContainer>
  );
};

export default DisplayFlights;
