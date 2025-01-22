import React, { useState } from 'react';

const QrSubmit = ({ qrText, onClose, onSend }) => {
    const [parsedData, setParsedData] = useState(null);
    const [showModal, setShowModal] = useState(true);

    // Parse the QR code text
    const parseQrData = (text) => {
        if (!text) {
          return null;
        }
        const parts = text.split(';');
        if (parts.length !== 4) {
            return { error: "Invalid QR code format" };
        }
        const [name, surname, company, email] = parts;
        return { name, surname, company, email };
    };
    //close the modal
    const closeModal = () => {
      setShowModal(false);
        if (onClose) onClose();
    }


    // Handle the send logic
    const sendData = async () => {
      try{
          const response = await fetch('/api/submit', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(parsedData),
          });
        if (response.ok) {
            console.log("Data sent");
            closeModal();
        } else {
            console.error("Failed to submit:", response.statusText);
           // Handle errors, you may show an alert or an error message
        }
      } catch(error) {
        console.error("Error:", error)
        // Handle network error or api error
      }

    if(onSend) onSend(parsedData);
    };

    useState(()=> {
        const data = parseQrData(qrText);
        setParsedData(data)
    }, [qrText]);

   // Simplified Modal Style
    const modalStyle = {
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'white',
      padding: '20px',
      border: '1px solid #ccc',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
      zIndex: 1000,
    };

    const overlayStyle = {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
       zIndex: 999
    };

  if(!showModal) return null
  return (
     <>
      <div style={overlayStyle} onClick={closeModal}></div>
        <div style={modalStyle}>
            {parsedData && parsedData.error ? (
              <p>{parsedData.error}</p>
            ) : parsedData ? (
                <div>
                    <p>Name: {parsedData.name}</p>
                    <p>Surname: {parsedData.surname}</p>
                    <p>Company: {parsedData.company}</p>
                    <p>Email: {parsedData.email}</p>
                    <button onClick={sendData}>Send</button>
                  </div>
            ) : (
               <p>No data to show</p>
            )}
            <button onClick={closeModal}>Cancel</button>

        </div>
    </>
  );
};

export default QrSubmit;