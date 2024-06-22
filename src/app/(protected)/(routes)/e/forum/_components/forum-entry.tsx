import AvatarComponent from "@/components/avatar"
import SafeHTML from "@/components/safe-html"
import { formatDistanceEs } from "@/lib/date-fns/format-distance-es"
import { formatDateComplete } from "@/lib/format-date"
import { Forum } from "@/types/forum"
import { Star } from "lucide-react"

interface ForumEntryProps {
  forumEntry: Forum
}

const ForumEntry = ({
forumEntry
}: ForumEntryProps) => {
  return (
    <div className="border-2 p-2 rounded-lg md:px-4">
      <p className="text-xl font-bold py-2">{forumEntry.title}</p>
      <div className="text-sm text-gray-800 pb-2">
        <SafeHTML>{forumEntry.description}</SafeHTML>
      </div>
      <hr className="border-[1.5px]" />
      <div className="pt-2 flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <AvatarComponent src="https://github.com/shadcn.png" />
          <div className="text-sm">
            <p>Publicado por: <span className="text-primary">{forumEntry.student.user.name}</span></p>
            <p>{formatDistanceEs(forumEntry.createdAt)}</p>
          </div>
        </div>
        <div className="flex gap-0.5 items-center">
          <span className="text-lg">{forumEntry.grade}</span>
          <Star className="w-4 h-4 text-black fill-amber-400" />
        </div>
      </div>
    </div>
  )
}

export default ForumEntry