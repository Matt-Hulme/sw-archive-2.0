import { ImageListItem, Typography } from '@mui/material'

interface ListCardProps {
  classNames?: string
  containerClassNames?: string
  image: string
  id: string
  onClick: (id: string) => void
  title: string
  titlePosition?: string
}

export const ListCard = ({
  classNames,
  containerClassNames,
  id,
  image,
  onClick,
  title,
  titlePosition = 'top',
}: ListCardProps) => (
  <ImageListItem
    className={`duration-500 group/listcard relative rounded-[12px] transition hover:cursor-pointer hover:outline hover:outline-[#ffbe00] hover:outline-[2px] ${containerClassNames}`}
    onClick={() => onClick(id)}
  >
    <div className={`absolute bottom-0 h-fit inline-flex left-1 rounded-md w-max z-10 ${titlePosition === 'top' ? 'top-1' : 'bottom-1' }`}
    >
      {titlePosition === 'top' && 
      <>
        <div className="bg-[#39302e] duration-500 px-1 rounded-[12px] text-[#ffbe00] transition lg:hidden group-hover/listcard:bg-[#ffbe00] group-hover/listcard:text-[#39302e]">
          <Typography variant='subtitle2'>
            {title}
          </Typography>
        </div>
        <div className="bg-[#39302e] duration-500 hidden px-1 rounded-[12px] text-[#ffbe00] transition lg:block group-hover/listcard:bg-[#ffbe00] group-hover/listcard:text-[#39302e]">
          <Typography variant='h6'>
            {title}
          </Typography>
        </div>
      </>
      }
      {titlePosition === 'bottom' && 
      <div className="bg-[#39302e] duration-500 inline-flex px-1 rounded-[12px] text-[#ffbe00] transition group-hover/listcard:bg-[#ffbe00] group-hover/listcard:text-[#39302e]">
        <Typography variant='caption'>
          {title}
        </Typography>
      </div>
      }
    </div>
    <img alt={title} className={classNames} src={image} />
  </ImageListItem>
)
