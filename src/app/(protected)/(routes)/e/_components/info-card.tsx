import React from 'react'

function InfoCard() {
  return (
    <article className='w-full  bg-white py-2 rounded-[10px]'>
      <p className='font-bold px-3 text-sm'>Recuerda que existen proyectos de vinculación en la FIS</p>
      <nav className='px-4 mt-2'>
        <ul className='flex flex-col justify-center text-xs list-disc ml-3'>
          <li>
            <a href='#' className='text-primary text-sm '>Inclusión Digital</a>
          </li>
          <li>
            <a href='#' className='text-primary text-sm '>Proyecto de robótica</a>
          </li>
        </ul>
      </nav>

    </article>
  )
}

export default InfoCard