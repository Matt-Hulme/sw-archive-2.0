import { useParams, useSearchParams } from 'react-router-dom'
import { useGetVehicleDetailsQuery } from './hooks'
import { DetailsHeader, DetailsHeaderPanel, ErrorPage, HorizontalScroller, ListCard, LoadingPage } from '../common'
import { useEffect, useState } from 'react'
import { getFormattedId, getNameForUrl } from '../../utils'
import { startCase } from 'lodash'

export const VehicleDetails = () => {
  const { name: urlName } = useParams()
  const [searchParams] = useSearchParams()
  const [nameError, setNameError] = useState(false)
  const id = searchParams.get('id') ?? ''
  const {
    vehicleDetailsData,
    error: hasError,
    loading: isLoading,
  } = useGetVehicleDetailsQuery(id)
  const name = vehicleDetailsData?.name ?? ''
  const vehicleImage = `/assets/images/vehicles/${id}.jpg`

  useEffect(() => {
    if (name && urlName !== getNameForUrl(name)) {
      setNameError(true)
    }
  }, [name, urlName])

  console.log('vehicleDetailsData:', vehicleDetailsData)

  const panelContentA = [
    {
      heading: 'Manufacturer',
      content:
        vehicleDetailsData?.manufacturers
          ?.map((manufacturer: string | null) => manufacturer)
          .join(', ') ?? '',
    },
    {
      heading: 'Model',
      content: startCase(vehicleDetailsData?.model ?? ''),
    },
    {
      heading: 'Class',
      content: startCase(vehicleDetailsData?.vehicleClass ?? ''),
    },
    {
      heading: 'Cost',
      content: vehicleDetailsData?.costInCredits?.toString() ?? '',
    },
  ]

  const panelContentB = [
    {
      heading: 'Crew',
      content: vehicleDetailsData?.crew?.toString() ?? '',
    },
    {
      heading: 'Passengers',
      content: vehicleDetailsData?.passengers?.toString() ?? '',
    },
    {
      heading: 'Speed',
      content: vehicleDetailsData?.maxAtmospheringSpeed?.toString() ?? '',
    },
    {
      heading: 'Length',
      content: vehicleDetailsData?.length?.toString() ?? '',
    },
    {
      heading: 'Cargo Capacity',
      content: vehicleDetailsData?.cargoCapacity?.toString() ?? '',
    },
    {
      heading: 'Consumables',
      content: startCase(vehicleDetailsData?.consumables ?? ''),
    },
  ]

  if (isLoading) return <LoadingPage />

  if (nameError || hasError) return <ErrorPage type="Vehicle" />

  return (
    <div className="bg-fit bg-fixed bg-star-background flex flex-col min-h-screen pt-[104px] px-10">
      <div className="overflow-x-hidden space-y-5 w-full">
        <DetailsHeader
          classNames="h-[225px] lg:min-h-[280px] lg:min-w-[400px]"
          image={vehicleImage}
          name={name ?? ''}
        >
          <div className="flex flex-col gap-2 w-full">
            <DetailsHeaderPanel panelContent={panelContentA} variant="light" />
            <DetailsHeaderPanel panelContent={panelContentB} variant="dark" />
          </div>
        </DetailsHeader>
        {(vehicleDetailsData?.pilotConnection?.pilots?.length ?? 0 > 0) && (
          <section className="bg-[#39302e] max-w-full rounded-lg w-fit">
            <HorizontalScroller
              title='Pilots'
            >
              {vehicleDetailsData?.pilotConnection?.pilots?.map((pilot, index) => {
                const title = pilot?.name ?? ''
                const id = getFormattedId(pilot?.id ?? '')
                const image = `/assets/images/characters/${id}.jpg`

                return (
                  <ListCard 
                    classNames='absolute inset-0 z--1'
                    containerClassNames='min-h-[260px] min-w-[180px] rounded-lg overflow-hidden relative'
                    id={id}
                    image={image}
                    key={index}
                    title={title}
                    titlePosition='bottom'
                    onClick={() => {}}
                  />
                )
              })}
            </HorizontalScroller>
          </section>
        )}
        {(vehicleDetailsData?.filmConnection?.films?.length ?? 0 > 0) && (
          <section className="bg-[#39302e] max-w-full rounded-lg w-fit">
            <HorizontalScroller
              title='Films'
            >
              {vehicleDetailsData?.filmConnection?.films?.map((film, index) => {
                const title = film?.title ?? ''
                const id = getFormattedId(film?.id ?? '')
                const image = `/assets/images/films/${id}.jpg`

                return (
                  <ListCard 
                    classNames='absolute inset-0 z--1'
                    containerClassNames='min-h-[260px] min-w-[180px] rounded-lg overflow-hidden relative'
                    id={id}
                    image={image}
                    key={index}
                    title={title}
                    titlePosition='bottom'
                    onClick={() => {}}
                  />
                )
              })}
            </HorizontalScroller>
          </section>
        )}
      </div>
    </div>
  )
}
