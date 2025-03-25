const randomNumder = () => {
  const random = Math.floor(Math.random() * 9000) + 1000; // Ensures 4-digit number between 1000-9999
  return random;
};

export default randomNumder;
