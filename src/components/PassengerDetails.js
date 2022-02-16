import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import './styles/PassengerDetails.css'
import ListItem from '@mui/material/ListItem';
import Avatar from '@mui/material/Avatar';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import AirlinesIcon from '@mui/icons-material/Airlines';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import FlightIcon from '@mui/icons-material/Flight';
import TodaySharpIcon from '@mui/icons-material/TodaySharp';
import { listItemStyle, listItemAvatarStyle, listStyle, primaryProps, secondaryProps, flightDetailsListStyle } from './styles/styles';
import Stack from '@mui/material/Stack';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import PhoneIcon from '@mui/icons-material/Phone';
import BadgeIcon from '@mui/icons-material/Badge';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import DateRangeIcon from '@mui/icons-material/DateRange';
import NumbersIcon from '@mui/icons-material/Numbers';
import PasswordIcon from '@mui/icons-material/Password';
import Button from '@mui/material/Button';

const PassengerDetails = () => {

  const [details, setDetails] = useState({});
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [securityCode, setSecurityCode] = useState('');

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8080/flightservices/flights/${params.flightId}`)
      .then(response => {
        setDetails(response.data);
        console.log(details);
      })
      .catch(error => {
        console.error('Error', error);
      })
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      flightId: params.flightId,
      passengerFirstName: firstName,
      passengerLastName: lastName,
      passengerMiddleName: middleName,
      passengerEmail: email,
      passengerPhone: phone,
    }
    axios.post("http://localhost:8080/flightservices/reservations", data)
      .then(response => {
        navigate(`/confirmReservation/${response.data.id}`)
      })
      .catch()
  }


  return (
    <div>
      <Stack direction="row">
        <List sx={flightDetailsListStyle}>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <FlightIcon color='primary' fontSize='large'></FlightIcon>
              </Avatar>
            </ListItemAvatar>
            <p className='flight-details-label'>Flight details</p>
          </ListItem>
          <ListItem>
            <ListItemAvatar sx={listItemAvatarStyle}>
              <Avatar>
                <AirlinesIcon color='action' fontSize='small'></AirlinesIcon>
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Airline"
              secondary={details.operatingAirlines}
              sx={listItemStyle}
              primaryTypographyProps={primaryProps}
              secondaryTypographyProps={secondaryProps} />
          </ListItem>
          <ListItem>
            <ListItemAvatar sx={listItemAvatarStyle}>
              <Avatar>
                <FlightTakeoffIcon color='action' fontSize='small'></FlightTakeoffIcon>
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Departure city"
              secondary={details.departureCity}
              sx={listItemStyle}
              primaryTypographyProps={primaryProps}
              secondaryTypographyProps={secondaryProps} />
          </ListItem>
          <ListItem>
            <ListItemAvatar sx={listItemAvatarStyle}>
              <Avatar>
                <FlightLandIcon color='action' fontSize='small'></FlightLandIcon>
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Arrival city"
              secondary={details.arrivalCity}
              sx={listItemStyle}
              primaryTypographyProps={primaryProps}
              secondaryTypographyProps={secondaryProps} />
          </ListItem>
          <ListItem>
            <ListItemAvatar sx={listItemAvatarStyle}>
              <Avatar>
                <TodaySharpIcon color='action' fontSize='small'></TodaySharpIcon>
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Date and time of departure"
              secondary={new Date(details.estimatedDepartureTime).toLocaleString("en-US",
                {
                  year: "numeric",
                  month: "long",
                  weekday: "long",
                  hour: "numeric",
                  minute: "numeric",
                }
              )}
              sx={listItemStyle}
              primaryTypographyProps={primaryProps}
              secondaryTypographyProps={secondaryProps} />
          </ListItem>
        </List>
        <List sx={listStyle}>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <AccountCircleIcon color='primary' fontSize='large'></AccountCircleIcon>
              </Avatar>
            </ListItemAvatar>
            <p className='flight-details-label'>Passenger details</p>
          </ListItem>
          <Box component='form' sx={{ml:"5%", mr:"5%"}}>
            <Stack spacing={2}>
              <TextField name="passengerFirstName"
                onChange={(e) => setFirstName(e.target.value)}
                label="First name"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <BadgeIcon />
                    </InputAdornment>
                  ),
                }}>
              </TextField>
              <TextField name="passengerLastName"
                onChange={(e) => setLastName(e.target.value)}
                label="Last name"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <BadgeIcon />
                    </InputAdornment>
                  ),
                }}>
              </TextField>
              <TextField name="passengerMiddleName"
                onChange={(e) => setMiddleName(e.target.value)}
                label="Middle name"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <BadgeIcon />
                    </InputAdornment>
                  ),
                }}>
              </TextField>
              <TextField name="passengerEmail"
                onChange={(e) => setEmail(e.target.value)}
                label="Email"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AlternateEmailIcon />
                    </InputAdornment>
                  ),
                }}>
              </TextField>
              <TextField name="passengerPhone"
                onChange={(e) => setPhone(e.target.value)}
                label="Phone"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PhoneIcon />
                    </InputAdornment>
                  ),
                }}>
              </TextField>
            </Stack>
          </Box>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <CreditCardIcon color='primary' fontSize='large'></CreditCardIcon>
              </Avatar>
            </ListItemAvatar>
            <p className='flight-details-label'>Card details</p>
          </ListItem>
          <Box component='form' sx={{ml:"5%", mr:"5%"}}>
            <Stack spacing={2}>
              <TextField name="passengerCardNumber"
                onChange={(e) => setCardNumber(e.target.value)}
                label="Card number"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <NumbersIcon />
                    </InputAdornment>
                  ),
                }}>
              </TextField>
              <TextField name="passengerCardExpiryDate"
                onChange={(e) => setExpiryDate(e.target.value)}
                label="Card expiry date"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <DateRangeIcon />
                    </InputAdornment>
                  ),
                }}>
              </TextField>
              <TextField name="passengerCardSecurityCode"
                onChange={(e) => setSecurityCode(e.target.value)}
                label="CVV code"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PasswordIcon />
                    </InputAdornment>
                  ),
                }}>
              </TextField>
              <Button variant="contained" onClick={handleSubmit}>Confirm</Button>
            </Stack>
          </Box>
        </List>
      </Stack>
    </div>
  );
};

export default PassengerDetails;
