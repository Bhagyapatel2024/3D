import React, { useEffect, useRef } from 'react';
import { Product } from '../types';

interface ARViewProps {
  product: Product;
  onClose: () => void;
}

export const ARView: React.FC<ARViewProps> = ({ product, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: { facingMode: 'environment' } })
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch((err) => console.error('Error accessing camera:', err));
    }

    return () => {
      if (videoRef.current?.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50">
      <div className="relative h-full">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="w-full h-full object-cover"
        />
        
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
          <div className="text-white mb-4">
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-sm opacity-75">
              Dimensions: {product.dimensions.width}W x {product.dimensions.height}H x{' '}
              {product.dimensions.depth}D inches
            </p>
          </div>
          
          <button
            onClick={onClose}
            className="w-full bg-white text-black py-2 rounded-lg"
          >
            Close AR View
          </button>
        </div>
      </div>
    </div>
  );
};