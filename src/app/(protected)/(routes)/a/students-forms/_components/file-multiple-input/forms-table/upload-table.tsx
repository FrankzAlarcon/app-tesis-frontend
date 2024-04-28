
import React from 'react';

import { DataTable } from '../../../../_components/data-table';
import { Form, columns } from './columns';
interface FileTableProps {
  files: File[];
  onRemove: (index: number) => void;
}

function FileTable({ files, onRemove }: FileTableProps) {
  return (
    <DataTable<Form, keyof Form>
      columns={columns}
      data={files.map((file, index) => {
        const { name, code } = extractFileInfo(file.name);
        return {
          id: index.toString(),
          studentName: name,
          formId: code,
          status: 'Aprobado',
          actions: 'Eliminar',
          onRemove
        };
      })}
      pageSize={3}
    />
  );
}

function extractFileInfo(fileName: string): { name: string; code: string } {
  // E.j : F_AA_119_INFORME DE PRACTICAS PREPROFESIONALES actualizado-Mario Villamar
  // Extraer 'F_AA_119' 
  // Patrón para extraer el código del estudiante
  const fileNameFist = fileName.split(' ')[0];
  const fileNameFistSplit = fileNameFist.split('_').slice(0, -1).join('_');
  const code = fileNameFistSplit || 'N/A';
  // Patrón para extraer el nombre del estudiante
  const namePattern = /-\s*([^.]*)\.\w+$/;

  // Realizar coincidencia con el patrón en el nombre del archivo para obtener el nombre
  const nameMatch = fileName.match(namePattern);
  const name = nameMatch ? nameMatch[1].trim() : 'N/A';

  return { name, code };
}





export default FileTable;
