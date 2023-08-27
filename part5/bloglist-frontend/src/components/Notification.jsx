const Notification = ({ message }) => {

  return (
    <>
      {message && (
        <div className={`notification ${message?.error && "error"}`}>
          <h3>{message?.text}</h3>
        </div>
      )}
    </>
  );
};

export default Notification;
