/* Pings API server to wake it up */
const wakeupServer = async () => {
  try {
    // Make the GET request
    const res= await fetch('/roster_api/wakeup');
    const data = await res.json()
    console.log(data)

    // Check if the request was successful
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
  } catch (error) {
    console.log('There was an error waking up the API server');
  }
};

export default wakeupServer;
