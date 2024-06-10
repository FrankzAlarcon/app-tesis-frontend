import { getLastPostulations } from "@/actions/students/get-last-postulations"
import { getOnePublication } from "@/actions/students/get-one-publication"
import ItemCard from "@/components/item-card"
import Postulation from "../_components/postulation"

interface PostulationEntryPageProps {
  params: {
    publicationId?: string
  }
}

const PostulationEntryPage = async ({
  params
}: PostulationEntryPageProps) => {
  if (!params.publicationId) {
    return null
  }
  const entry = await getOnePublication(params.publicationId)
  const lastPostulations = await getLastPostulations()
  if (!entry || !lastPostulations) {
    return null
  }
  return (
    <div className="flex flex-col gap-2 p-4">
      <div className="bg-white rounded-xl shadow-sm py-2 px-4">
        <p className="font-bold pb-2">Postulaste en:</p>
        <div className="flex flex-col gap-2">
          {
            lastPostulations?.map((postulation) => (
              <ItemCard key={postulation.id} shortPublication={postulation} />
            ))
          }
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-sm">
        <Postulation publication={entry.publication} wasAlreadyPostulated={entry.wasAlreadyPostulated} />
      </div>
    </div>
  )
}

export default PostulationEntryPage