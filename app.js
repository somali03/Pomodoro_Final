const bells = new Audio('./sounds/bell.wav'); 
const startBtn = document.querySelector('.btn-start'); 
const session = document.querySelector('.minutes'); 
let myInterval; 
let state = true;
let totalSeconds;  // Declare totalSeconds globally to access in updateSeconds

const appTimer = () => {
  const sessionAmount = Number.parseInt(session.textContent);
  
  if(state) {
    state = false;
    totalSeconds = sessionAmount * 60;  // Initialize totalSeconds here
  
    const updateSeconds = () => {
      const minuteDiv = document.querySelector('.minutes');
      const secondDiv = document.querySelector('.seconds');
  
      totalSeconds--;  // Decrease the total seconds
  
      let minutesLeft = Math.floor(totalSeconds / 60);
      let secondsLeft = totalSeconds % 60;
  
      // Ensure seconds display as two digits
      if(secondsLeft < 10) {
        secondDiv.textContent = '0' + secondsLeft;
      } else {
        secondDiv.textContent = secondsLeft;
      }
  
      minuteDiv.textContent = `${minutesLeft}`;
  
      // Check if timer has reached 0 and stop the interval
      if(minutesLeft === 0 && secondsLeft === 0) {
        bells.play();
        clearInterval(myInterval);  // Stop the interval
        state = true;  // Reset state to allow starting a new session
      }
    }
    
    // Start the interval to update seconds every 1 second
    myInterval = setInterval(updateSeconds, 1000);
  } else {
    alert('Session has already started.');
  }
}

startBtn.addEventListener('click', appTimer);
