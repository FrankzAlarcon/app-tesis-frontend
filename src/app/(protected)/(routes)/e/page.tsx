import React from 'react'
import StudentCard from './_components/student-card'
import Post from './_components/post'
import InfoCard from './_components/info-card'



const StudentPage = async () => {
  return (
    <div className='students-home overflow-y-auto px-3 md:px-0  bg-[#f2f2f2]'>
      <div className='h-full w-full flex flex-col-reverse gap-4 md:gap-0 md:flex-row mt-[280px] md:mt-0 md:pt-8'>
        <section className='w-full md:w-10/12 h-full flex flex-col gap-4 md:gap-0 md:flex-row'>
          <article className='w-full md:w-[30%] h-full flex jusify-center '>
            <StudentCard />
          </article>
          <article className='w-full h-full md:w-[70%] md:px-3 '>
            <div className=' h-full flex flex-col gap-6 md:overflow-y-auto'>
              {/* TODO:Hacer componente para publicaicones */}
              <Post />
              <Post />
              <Post />
              <Post />
              <Post />
              <Post />
              <Post />
              <Post />
              <Post />
              <Post />
            </div>
          </article>
        </section>
        <section className='h-full flex flex-col items-center gap-4 md:px-4 w-full md:w-2/12'>
          {/* TODO: Hacer componentes catas inforamcion y enventos */}
          <InfoCard />
          <InfoCard />
        </section>
      </div>

    </div>
  )
}

export default StudentPage