
import React from 'react';

import { DataTable } from '../../../../_components/data-table';
import { Form, columns } from './columns';
interface FileTableProps {
  files: File[];
  onRemove: (index: string) => void;
}

function FileTable({ files, onRemove }: FileTableProps) {
  return (
    <DataTable<Form, keyof Form>
      columns={columns}
      data={files.map((file) => {
        const { name, code, studentId } = extractFileInfo(file.name);
        return {
          id: studentId,
          studentId,
          studentName: name,
          formCode: code,
          status: 'Aprobado',
          actions: 'Eliminar',
          onRemove
        };
      })}
      pageSize={10}
    />
  );
}

function extractFileInfo(fileName: string): { name: string, code: string, studentId: string } {
  //  [Nombre Estudiante];[Código Formulario];[Identificador generado]
  // check if the file name has the correct format
  const [name, code, studentId] = fileName.split(';');
  if (!name || !code || !studentId) {
    return { name: 'N/A', code: 'N/A', studentId: 'N/A' };
  }
  // TODO: check the correct format of the file name
  return { name, code, studentId};
}


  // E.j : F_AA_119_INFORME DE PRACTICAS PREPROFESIONALES actualizado-Mario Villamar
  // Extraer 'F_AA_119' 
  // Patrón para extraer el código del estudiante
//   const fileNameFist = fileName.split(' ')[0];
//   const fileNameFistSplit = fileNameFist.split('_').slice(0, -1).join('_');
//   const code = fileNameFistSplit || 'N/A';
  // Patrón para extraer el nombre del estudiante
//   const namePattern = /-\s*([^.]*)\.\w+$/;

// Realizar coincidencia con el patrón en el nombre del archivo para obtener el nombre
//   const nameMatch = fileName.match(namePattern);
//   const name = nameMatch ? nameMatch[1].trim() : 'N/A';

//   return { name, code };
// }




export default FileTable;
