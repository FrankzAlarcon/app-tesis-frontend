import React from 'react';
import { X } from 'lucide-react';
import { Upload } from 'lucide-react'

type ImageUploaderProps = {
  onImageChange: (file: File | null) => void;
};

const ImageUploader = ({ onImageChange }: ImageUploaderProps) => {
  const [preview, setPreview] = React.useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setPreview(URL.createObjectURL(file));
      onImageChange(file);
    } else {
      setPreview(null);
      onImageChange(null);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0] || null;
    if (file) {
      setPreview(URL.createObjectURL(file));
      onImageChange(file);
    } else {
      setPreview(null);
      onImageChange(null);
    };
  }

  const handleRemoveImage = () => {
    setPreview(null);
    onImageChange(null);
  };

  return (
    <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center relative">
      {preview ? (
        <div className="relative">
          <img src={preview} alt="Preview" className=" max-w-[200px] md:max-w-[400px]
          h-auto mx-auto" />
          <button
            type="button"
            className="absolute top-2 right-2 bg-white rounded-full p-1 shadow"
            onClick={handleRemoveImage}
          >
            <X className="w-4 h-4 text-black" />
          </button>
        </div>
      ) : (
        <div
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <label className="cursor-pointer">
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              onChange={handleInputChange}
              className="hidden"
            />
            <div className="flex flex-col items-center">
              <Upload size={70} strokeWidth={0.5} className='text-[#1D4ED8]' />
              <p className="text-black font-semibold">Cargar imagen</p>
              <p className="text-gray-500">O arrastra y suelta aquí</p>
            </div>
          </label>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
