import AvatarComponent from "@/components/avatar"
import { buttonVariants } from "@/components/ui/button"
import { Recommendation } from "@/types/business"
import Link from "next/link"

interface RecommendationCardProps {
  recommendation: Recommendation
}

const RecommendationCard = ({
  recommendation
}: RecommendationCardProps) => {
  return (
    <div className="relative border p-2 pt-10 shadow-md rounded-xl flex flex-col gap-2 justify-center items-center">
      <div className="absolute top-0 w-full flex justify-end">
        <p className="text-xs text-center bg-primary font-bold w-11/12 p-2 text-white rounded-tr-xl rounded-bl-xl">Cumple { recommendation.matchCount } aptitudes!</p>
      </div>
      <div>
        <AvatarComponent
          src={recommendation.imageUrl}
          name={recommendation.name}
          className="w-20 h-20"
        />
      </div>
      <div className="flex flex-col items-center justify-center">
        <p className="text-sm font-bold">{recommendation.name}</p>
        <p className="text-xs">{recommendation.email}</p>
      </div>
      <div>
        <Link
          href={`/profile/e/${recommendation.id}`}
          className={buttonVariants({ variant: 'outline', size: 'sm' })}
        >
          Visitar perfil
        </Link>
      </div>
    </div>
  )

}

interface RecommendationsGroupProps {
  recommendations: Recommendation[]
}

const RecommendationsGroup = ({
  recommendations
}: RecommendationsGroupProps) => {
  return (
    <div className="flex flex-col gap-4 md:grid md:grid-cols-3 lg:grid-cols-5">
      {
        recommendations.map((recommendation) => (
          <RecommendationCard key={recommendation.id} recommendation={recommendation} />
        ))
      }
    </div>
  )
}

export default RecommendationsGroup