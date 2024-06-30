import React from 'react'
import NewPublication from './_components/new-publication'
import { getSkills } from '@/actions/shared/get-skills'



const NewPublicationPage = async () => {
  const skills = await getSkills()
  if (!skills) return (<div>Loading...</div>)
  return (
    <section className='w-full'>
      <article className='flex justify-center items-center w-full py-8 px-3 md:px-0'>
        <div className='flex flex-col md:w-9/12 rounded-md bg-white p-4'>
          <h3 className='text-xl font-bold text-primary'>Crea una publicación</h3>
          <p className='text-muted-foreground text-sm'>Completa los campos para crear una nueva publicación, los estudiantes de la EPN podrán verla y postularse.</p>
          <NewPublication skills={skills} />
        </div>
      </article>
    </section>
  )
}

export default NewPublicationPage