'use client';
import React, { useState } from 'react';
import UploadInputFile from './input-file';
import TableFile from './forms-table/upload-table';
import FilterSearch from '../../../_components/filter-search';
import { Button } from '@/components/ui/button';


function FileUpload() {
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (selectedFiles: File[]) => {
    setFiles([...files, ...selectedFiles]);
  };

  const onUpload = () => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('file', file);
    });
    console.log(formData.getAll('file'));
  };

  const handleFileRemove = (index: number) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
  };

  return (
    <div className='flex flex-col h-full justify-between pb-4'>
      <div className='flex flex-col gap-4'>
        <UploadInputFile onChange={handleFileChange} />
        <FilterSearch />
      </div>
      <TableFile files={files} onRemove={handleFileRemove} />
      <div className='flex justify-end'>
        <Button
          size='sm'
          disabled={files.length === 0}
          className='hover:bg-blue-700/90 rounded-lg'
          onClick={onUpload}
        >
          Cargar todos
        </Button>
      </div>

    </div>
  );
}

export default FileUpload;