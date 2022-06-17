import axios from "axios";

const DeleteBlock = ({ documentId }) => {
  const deleteTicket = async () => {
    const res = await axios.delete(
      `http://localhost:5000/tickets/${documentId}`
    );

    const success = res.status === 200;
    if (success) {
      window.location.reload();
    }
  };

  return (
    <div className="delete-block">
      <div className="delete-icon" onClick={deleteTicket}>
        ✖
      </div>
    </div>
  );
};

export default DeleteBlock;
