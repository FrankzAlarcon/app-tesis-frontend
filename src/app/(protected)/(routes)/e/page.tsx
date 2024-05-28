import React from 'react'
import StudentCard from './_components/student-card'
import Post from './_components/post'
import InfoCard from './_components/info-card'


const infoPost = [
  {
    id: 1,
    title: 'Pasante de ingenieria de software',
    content: 'Buscamos un pasante de ingenieria de software para trabajar en un proyecto de desarrollo de software.',
    date: '27 de febrero 2024',
    autor: {
      name: 'Shadai Cervantes',
      avatar: '',
    },
    match: true,
    img: './img-publicacion.jpg'
  },
  {
    id: 2,
    title: 'Pasante web developer',
    content: 'Buscamos un pasante para trabajar en un proyecto de desarrollo web, con conocimientos en react y nodejs',
    date: '24 de febrero 2024',
    autor: {
      name: 'Shadai Cervantes',
      avatar: '',
    },
    match: true
  },
]


const StudentPage = async () => {
  return (
    <div className='students-home overflow-y-auto px-3 md:px-0  bg-[#f2f2f2]'>
      <div className='h-full w-full flex flex-col-reverse gap-4 md:gap-0 md:flex-row mt-[280px] md:mt-0 md:pt-8'>
        <section className='w-full md:w-10/12 h-full flex flex-col gap-4 md:gap-0 md:flex-row'>
          <article className='w-full md:w-[30%] h-full flex justify-center '>
            <StudentCard />
          </article>
          <article className='w-full h-full md:w-[70%] '>
            <div className=' h-full flex flex-col gap-6 px-2 pt-4 md:overflow-y-auto'>
              {/* TODO:Hacer componente para publicaicones */}
              {infoPost.map((post) => (
                <Post
                  key={post?.id}
                  title={post?.title}
                  content={post?.content}
                  date={post?.date}
                  autor={post?.autor}
                  img={post?.img}
                  match={post?.match}
                />
              ))}
            </div>
          </article>
        </section>
        <section className='h-full flex flex-col items-center gap-4 md:px-4 w-full md:w-2/12'>
          {/* TODO: Hacer componentes catas inforamcion y enventos */}
          <InfoCard />
        </section>
      </div>

    </div>
  )
}

export default StudentPage