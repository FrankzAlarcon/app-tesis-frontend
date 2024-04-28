'use client'
import React from 'react'
import FormsView from './_components/forms-view'
import UploadView from './_components/upload-view';

function StudentsPage() {
  const [showUplodInputForm, setShowUploadInputForm] = React.useState(false);

  const handleShowForm = () => {
    setShowUploadInputForm(true);
  }
  return (
    <div className='w-11/12 h-5/6 dashboard-container-shadow p-4'>
      {!showUplodInputForm
        ?
        <FormsView onShowForm={handleShowForm} />
        :
        <UploadView onBack={() => setShowUploadInputForm(false)} />
      }
    </div>
  )
}

export default StudentsPage