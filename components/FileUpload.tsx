import React, { useRef, ChangeEvent } from 'react';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  label?: string;
  className?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect, label = "Upload Image", className }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFileSelect(e.target.files[0]);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/png, image/jpeg"
      />
      <button
        type="button"
        onClick={handleClick}
        className={`px-4 py-2 text-sm font-medium text-brand-dark bg-brand-gold rounded-md hover:bg-amber-400 transition-colors ${className || ''}`}
      >
        {label}
      </button>
    </div>
  );
};

export default FileUpload;