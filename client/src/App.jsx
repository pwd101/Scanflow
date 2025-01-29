import React, { useState } from 'react';
import './App.css';
import QrScan from './components/QrScan';
import QrSubmit from './components/QrSubmit';
import scanflowIcon from './assets/scanflow-icon.svg'
import DecideomLogo from './assets/decideom-tour-logo.jpg'
import Notification from './components/Notification';

function App() {
	const [isCameraOpen, setIsCameraOpen] = useState(true)
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [scanResult, setScanResult] = useState('')

	const [notification, setNotification] = useState("");
	const [showNotification, setShowNotification] = useState(false);



	// const [activeCity, setActiveCity] = useState('')

	const [placeOptions, setPlaceOptions] = useState([
		// places for Lille
		// { "value": "Lille.REX_Boulanger",  	"city": "Lille", "label": "REX Boulanger" },
		// { "value": "Lille.REX_Chronodrive", "city": "Lille", "label": "REX Chronodrive" },
		// { "value": "Lille.REX_Nhood", 		"city": "Lille", "label": "REX Nhood" },
		// { "value": "Lille.Corner_Green_IT", "city": "Lille", "label": "Corner Green IT" },
		// { "value": "Lille.Corner_Motio", 	"city": "Lille", "label": "Corner Motio" },
		// { "value": "Lille.Corner_UX_Design","city": "Lille", "label": "Corner UX Design" },
		// { "value": "Lille.Atelier_dbt",		"city": "Lille", "label": "Atelier dbt" },
		// { "value": "Lille.Atelier_Microsoft_Fabric", "city": "Lille", "label": "Atelier Microsoft Fabric" },
		// { "value": "Lille.Atelier_Editeur_Blueway",  "city": "Lille", "label": "Atelier Editeur Blueway" },
		// { "value": "Lille.Atelier_Editeur_DataGalaxy", "city": "Lille", "label": "Atelier Editeur DataGalaxy" },
		// { "value": "Lille.Atelier_Editeur_Qlik", 	 "city": "Lille", "label": "Atelier Editeur Qlik" },
		// { "value": "Lille.Autres", 			"city": "Lille", "label": "Autres" }

		// New Paris places
		{ "value": "Paris.REX_PMU", 				"city": "Paris", 	"label": "REX PMU" },
		{ "value": "Paris.REX_Animalis", 			"city": "Paris", 	"label": "REX Animalis" },
		{ "value": "Paris.REX_LVMH", 				"city": "Paris", 	"label": "REX LVMH" },
		{ "value": "Paris.Corner_Green_IT", 		"city": "Paris", 	"label": "Corner Green IT" },
		{ "value": "Paris.Corner_Motio", 			"city": "Paris", 	"label": "Corner Motio" },
		{ "value": "Paris.Corner_UX_Design",		"city": "Paris", 	"label": "Corner UX Design" },
		{ "value": "Paris.Corner_Odity", 			"city": "Paris", 	"label": "Corner Odity" },
		{ "value": "Paris.Atelier_IA_Chronodrive", 	"city": "Paris", 	"label": "Atelier IA Chronodrive" },
		{ "value": "Paris.Atelier_dbt",				"city": "Paris", 	"label": "Atelier dbt" },
		{ "value": "Paris.Atelier_Google", 			"city": "Paris", 	"label": "Atelier Google" },
		{ "value": "Paris.Atelier_Microsoft_Fabric","city": "Paris", 	"label": "Atelier Microsoft Fabric" },
		{ "value": "Paris.Atelier_Editeur_Blueway", "city": "Paris", 	"label": "Atelier Editeur Blueway" },
		{ "value": "Paris.Atelier_Editeur_DataGalaxy", "city": "Paris", "label": "Atelier Editeur DataGalaxy" },
		{ "value": "Paris.Atelier_Editeur_Qlik", 	 "city": "Paris",	"label": "Atelier Editeur Qlik" },
		{ "value": "Paris.Atelier_Editeur_Snowflake","city": "Paris",	"label": "Atelier Editeur Snowflake" },
		{ "value": "Paris.Autres", 					"city": "Paris", 	"label": "Autres" }
	])

	const [currentPlace, setCurrentPlace] = useState(placeOptions[0]);
    const handleClickHeader = () => window.location.reload();

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
		<div className="app-header" onClick={handleClickHeader}>
			<div className='header-title-container'>
				{/* <img src={scanflowIcon} alt="ScanFlow Icon" className='header-icon header-item' /> */}
				<span className='header-item'>ScanFlow</span>
				<img src={DecideomLogo} alt="Decideom Logo" className='header-icon header-item' />
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

