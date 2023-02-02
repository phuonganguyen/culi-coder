import SocialIcon from '@/components/social-icons'
import siteMetadata from '@/data/siteMetadata'
import { currentDayName } from '@/utils/date-utils'
import NowPlaying from './NowPlaying'

export default function Footer() {
  return (
    <footer>
      <div className="mt-16 flex flex-col items-center">
        <div className="flex mb-3 space-x-4">
          <SocialIcon kind="github" href={siteMetadata.github} />
          <SocialIcon kind="instagram" href={siteMetadata.instagram} />
          <SocialIcon kind="linkedin" href={siteMetadata.linkedin} />
          <SocialIcon kind="twitter" href={siteMetadata.twitter} />
        </div>
        <div className="mb-3 flex">
          <NowPlaying />
        </div>
        <div className="flex mb-3 space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <div>From {siteMetadata.author} with ❤️</div>
          <div>{`© ${new Date().getFullYear()}`}</div>
          <div>{` • `}</div>
          <div>Have a good {currentDayName()}!</div>
        </div>
      </div>
    </footer>
  )
}
