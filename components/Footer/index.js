import React from 'react'

const Footer = () =>
{
  return (
    <React.Fragment>
      <div className='bg-gray-700 p-4'>
        <div className='container mx-auto text-center font-bold text-white'>
          Projeto Desenvolvido por {' '}
          <a className='hover:underline' href=''>XXXXXX</a>
          <div className='mt-2'>
            <img className='w-40 inline p-4' src='/logo_semana_fsm.png' alt='PalpiteBox' />
            <img className='w-40 inline p-4' src='/logo_devpleno.png' alt='PalpiteBox' />
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}
export default Footer