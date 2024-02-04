import React, { useState } from 'react';

const SeatBooking = () => {
  const [selectedMovie, setSelectedMovie] = useState('');
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [seatPrices] = useState({ AvengersEndGame: 200, ToyStory4: 150, Joker: 250,});
  const [bgClr, setBgClr] = useState("white");
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [seatsBooked, setSeatsBooked] = useState(false);

  const handleMovieChange = (event) => {
    const selectedMovieValue = event.target.value;
    setSelectedMovie(selectedMovieValue);
    setSelectedSeats([]); 
    setConfirmationMessage('');
    setSeatsBooked(false);
  };

  const handleSeatClick = (index) => {
    if (!seatsBooked) {
      const updatedSeats = [...selectedSeats];
      if (updatedSeats.includes(index)) {
        updatedSeats.splice(updatedSeats.indexOf(index), 1);
      } else {
        updatedSeats.push(index);
      }
      setSelectedSeats(updatedSeats);
  
      const numSelectedSeats = updatedSeats.length;
      const totalPrice = calculateTotalPrice(updatedSeats);
      setConfirmationMessage(`You have selected ${numSelectedSeats} seats for a total price of ${totalPrice}`);
      setBgClr('green'); 
    }
  };
  
  const isSeatBooked = (index) => {
    return seatsBooked && selectedSeats.includes(index);
  };
  const isSeatSelected = (index) => {
    return selectedSeats.includes(index);
  };


  const calculateTotalPrice = (seats) => {
    const seatPrice = seatPrices[selectedMovie];
    const totalPrice = seats.length * seatPrice;
    return totalPrice;
  };

  const handleBookClick = () => {
    const numSelectedSeats = selectedSeats.length;
    const totalPrice = calculateTotalPrice(selectedSeats);
    setConfirmationMessage(`You have selected ${numSelectedSeats} seats for a price of ${totalPrice}`);
    setSeatsBooked(true);
    setBgClr('rgb(82, 81, 81)'); 
  };

  return (
    <div className='App'>
      <div className='movie'>
        <label htmlFor="movieSelection"><span >SELECT A MOVIE:</span></label>
        <select id="movieSelection" onChange={handleMovieChange} value={selectedMovie}>
          <option value="" disabled>Select a movie</option>
          <option value="AvengersEndGame">Avengers End Game (200)</option>
          <option value="ToyStory4">Toy Story 4 (150)</option>
          <option value="Joker">Joker (250)</option>
        </select>
      </div>

      <div className='border'>
      <div className='border2'>
      <div className='box1'></div>
        <p className='na-box'>N/A</p>
        <div className='box2'></div>
        <p className='selected-box'>Selected</p>
        <div className='box3'></div>
        <p className='occupied-box'>Occupied</p>
      </div>
       
      </div>

      <div className='container'>
  {[...Array(48)].map((_, index) => (
    <React.Fragment key={index}>
      <input
        type="button"
        className={`box4 ${isSeatBooked(index) ? 'booked-seat' : ''}`}
        onClick={() => handleSeatClick(index)}
        style={{ backgroundColor: isSeatSelected(index) ? bgClr : 'white' }}
      />
      {index % 8 === 7 && <br />}
    </React.Fragment>
  ))}
</div>

      <p>{confirmationMessage}</p>

      <br />
      <button type="button" onClick={handleBookClick}>Book</button>
    </div>
  );
};

export default SeatBooking;
