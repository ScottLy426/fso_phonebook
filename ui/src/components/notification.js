const Notification = ({ error, newName }) => {
  if (error === "add") {
    return <div>Adding {newName}</div>;
  }
  if (error === "update") {
    return <div>Updating {newName}'s number</div>;
  }
  if (error === "updateFailed") {
    return <div>Update has failed</div>;
  }
  if (error === "removeError") {
    return <div>Remove Failed</div>;
  }
};

export default Notification;
