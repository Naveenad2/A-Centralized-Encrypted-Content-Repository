import React, { useState, useEffect  } from 'react';
import './css/ContentDetailsModal.css';
import sodium from 'libsodium-wrappers'; 
import axios from 'axios';

const ContentDetailsModal = ({ contentItem, onClose }) => {
  const [imageName, setImageName] = useState('');
  const [imageData, setImageData] = useState(null); 
  const [imageFile, setImageFile] = useState(null);
  const [imageDescription, setImageDescription] = useState('');

  useEffect(() => {
    if (contentItem.encrypted && contentItem.type === 'image') {
      // Fetch encrypted image data from the backend
      axios.get(`http://localhost:8080/api/content/${contentItem.id}`, {
        responseType: 'arraybuffer', // Request data as ArrayBuffer
      })
        .then(response => {
          setImageData(response.data); // Store encrypted image data
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
  }, [contentItem]);

  const handleImageFileChange = (event) => {
    const selectedFile = event.target.files[0];
  
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = async () => {
        await sodium.ready; // Wait for libsodium-wrappers to be ready
        const nonce = sodium.randombytes_buf(sodium.crypto_secretbox_NONCEBYTES);
        const key = sodium.crypto_secretbox_keygen();
  
        // Convert ArrayBuffer to UInt8Array
        const data = new Uint8Array(reader.result);
  
        const encryptedImageFile = sodium.crypto_secretbox_easy(data, nonce, key);
  
        setImageFile({
          nonce: nonce,
          key: key,
          encryptedData: encryptedImageFile,
        });
      };
      reader.readAsArrayBuffer(selectedFile);
    }
  };

  const handleDecryptImage = async () => {
    if (imageData) {
      await sodium.ready;
      const decryptedImage = sodium.crypto_secretbox_open_easy(imageData.encryptedData, imageData.nonce, imageData.key);

      // Create a blob from decrypted data to display image
      const decryptedBlob = new Blob([decryptedImage], { type: 'image/jpeg' });
      const imageUrl = URL.createObjectURL(decryptedBlob);

      // Set the decrypted image URL
      setImageData({ ...imageData, decryptedUrl: imageUrl });
    }
  };
  

  const handleSubmit = () => {
    // Prepare the data to be sent to the backend
    const requestData = {
      imageName: imageName,
      encryptedImageFile: imageFile,
      imageDescription: imageDescription,
    };

    // Send the data to the backend via POST request
    axios.post('http://localhost:8080/api/users/content', requestData, {
      headers: {
        'Content-Type': 'application/json',
      },
       withCredentials: true
      
    })
      .then((response) => {
        console.log(response.data); // Handle the response from the backend if needed
      })
      .catch((error) => {
        console.error('Error:', error);
      });

    // After handling the submission, you can close the modal
    onClose();
  };


  return (
    <div className="content-details-modal">

{imageData && imageData.decryptedUrl && (
        <div className="image-container">
          <img src={imageData.decryptedUrl} alt="Decrypted" />
          <button onClick={handleDecryptImage}>Decrypt Image</button>
        </div>
      )}
      <div className="modal-header">
        <h2>{contentItem.title} Details</h2>
        <button onClick={onClose}>Close</button>
      </div>
      <div className="modal-content">
        <label>
          Image Name:
          <input
            type="text"
            value={imageName}
            onChange={(e) => setImageName(e.target.value)}
          />
        </label>
        <label>
          Image File:
          <input type="file" onChange={handleImageFileChange} />
        </label>
        <label>
          Image Description:
          <textarea
            value={imageDescription}
            onChange={(e) => setImageDescription(e.target.value)}
          />
        </label>
        <button onClick={handleSubmit}>Save Details</button>
      </div>
    </div>
  );
};

export default ContentDetailsModal;
