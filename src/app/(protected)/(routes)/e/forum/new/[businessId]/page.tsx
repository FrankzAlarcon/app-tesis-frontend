import { getShortBusinessInformation } from '@/actions/students/get-short-business-information'
import NewForum from '../../_components/new-forum'
import { getBusinessShortInfo } from '@/actions/business/get-business-short-info'

interface CreateNewEntryProps {
  params: {
    businessId?: string // Hacer que businessId sea opcional
  }
}

const CreateForumEntryPage = async ({ params }: CreateNewEntryProps) => {
  console.log('CreateForumEntryPage', params)

  let shortBusinessInformation = null
  let allBusiness = null

  if (params.businessId) {
    shortBusinessInformation = await getShortBusinessInformation(params.businessId)
  } else {
    allBusiness = await getBusinessShortInfo()
  }

  return (
    <div className='min-h-[92vh] w-full flex items-start justify-center p-2 md:p-4 lg:px-8'>
      <div className='w-4/5 p-2 md:px-6 md:py-4 bg-white rounded-md shadow-md'>
        <div>
          <h1 className='text-primary text-2xl font-bold mb-2'>Publica una opinión</h1>
          <p className='text-xs text-gray-800'>Los estudiantes de la EPN podrán ver tu opinión acerca de tu experiencia trabajando con alguna empresa.</p>
          <p className='text-xs text-gray-800'>Recuerda ser respetuoso, tu opinión es valiosa para tus compañeros de la EPN</p>
        </div>
        <NewForum businessId={params.businessId} allBusiness={allBusiness} businessSelected={shortBusinessInformation} />
      </div>
    </div>
  )
}

export default CreateForumEntryPage
