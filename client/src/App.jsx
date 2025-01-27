import React, { useState } from 'react';
import './App.css';
import QrScan from './components/QrScan';
import QrSubmit from './components/QrSubmit';
import scanflowIcon from './assets/scanflow-icon.svg'
import Notification from './components/Notification';

function App() {
	const [isCameraOpen, setIsCameraOpen] = useState(true)
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [scanResult, setScanResult] = useState('')

	const [notification, setNotification] = useState("");
	const [showNotification, setShowNotification] = useState(false);



	// const [activeCity, setActiveCity] = useState('')

	const [placeOptions, setPlaceOptions] = useState([
		{ "value": "Lille.REX_Boulanger",  	"city": "Lille", "label": "REX Boulanger" },
		{ "value": "Lille.REX_Chronodrive", "city": "Lille", "label": "REX Chronodrive" },
		{ "value": "Lille.REX_Nhood", 		"city": "Lille", "label": "REX Nhood" },
		{ "value": "Lille.Corner_Green_IT", "city": "Lille", "label": "Corner Green IT" },
		{ "value": "Lille.Corner_Motio", 	"city": "Lille", "label": "Corner Motio" },
		{ "value": "Lille.Corner_UX_Design","city": "Lille", "label": "Corner UX Design" },
		{ "value": "Lille.Atelier_dbt",		"city": "Lille", "label": "Atelier dbt" },
		{ "value": "Lille.Atelier_Microsoft_Fabric", "city": "Lille", "label": "Atelier Microsoft Fabric" },
		{ "value": "Lille.Atelier_Editeur_Blueway",  "city": "Lille", "label": "Atelier Editeur Blueway" },
		{ "value": "Lille.Atelier_Editeur_DataGalaxy", "city": "Lille", "label": "Atelier Editeur DataGalaxy" },
		{ "value": "Lille.Atelier_Editeur_Qlik", 	 "city": "Lille", "label": "Atelier Editeur Qlik" },
		{ "value": "Lille.Autres", 			"city": "Lille", "label": "Autres" }
	])

	const [currentPlace, setCurrentPlace] = useState(placeOptions[0]);

    const handleClick = () => setIsCameraOpen(!isCameraOpen);

    const hookGetResultType = (x) => { 
		setScanResult(x.data)
		setIsSubmitting(true)
    }	

	const hookGetPlaceChange = (x) => setCurrentPlace(x);

	const hookGetNotification = (x) => {
		setNotification(x);
		setShowNotification(true);
	  
		setTimeout(() => {
		  setShowNotification(false);
		}, 2000);
	  };

    const handleCloseModal = () => {
		setIsSubmitting(false);
		setScanResult("");
    }

	  
  return (
    <div className="app-container">
		<div className="app-header" onClick={handleClick}>
			<div className='header-title-container'>
				<img src={scanflowIcon} alt="ScanFlow Icon" className='header-icon header-item' />
				<span className='header-item'>ScanFlow</span>
			</div>
		</div>

		
		{showNotification ? <Notification message={notification} showNotification={showNotification}/> : null}
        {scanResult && isSubmitting && (
          <QrSubmit
            qrText={scanResult}
            onClose={handleCloseModal}
			placeOptions = {placeOptions}
			currentPlace = {currentPlace}
			onPlaceChange={hookGetPlaceChange}
			onNotification={hookGetNotification}
          />
        )}

        <div className="app-content" >
          	{isCameraOpen? <QrScan onScan={hookGetResultType}/> : <></>}
        </div>
    </div>
  );
}

export default App;

