import { Post } from '@/types/post'
import Posts from '../../_components/post'
import PostulationMessage from './postulation-message'

interface PostulationProps {
  publication: Post
  wasAlreadyPostulated: boolean
}
  

const Postulation = ({
  publication,
  wasAlreadyPostulated
}: PostulationProps) => {
  return (
    <div className='p-2'>
      <div className=''>
        <Posts post={publication} noFooter />
      </div>
      <div>
        <PostulationMessage publicationId={publication.id} wasAlreadyPostulated={wasAlreadyPostulated}  />
      </div>
    </div>
  )
}

export default Postulation