import { getPostulations } from '@/actions/students/get-postulations'
import StudentCard from '../_components/student-card'
import Link from 'next/link'
import PostulationCard from './_components/postulation-card'

const PostulationsPage = async () => {
  const postulations = await getPostulations()
  if (!postulations) {
    return null
  }
  return (
    <div className='p-4 flex flex-col md:flex-row gap-4 rounded-xl'>
      <div className='md:w-1/3'>
        <StudentCard />
      </div>
      <div className='flex flex-col gap-4 md:w-2/3'>
        <div className='bg-white p-2 w-full rounded-xl shadow-sm'>
          {
            postulations.length === 0 ? (
              <div className='flex flex-col items-center py-4'>
                <h1 className='text-xl font-bold'>No tienes postulaciones</h1>
                <p>Encuentra una publicación y postula!</p>
                <Link 
                  href='/e'
                  className='bg-primary text-white px-4 py-2 rounded-md mt-4 cursor-pointer hover:bg-blue-600 transition-all'
                >
                  Ir al home
                </Link>
              </div>
            ) : (
              <div className='px-6 pb-6'>
                <h1 className='text-xl font-bold pt-2 pb-4'>Postulaste en:</h1>
                <div className='space-y-2 md:space-y-4'>
                  {
                    postulations.map((postulation) => (
                      <PostulationCard key={postulation.id} postulation={postulation} />
                    ))
                  }
                </div>
              </div>
            )
          }
        </div>
        {/* <div className='bg-white p-2'>
          TODO: Add "Fuiste candidato" section
        </div> */}
      </div>
    </div>
  )
}

export default PostulationsPage