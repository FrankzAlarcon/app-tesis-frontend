import { getForumByGroup } from "@/actions/students/get-forum-by-group"
import ForumTable from "./_components/forum-table"

const ForumPage = async () => {
  const forum = await getForumByGroup()
  if (!forum) {
    return <div>Error</div>
  }
  return (
    <div className='min-h-[92vh] w-full flex items-center justify-start p-2 md:p-4 lg:px-8'>
      <div className="bg-white w-full rounded-lg shadow-md p-4 self-start">
        <h1 className="text-2xl font-bold">Foro de la comunidad</h1>
        <ForumTable forum={forum.data} />
      </div>
    </div>
  )
}

export default ForumPage