import React, { useRef, useState, useEffect } from 'react';
import QrScanner from 'qr-scanner';

const QrScan = ({ onScan, scanRegion, onClose, timeout = 60000 }) => {
	const video = useRef(null);
	const [qrScanner, setQrScanner] = useState(null);
	const [isScanning, setIsScanning] = useState(true);
	const [cameraError, setCameraError] = useState(null);
	const [timeLeft, setTimeLeft] = useState(timeout / 1000);

	const close = () => {
		if (qrScanner) {
			qrScanner.stop();
			qrScanner.destroy();
			setQrScanner(null);
		}
		setIsScanning(false);
		if (onClose) onClose();
	};

	const reopenScanner = () => {
		if (!isScanning){
			setIsScanning(true)
			setCameraError(null) // Clear any previous error
		}
	}

	useEffect(() => {
		let currentScanner = null;
		let timeoutId = null;
		let intervalId = null;

		if (video.current && isScanning) {
				//Start the countdown
			setTimeLeft(timeout / 1000)
			intervalId = setInterval(() => {
				setTimeLeft(prevTime => {
					if (prevTime <= 0 ) {
						clearInterval(intervalId)
						return 0;
					}
					return prevTime - 1;
				});
			}, 1000);


			timeoutId = setTimeout(() => {
				setIsScanning(false)
				if (currentScanner) {
					currentScanner.stop()
					currentScanner.destroy()
				}
				clearInterval(intervalId)
			}, timeout);

			currentScanner = new QrScanner(video.current, (result) => {
				clearTimeout(timeoutId)
				clearInterval(intervalId)
				onScan(result);
				close();
			}, {
				highlightScanRegion: true,
				scanRegion: scanRegion,
			});

			currentScanner.start().catch((e) => {
				clearTimeout(timeoutId)
				clearInterval(intervalId)
				setCameraError(`Error: ${e.message}`)
				setIsScanning(false)
			})
			setQrScanner(currentScanner);
		}

         return () => {
              clearTimeout(timeoutId);
              clearInterval(intervalId)
            if (currentScanner) {
                currentScanner.stop();
                currentScanner.destroy();
            }
         }

    }, [video.current, isScanning, timeout]);


    return (
		<div className="scanner-container" onClick={reopenScanner} >
			{isScanning ?
				<div className='scanner-frame-container'>
					<video ref={video} className='scanner-frame' />
					<div className='scanner-timer'>{timeLeft}</div>
				</div>
			:
				<div className='scanner-frame-container-off'> 
					{cameraError ? 
						<div> {cameraError} </div> 
						: <div className='tap-btn'> Tap to Scan </div>
					} 
				</div>
			}
        </div>
    );
};

export default QrScan;