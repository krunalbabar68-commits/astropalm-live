import React, { useRef, useState, useEffect } from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import { t } from '../../../data/translations';
import { resizeImage, fileToBase64 } from '../../../utils/imageUtils';
import Button from '../../common/Button';
import './ImageUploader.css';

const ImageUploader = ({ onImageSelected, isProcessing = false }) => {
  const { language } = useLanguage();
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [error, setError] = useState(null);
  const videoRef = useRef(null);
  const galleryInputRef = useRef(null);
  const [stream, setStream] = useState(null);

  // SVG Icons
  const CameraIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
      <circle cx="12" cy="13" r="4"/>
    </svg>
  );

  const GalleryIcon = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
      <circle cx="8.5" cy="8.5" r="1.5"/>
      <polyline points="21 15 16 10 5 21"/>
    </svg>
  );

  // 📸 Camera Logic with Black Screen Fix
  const startCamera = async () => {
    try {
      setError(null);
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { 
          facingMode: "environment",
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      });

      setStream(mediaStream);
      setIsCameraOpen(true);

      // Flashlight (Torch) Logic
      const track = mediaStream.getVideoTracks()[0];
      const capabilities = track.getCapabilities();
      if (capabilities.torch) {
        setTimeout(async () => {
          try {
            await track.applyConstraints({ advanced: [{ torch: true }] });
          } catch (e) { console.error("Torch error", e); }
        }, 500);
      }
    } catch (err) {
      setError("Camera access denied or not supported.");
    }
  };

  // Explicitly play video when stream is ready to prevent black screen
  useEffect(() => {
    if (isCameraOpen && stream && videoRef.current) {
      videoRef.current.srcObject = stream;
      videoRef.current.play().catch(e => console.error("Play error", e));
    }
  }, [isCameraOpen, stream]);

  const capturePhoto = async () => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const base64 = canvas.toDataURL('image/jpeg', 0.9);
    const resized = await resizeImage(base64);
    
    if (stream) stream.getTracks().forEach(t => t.stop());
    setStream(null);
    setIsCameraOpen(false);
    onImageSelected(resized);
  };

  const handleGalleryChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const base64 = await fileToBase64(file);
      const resized = await resizeImage(base64);
      onImageSelected(resized);
    }
  };

  useEffect(() => {
    return () => { if (stream) stream.getTracks().forEach(t => t.stop()); };
  }, [stream]);

  return (
    <div className="image-uploader">
      <input ref={galleryInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleGalleryChange} />

      {!isCameraOpen ? (
        <>
          {/* ✅ Restored Original Gallery Box Design */}
          <div className="upload-zone" onClick={() => galleryInputRef.current.click()}>
            <div className="upload-content">
              <div className="upload-icon-circle">
                <GalleryIcon />
              </div>
              <h3 className="upload-title">{t('uploadGallery', language, 'Upload from Gallery')}</h3>
              <p className="upload-subtitle">{t('tapOrDrag', language, 'Select a clear palm photo')}</p>
            </div>
          </div>

          <div className="upload-actions" style={{ marginTop: '16px' }}>
            <Button variant="primary" size="lg" fullWidth onClick={startCamera} loading={isProcessing} icon={<CameraIcon />}>
              {t('takePhoto', language, 'Take Photo with Flash')}
            </Button>
          </div>
        </>
      ) : (
        <div className="camera-preview-mode animate-fade-in">
          <div className="preview-window">
            <video 
              ref={videoRef} 
              autoPlay 
              playsInline 
              muted 
              className="live-video" 
            />
            <div className="camera-overlay-ui">
               {/* Circle/Face outline removed as requested */}
            </div>
          </div>
          <div className="preview-actions">
            <Button variant="success" size="lg" fullWidth onClick={capturePhoto}>
              CAPTURE PHOTO
            </Button>
            <Button variant="ghost" fullWidth onClick={() => setIsCameraOpen(false)} style={{ color: '#fff', marginTop: '10px' }}>
              CANCEL
            </Button>
          </div>
        </div>
      )}
      {error && <p className="error-msg">{error}</p>}
    </div>
  );
};

export default ImageUploader;
