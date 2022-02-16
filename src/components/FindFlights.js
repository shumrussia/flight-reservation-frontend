import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Divider, Grid, Stack, TextField } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { DatePicker } from '@mui/lab';
import './styles/FindFlights.css'
import Button from '@mui/material/Button';

function FindFlights() {

    const validFilled = { error: false, helperText: '' };
    const invalidEmpty = { error: true, helperText: 'The field cannot be empty' };

    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [departureDate, setDepartureDate] = useState(new Date());
    const [fromError, setFromError] = useState(validFilled);
    const [toError, setToError] = useState(validFilled);
    const [dateError, setDateError] = useState(validFilled);


    var navigate = useNavigate();

    const clearAllInputFields = () => {
        Array.from(document.querySelectorAll('input')).forEach(
            input => (input.value = "")
        );
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!from) {
            setFromError(invalidEmpty);
        } else {
            setFromError(validFilled);
        }

        if (!to) {
            setToError(invalidEmpty);
        } else {
            setToError(validFilled);
        }

        const formattedDepartureDate = departureDate.toLocaleString("en-US",
        {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        }).replaceAll('/','-');

        // console.log(departureDate.toLocaleString("en-GB",
        //     {
        //         year: "numeric",
        //         month: "2-digit",
        //         day: "2-digit",
        //     }).replaceAll('/','-'));

        console.log(formattedDepartureDate);

        clearAllInputFields();
        navigate(`/displayFlights/${from}/${to}/${formattedDepartureDate}`);
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <div className='main-container'>
                <form>
                    <Box
                        sx={{
                            border: 1,
                            borderRadius: '7%',
                            borderColor: '#1565C0',
                            borderWidth: '2px'
                        }}>
                        <Stack spacing={2}
                            divider={<Divider orientation="horizontal" flexItem />}
                            alignItems="left"
                            margin={'10px'}>
                            <div className='header'>Find Flights:</div>
                            <TextField
                                {...fromError}
                                id="outlined-basic"
                                label="Departure city"
                                variant="outlined"
                                name="from"
                                onChange={(event) => setFrom(event.target.value)}
                                required
                            />
                            <TextField
                                {...toError}
                                id="outlined-basic"
                                label="Arrival city"
                                variant="outlined"
                                name="to"
                                onChange={(event) => setTo(event.target.value)}
                                required />
                            {/* Departure date: <input type="text"
                    name="departureDate"
                    onChange={(event) => setDepartureDate(event.target.value)} /> */}
                            {/* <DatePicker value={departureDate} onChange={setDepartureDate} /> */}
                            <DatePicker
                                inputFormat='MM-dd-yyyy'
                                mask="__-__-____"
                                label="Departure date"
                                onChange={(newValue) => {
                                    setDepartureDate(newValue);
                                }}
                                value={departureDate}
                                renderInput={(params) => <TextField {...params} />}
                            />
                            <div>
                                <Button variant="contained"
                                    color="primary"
                                    sx={{ width: '30%' }}
                                    type="submit"
                                    onClick={handleSubmit}>Search
                                </Button>
                            </div>
                        </Stack>
                    </Box>
                </form>
            </div>
        </LocalizationProvider>
    )
}

export default FindFlights;
