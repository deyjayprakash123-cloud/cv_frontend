import React, { useState, useRef } from 'react';
import { Upload, CheckCircle2, AlertTriangle, Loader2 } from 'lucide-react';

interface UploadZoneProps {
  onFileSelect: (file: File) => void;
  isProcessing: boolean;
  selectedFile: File | null;
}

export default function UploadZone({ onFileSelect, isProcessing, selectedFile }: UploadZoneProps) {
  const [isDragActive, setIsDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  const validateFile = (file: File): boolean => {
    const ext = file.name.split('.').pop()?.toLowerCase();
    const validExtensions = ['pdf', 'docx', 'txt'];
    
    if (!ext || !validExtensions.includes(ext)) {
      setError("Unsupported file format. Please upload a PDF, DOCX, or TXT file.");
      return false;
    }
    
    if (file.size > 10 * 1024 * 1024) {
      setError("File is too large. Maximum size is 10MB.");
      return false;
    }
    
    setError(null);
    return true;
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (validateFile(file)) {
        onFileSelect(file);
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (validateFile(file)) {
        onFileSelect(file);
      }
    }
  };

  const onButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div style={{ width: '100%' }}>
      <div
        className={isDragActive ? "upload-box active" : "upload-box"}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        onClick={onButtonClick}
        style={{ minHeight: '260px', position: 'relative', overflow: 'hidden' }}
      >
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          style={{ display: 'none' }}
          accept=".pdf,.docx,.txt"
          onChange={handleFileChange}
          disabled={isProcessing}
        />

        {isProcessing ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', padding: '1.5rem 0' }}>
            <Loader2 className="animate-spin" style={{ width: '3rem', height: '3rem', color: 'var(--neon-purple)' }} />
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-white)' }}>Analyzing Resume...</h3>
            <p style={{ fontSize: '0.72rem', color: 'var(--color-muted)', maxWidth: '280px', margin: '0 auto', lineHeight: 1.5 }}>
              Extracting structure with Regex, running TF-IDF vectorization, PCA reduction, and calculating SVD role matches.
            </p>
          </div>
        ) : selectedFile ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', padding: '1rem 0' }}>
            <div className="upload-icon-wrapper success float-effect">
              <CheckCircle2 style={{ width: '2rem', height: '2rem' }} />
            </div>
            <div>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-white)', wordBreak: 'break-all' }}>{selectedFile.name}</h3>
              <p style={{ fontSize: '0.7rem', color: 'var(--color-muted)', marginTop: '0.2rem' }}>
                {(selectedFile.size / 1024).toFixed(1)} KB • Ready to Analyze
              </p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onButtonClick();
              }}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--neon-purple)',
                fontSize: '0.72rem',
                fontWeight: 600,
                borderBottom: '1px solid rgba(139, 92, 246, 0.3)',
                cursor: 'pointer',
                marginTop: '0.5rem',
                paddingBottom: '2px'
              }}
            >
              Choose a different file
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', padding: '1rem 0' }}>
            <div className="upload-icon-wrapper float-effect">
              <Upload style={{ width: '2rem', height: '2rem' }} />
            </div>
            <div>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-white)', marginBottom: '0.25rem' }}>Drag and drop your CV here</h3>
              <p style={{ fontSize: '0.72rem', color: 'var(--color-muted)' }}>PDF, DOCX, or TXT up to 10MB</p>
            </div>
            <button
              type="button"
              className="upload-btn"
            >
              Browse Files
            </button>
          </div>
        )}

        {error && (
          <div className="upload-error">
            <AlertTriangle style={{ width: '1rem', height: '1rem', flexShrink: 0 }} />
            <span>{error}</span>
          </div>
        )}
      </div>
    </div>
  );
}
