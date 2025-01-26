import React, { useState } from 'react';
import Select from 'react-select'
import axios from 'axios';


const QrSubmit = ({qrText, placeOptions, defaultPlace, onClose, onPlaceChange }) => {
    const [parsedData, setParsedData] = useState(null);
    const [showModal, setShowModal] = useState(true);

    // Parse the QR code text
    const parseQrData = (text) => {
        if (!text) { return null;}
        const parts = text.split(';');
        if (parts.length <  4) {
            return { error: "Invalid QR code format" };
        }
        const [surname, name, email, company] = parts.slice(0, 4).map(str => {
            if(typeof str !== 'string') return str;
            return str.replace(/"/g, '').trim();
          });

        const data = { surname, name, email, company }
        data["qr_text"] = qrText
        data["scan_time"] = new Date().toISOString()
        return data
        
    };

    //close the modal
    const closeModal = () => {
        setShowModal(false);
        if (onClose) onClose();
    }

	// Handle the send logic
	const sendData = async () => {
		try{
            console.log("Post data:", parsedData);
			const response = await axios.post('/api/submit', parsedData)
            
			if (response.status == 200) {
                // console.log("Data successfuly sent")
				closeModal();
			} else {
				console.error("Failed to submit:", response.statusText);
			}
		} catch(error) {
			console.error("Error:", error)
		}
	};

    useState(()=> {
        const data = parseQrData(qrText);
        setParsedData(data)
    }, [qrText]);

    const handlePlaceChange = (place) => {
        onPlaceChange(place)
    }
   
	
	if(!showModal) return null
	    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <div className="modal-header">
                    <div className="modal-title">Résultats</div>
					<button className="modal-close-button" onClick={closeModal}>×</button>
                </div>

                <div className="modal-body">
                    {parsedData && parsedData.error ? (
                        <p>{parsedData.error}</p>
                    ) : parsedData ? (
                        <ul className="data-list">
                            <li className="data-item"><span className='data-item-key'>Name:</span> {parsedData.name}</li>
                            <li className="data-item"><span className='data-item-key'>Surname:</span> {parsedData.surname}</li>
                            <li className="data-item"><span className='data-item-key'>Company:</span> {parsedData.company}</li>
                            <li className="data-item"><span className='data-item-key'>Email:</span> {parsedData.email}</li>
                            <li className="data-item"><span className='data-item-key'>Scan time:</span> {parsedData.scan_time.slice(0,-5).replace("T", " ")}</li>
							<li className="data-item data-item-select">
                                <span className='data-item-key'>Place:</span>
                                <div className='place-select-container'>
							        <Select 
                                        menuPlacement='auto' 
                                        options={placeOptions} 
                                        defaultValue={defaultPlace}
                                        onChange={handlePlaceChange}
                                    />
                                </div>
                            </li>
                        </ul>
                    ) : (
						<p>Loading...</p>
					)}
                </div>
				<button className="modal-button-send" onClick={sendData}>Send</button>
            </div>
        </div>
    );
};

export default QrSubmit;