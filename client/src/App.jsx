import React, { useState } from 'react';
import './App.css';
import QrScan from './components/QrScan';
import QrSubmit from './components/QrSubmit';

function App() {
	const [isCameraOpen, setIsCameraOpen] = useState(true)
	const [isSubmitting, setIsSubmitting] = useState(false)
	// const [scanResult, setScanResult] = useState('"ALLIAUME"; "Aurore"; "aalliaume@nhood.com"; "Nhood"')
	const [scanResult, setScanResult] = useState('')

	const [placeOptions, setPlaceOptions] = useState([
		{ value: 'atelier_1',  label: 'Atelier 1' },
		{ value: 'atelier_2',  label: 'Atelier 2' },
		{ value: 'corner_1',   label: 'Corner 1' },
        { value: 'corner_2',   label: 'Corner 2' },
	])


	const [lastPlace, setLastPlace] = useState(placeOptions[0]);

    const handleClick = () => setIsCameraOpen(!isCameraOpen);

    const hookGetResultType = (x) => { 
		setScanResult(x.data)
		setIsSubmitting(true)
    }	

	const hookGetPlaceChange = (x) => setLastPlace(x);

    const handleCloseModal = () => {
		setIsSubmitting(false);
		setScanResult("");
    }

	  
  return (
    <div className="app-container">
		<div className="app-header" onClick={handleClick}>ScanFlow</div>
		
        {scanResult && isSubmitting && (
          <QrSubmit
            qrText={scanResult}
            onClose={handleCloseModal}
			placeOptions = {placeOptions}
			defaultPlace = {lastPlace}
			onPlaceChange={hookGetPlaceChange}
          />
        )}

        <div className="app-content" >
          	{isCameraOpen? <QrScan onScan={hookGetResultType}/> : <></>}
        </div>
    </div>
  );
}

export default App;

