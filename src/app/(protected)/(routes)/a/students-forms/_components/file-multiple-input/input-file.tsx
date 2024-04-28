import React from 'react';
import { Upload } from 'lucide-react'
interface FileInputProps {
  onChange: (selectedFiles: File[]) => void;
}

function FileInput({ onChange }: FileInputProps) {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);
    onChange(selectedFiles);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const selectedFiles = Array.from(event.dataTransfer.files);
    onChange(selectedFiles);
  };

  const handleAreaClick = () => {
    // Disparar el evento de clic del input file
    const input = document.getElementById('fileInput') as HTMLInputElement;
    input.click();
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={handleAreaClick}
      className='flex flex-col items-center justify-center py-2  mt-3 border-2 border-dashed border-[#1D4ED8] rounded-lg cursor-pointer'
    >
      <input
        id="fileInput"
        type="file"
        multiple
        accept="application/pdf" //
        onChange={handleFileChange}
        className="hidden"
      />

      <Upload size={70} strokeWidth={0.5} className='text-[#1D4ED8]' />
      <strong className='text-sm'>Cargar documentos</strong>
      <span className="text-gray-500 text-sm">Arrastra y suelta tus archivos aquí</span>

    </div>
  );
}

export default FileInput;
