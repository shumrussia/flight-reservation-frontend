import logo from './logo.svg';
import './App.css';
import { Component } from 'react/cjs/react.development';
import { Route, Routes } from 'react-router-dom';
import FindFlights from './components/FindFlights';
import PassengerDetails from './components/PassengerDetails';
import DisplayFlights from './components/DisplayFlights';
import ConfirmReservation from './components/ConfirmReservation';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Routes>
          <Route exact path='/' element={<FindFlights />} />
          <Route exact path="/displayFlights/:from/:to/:departureDate" element={<DisplayFlights />} />
          <Route exact path='/passengerDetails/:flightId' element={<PassengerDetails />} />
          <Route exact path='/confirmReservation/:reservationId' element={<ConfirmReservation />} />
        </Routes>
      </div>
    );
  };
}

export default App;
