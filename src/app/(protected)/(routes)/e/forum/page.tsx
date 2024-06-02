import { getForumByGroup } from "@/actions/students/get-forum-by-group"
import ForumTable from "./_components/forum-table"
import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"


const ForumPage = async () => {
  const forum = await getForumByGroup()
  if (!forum) {
    return <div>Error</div>
  }
  console.log(forum);
  return (
    <div className='h-forum w-full flex items-center justify-start p-2 md:p-4 lg:px-8'>
      <div className="bg-white w-full rounded-lg shadow-md p-4 self-start">
        <div className="flex flex-row justify-between">
          <h1 className="text-2xl font-bold">Foro de la comunidad</h1>
          <Link href="/e/forum/new"
            className={buttonVariants({ variant: 'default' })}
          >
            Nueva opinión
          </Link>
        </div>
        <ForumTable forum={forum.data} />
      </div>
    </div>
  )
}

export default ForumPage