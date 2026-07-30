import React, { useState } from 'react';
import { QrCode, CheckCircle, Camera, Sparkles, X } from 'lucide-react';
import { api } from '../../services/api';

export const QRScannerModal = ({ onClose, onSuccess }) => {
  const [scanning, setScanning] = useState(false);
  const [scannedResult, setScannedResult] = useState(null);

  const triggerSimulatedScan = async () => {
    setScanning(true);
    setTimeout(async () => {
      const res = await api.scanQRAttendance({ qrCodeToken: 'EDUSPHERE-QR-883921' });
      setScannedResult(res);
      setScanning(false);
      if (onSuccess) onSuccess();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="glass-card w-full max-w-md p-6 rounded-3xl border border-blue-500/30 shadow-2xl relative animate-in zoom-in-95 text-center">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white">
          <X className="w-5 h-5" />
        </button>

        <div className="w-12 h-12 rounded-2xl gradient-bg-primary flex items-center justify-center mx-auto mb-3 shadow-glow-blue">
          <QrCode className="w-6 h-6 text-white" />
        </div>

        <h3 className="text-lg font-bold text-white">QR Code Attendance Scanner</h3>
        <p className="text-xs text-slate-400 mt-1">Point your camera at the classroom smart board QR token</p>

        {/* Viewfinder Frame */}
        <div className="my-6 relative w-56 h-56 mx-auto rounded-2xl border-2 border-dashed border-blue-500/50 bg-slate-950 flex flex-col items-center justify-center overflow-hidden">
          {scanning ? (
            <div className="space-y-3">
              <div className="w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse" />
              <Camera className="w-8 h-8 text-blue-400 mx-auto animate-bounce" />
              <p className="text-[11px] font-semibold text-blue-300">Scanning QR Code...</p>
            </div>
          ) : scannedResult ? (
            <div className="space-y-2 text-center p-4 animate-in zoom-in-95">
              <CheckCircle className="w-10 h-10 text-emerald-400 mx-auto" />
              <p className="text-xs font-bold text-emerald-300">Attendance Recorded!</p>
              <p className="text-[10px] text-slate-400">CS401 • 2026-07-30 • Present</p>
            </div>
          ) : (
            <div className="text-center p-4">
              <QrCode className="w-16 h-16 text-slate-600 mx-auto mb-2" />
              <p className="text-[11px] text-slate-400">Ready to Scan</p>
            </div>
          )}
        </div>

        {!scannedResult ? (
          <button
            onClick={triggerSimulatedScan}
            disabled={scanning}
            className="w-full py-3 rounded-xl gradient-bg-primary text-white text-xs font-bold shadow-glow-blue flex items-center justify-center gap-2 hover:opacity-90 disabled:opacity-50"
          >
            <Sparkles className="w-4 h-4" />
            {scanning ? 'Verifying Token...' : 'Simulate Camera Scan'}
          </button>
        ) : (
          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl bg-slate-800 text-white text-xs font-bold hover:bg-slate-700 transition-colors"
          >
            Done
          </button>
        )}
      </div>
    </div>
  );
};
