import { useSearchParams } from 'react-router-dom'
import { useGetStarshipDetailsQuery } from './hooks'

export const StarshipDetails = () => {
  const [searchparams] = useSearchParams()
  const id = searchparams.get('id') ?? ''
  const { starshipDetailsData } = useGetStarshipDetailsQuery(id)

  console.log('starshipDetailsData:', starshipDetailsData)
  return (
    <div className="bg-fit bg-fixed bg-star-background flex flex-col min-h-screen px-10 pt-[104px]">
      <div className="w-full space-y-5">
        <header className="bg-gray-100">Starship Header</header>
        <section className="bg-gray-100">Starship Pilots</section>
        <section className="bg-gray-100">Starship Films</section>
      </div>
    </div>
  )
}
