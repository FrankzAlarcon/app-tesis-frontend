import { Input } from '@/components/ui/input'

interface ScheduleProps {
  values: any
  handleChange: (key: any, value: any) => void
}

const Schedule = ({
  values,
  handleChange
}: ScheduleProps) => {
  return (
  <table className='w-full'>
    <thead>
      <tr className='text-sm'>
        <td className='w-16'></td>
        <td className='text-center w-32 border border-collapse'>Lunes</td>
        <td className='text-center w-32 border border-collapse'>Martes</td>
        <td className='text-center w-32 border border-collapse'>Miércoles</td>
        <td className='text-center w-32 border border-collapse'>Jueves</td>
        <td className='text-center w-32 border border-collapse'>Viernes</td>
        <td className='text-center w-32 border border-collapse'>Sábado</td>
        <td className='text-center w-32 border border-collapse'>Domingo</td>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td className='border border-collapse px-2'>Inicio</td>
        <td className='border border-collapse'>
          <Input
            type='time'
            id='lunes-inicio'
            className='rounded-none border-none w-full block text-center'
            value={values.horarioSemanal.lunes.inicio}
            onChange={(e) => handleChange('horarioSemanal', { ...values.horarioSemanal, lunes: { ...values.horarioSemanal.lunes, inicio: e.target.value } })}
          />
        </td>
        <td className='border border-collapse'>
          <Input
            type='time'
            id='martes-inicio'
            className='rounded-none border-none w-full block text-center'
            value={values.horarioSemanal.martes.inicio}
            onChange={(e) => handleChange('horarioSemanal', { ...values.horarioSemanal, martes: { ...values.horarioSemanal.martes, inicio: e.target.value } })}
          />
        </td>
        <td className='border border-collapse'>
          <Input
            type='time'
            id='miercoles-inicio'
            className='rounded-none border-none w-full block text-center'
            value={values.horarioSemanal.miercoles.inicio}
            onChange={(e) => handleChange('horarioSemanal', { ...values.horarioSemanal, miercoles: { ...values.horarioSemanal.miercoles, inicio: e.target.value } })}
          />
        </td>
        <td className='border border-collapse'>
          <Input
            type='time'
            id='jueves-inicio'
            className='rounded-none border-none w-full block text-center'
            value={values.horarioSemanal.jueves.inicio}
            onChange={(e) => handleChange('horarioSemanal', { ...values.horarioSemanal, jueves: { ...values.horarioSemanal.jueves, inicio: e.target.value } })}
          />
        </td>
        <td className='border border-collapse'>
          <Input
            type='time'
            id='viernes-inicio'
            className='rounded-none border-none w-full block text-center'
            value={values.horarioSemanal.viernes.inicio}
            onChange={(e) => handleChange('horarioSemanal', { ...values.horarioSemanal, viernes: { ...values.horarioSemanal.viernes, inicio: e.target.value } })}
          />
        </td>
        <td className='border border-collapse'>
          <Input
            type='time'
            id='sabado-inicio'
            className='rounded-none border-none w-full block text-center'
            value={values.horarioSemanal.sabado.inicio}
            onChange={(e) => handleChange('horarioSemanal', { ...values.horarioSemanal, sabado: { ...values.horarioSemanal.sabado, inicio: e.target.value } })}
          />
        </td>
        <td className='border border-collapse'>
          <Input
            type='time'
            id='domingo-inicio'
            className='rounded-none border-none w-full block text-center'
            value={values.horarioSemanal.domingo.inicio}
            onChange={(e) => handleChange('horarioSemanal', { ...values.horarioSemanal, domingo: { ...values.horarioSemanal.domingo, inicio: e.target.value } })}
          />
        </td>
      </tr>
      <tr>
        <td className='border border-collapse px-2'>Fin</td>
        <td className='border border-collapse'>
          <Input
            type='time'
            id='lunes-fin'
            className='rounded-none border-none w-full block text-center'
            value={values.horarioSemanal.lunes.fin}
            onChange={(e) => handleChange('horarioSemanal', { ...values.horarioSemanal, lunes: { ...values.horarioSemanal.lunes, fin: e.target.value } })}
          />
        </td>
        <td className='border border-collapse'>
          <Input
            type='time'
            id='martes-fin'
            className='rounded-none border-none w-full block text-center'
            value={values.horarioSemanal.martes.fin}
            onChange={(e) => handleChange('horarioSemanal', { ...values.horarioSemanal, martes: { ...values.horarioSemanal.martes, fin: e.target.value } })}
          />
        </td>
        <td className='border border-collapse'>
          <Input
            type='time'
            id='miercoles-fin'
            className='rounded-none border-none w-full block text-center'
            value={values.horarioSemanal.miercoles.fin}
            onChange={(e) => handleChange('horarioSemanal', { ...values.horarioSemanal, miercoles: { ...values.horarioSemanal.miercoles, fin: e.target.value } })}
          />
        </td>
        <td className='border border-collapse'>
          <Input
            type='time'
            id='jueves-fin'
            className='rounded-none border-none w-full block text-center'
            value={values.horarioSemanal.jueves.fin}
            onChange={(e) => handleChange('horarioSemanal', { ...values.horarioSemanal, jueves: { ...values.horarioSemanal.jueves, fin: e.target.value } })}
          />
        </td>
        <td className='border border-collapse'>
          <Input
            type='time'
            id='viernes-fin'
            className='rounded-none border-none w-full block text-center'
            value={values.horarioSemanal.viernes.fin}
            onChange={(e) => handleChange('horarioSemanal', { ...values.horarioSemanal, viernes: { ...values.horarioSemanal.viernes, fin: e.target.value } })}
          />
        </td>
        <td className='border border-collapse'>
          <Input
            type='time'
            id='sabado-fin'
            className='rounded-none border-none w-full block text-center'
            value={values.horarioSemanal.sabado.fin}
            onChange={(e) => handleChange('horarioSemanal', { ...values.horarioSemanal, sabado: { ...values.horarioSemanal.sabado, fin: e.target.value } })}
          />
        </td>
        <td className='border border-collapse'>
          <Input
            type='time'
            id='domingo-fin'
            className='rounded-none border-none w-full block text-center'
            value={values.horarioSemanal.domingo.fin}
            onChange={(e) => handleChange('horarioSemanal', { ...values.horarioSemanal, domingo: { ...values.horarioSemanal.domingo, fin: e.target.value } })}
          />
        </td>
      </tr>
    </tbody>
  </table>
  )
}

export default Schedule