import { Input } from "@/components/ui/input"

interface CualitativeEvaluationProps {
  values: any
  handleChange: (key: any, value: any) => void
}

const CualitativeEvaluation = ({
  values,
  handleChange
}: CualitativeEvaluationProps) => {
  return (
    <table className='border border-collapse w-full'>
      <thead className='border border-collapse'>
        <tr className='font-bold text-sm'>
          <td className='border border-collapse md:p-2 text-center'>Evaluación cualitativa</td>
          <td className='border border-collapse md:p-2 text-center'>Excelente</td>
          <td className='border border-collapse md:p-2 text-center'>Muy buena</td>
          <td className='border border-collapse md:p-2 text-center'>Satisfactoria</td>
          <td className='border border-collapse md:p-2 text-center'>Deficiente</td>
        </tr>
      </thead>
      <tbody>
        <tr className='text-sm '>
          <td className='border border-collapse'>Asistencia y Puntualidad</td>
          <td className='border border-collapse'>
            <Input
              type='radio'
              name='asistencia'
              value='excelente'
              className='w-4 mx-auto block cursor-pointer'
              defaultChecked={values.evaluacionCualitativa.asistencia === 'excelente'}
              onChange={(e) => handleChange('evaluacionCualitativa', { ...values.evaluacionCualitativa, asistencia: e.target.value })}
            />
          </td>
          <td className='border border-collapse'>
            <Input
              type='radio'
              name='asistencia'
              value='muy-buena'
              className='w-4 mx-auto block cursor-pointer'
              defaultChecked={values.evaluacionCualitativa.asistencia === 'muy-buena'}
              onChange={(e) => handleChange('evaluacionCualitativa', { ...values.evaluacionCualitativa, asistencia: e.target.value })}
            />
          </td>
          <td className='border border-collapse'>
            <Input
              type='radio'
              name='asistencia'
              value='satisfactoria'
              className='w-4 mx-auto block cursor-pointer'
              defaultChecked={values.evaluacionCualitativa.asistencia === 'satisfactoria'}
              onChange={(e) => handleChange('evaluacionCualitativa', { ...values.evaluacionCualitativa, asistencia: e.target.value })}
            />
          </td>
          <td className='border border-collapse'>
            <Input
              type='radio'
              name='asistencia'
              value='deficiente'
              className='w-4 mx-auto block cursor-pointer'
              defaultChecked={values.evaluacionCualitativa.asistencia === 'deficiente'}
              onChange={(e) => handleChange('evaluacionCualitativa', { ...values.evaluacionCualitativa, asistencia: e.target.value })}
            />
          </td>
        </tr>
        <tr className='text-sm '>
          <td className='border border-collapse'>Desempeño</td>
          <td className='border border-collapse'>
            <Input
              type='radio'
              name='desempeno'
              value='excelente'
              className='w-4 mx-auto block cursor-pointer'
              defaultChecked={values.evaluacionCualitativa.desempeno === 'excelente'}
              onChange={(e) => handleChange('evaluacionCualitativa', { ...values.evaluacionCualitativa, desempeno: e.target.value })}
            />
          </td>
          <td className='border border-collapse'>
            <Input
              type='radio'
              name='desempeno'
              value='muy-buena'
              className='w-4 mx-auto block cursor-pointer'
              defaultChecked={values.evaluacionCualitativa.desempeno === 'muy-buena'}
              onChange={(e) => handleChange('evaluacionCualitativa', { ...values.evaluacionCualitativa, desempeno: e.target.value })}
            />
          </td>
          <td className='border border-collapse'>
            <Input
              type='radio'
              name='desempeno'
              value='satisfactoria'
              className='w-4 mx-auto block cursor-pointer'
              defaultChecked={values.evaluacionCualitativa.desempeno === 'satisfactoria'}
              onChange={(e) => handleChange('evaluacionCualitativa', { ...values.evaluacionCualitativa, desempeno: e.target.value })}
            />
          </td>
          <td className='border border-collapse'>
            <Input
              type='radio'
              name='desempeno'
              value='deficiente'
              className='w-4 mx-auto block cursor-pointer'
              defaultChecked={values.evaluacionCualitativa.desempeno === 'deficiente'}
              onChange={(e) => handleChange('evaluacionCualitativa', { ...values.evaluacionCualitativa, desempeno: e.target.value })}
            />
          </td>
        </tr>
        <tr className='text-sm '>
          <td className='border border-collapse'>Motivación</td>
          <td className='border border-collapse'>
            <Input
              type='radio'
              name='motivacion'
              value='excelente'
              className='w-4 mx-auto block cursor-pointer'
              defaultChecked={values.evaluacionCualitativa.motivacion === 'excelente'}
              onChange={(e) => handleChange('evaluacionCualitativa', { ...values.evaluacionCualitativa, motivacion: e.target.value })}
            />
          </td>
          <td className='border border-collapse'>
            <Input
              type='radio'
              name='motivacion'
              value='muy-buena'
              className='w-4 mx-auto block cursor-pointer'
              defaultChecked={values.evaluacionCualitativa.motivacion === 'muy-buena'}
              onChange={(e) => handleChange('evaluacionCualitativa', { ...values.evaluacionCualitativa, motivacion: e.target.value })}
            />
          </td>
          <td className='border border-collapse'>
            <Input
              type='radio'
              name='motivacion'
              value='satisfactoria'
              className='w-4 mx-auto block cursor-pointer'
              defaultChecked={values.evaluacionCualitativa.motivacion === 'satisfactoria'}
              onChange={(e) => handleChange('evaluacionCualitativa', { ...values.evaluacionCualitativa, motivacion: e.target.value })}
            />
          </td>
          <td className='border border-collapse'>
            <Input
              type='radio'
              name='motivacion'
              value='deficiente'
              className='w-4 mx-auto block cursor-pointer'
              defaultChecked={values.evaluacionCualitativa.motivacion === 'deficiente'}
              onChange={(e) => handleChange('evaluacionCualitativa', { ...values.evaluacionCualitativa, motivacion: e.target.value })}
            />
          </td>
        </tr>
        <tr className='text-sm '>
          <td className='border border-collapse'>Conocimientos, destrezas y valores</td>
          <td className='border border-collapse'>
            <Input
              type='radio'
              name='conocimientos'
              value='excelente'
              className='w-4 mx-auto block cursor-pointer'
              defaultChecked={values.evaluacionCualitativa.conocimientos === 'excelente'}
              onChange={(e) => handleChange('evaluacionCualitativa', { ...values.evaluacionCualitativa, conocimientos: e.target.value })}
            />
          </td>
          <td className='border border-collapse'>
            <Input
              type='radio'
              name='conocimientos'
              value='muy-buena'
              className='w-4 mx-auto block cursor-pointer'
              defaultChecked={values.evaluacionCualitativa.conocimientos === 'muy-buena'}
              onChange={(e) => handleChange('evaluacionCualitativa', { ...values.evaluacionCualitativa, conocimientos: e.target.value })}
            />
          </td>
          <td className='border border-collapse'>
            <Input
              type='radio'
              name='conocimientos'
              value='satisfactoria'
              className='w-4 mx-auto block cursor-pointer'
              defaultChecked={values.evaluacionCualitativa.conocimientos === 'satisfactoria'}
              onChange={(e) => handleChange('evaluacionCualitativa', { ...values.evaluacionCualitativa, conocimientos: e.target.value })}
            />
          </td>
          <td className='border border-collapse'>
            <Input
              type='radio'
              name='conocimientos'
              value='deficiente'
              className='w-4 mx-auto block cursor-pointer'
              defaultChecked={values.evaluacionCualitativa.conocimientos === 'deficiente'}
              onChange={(e) => handleChange('evaluacionCualitativa', { ...values.evaluacionCualitativa, conocimientos: e.target.value })}
            />
          </td>
        </tr>
      </tbody>
    </table>
  )
}

export default CualitativeEvaluation