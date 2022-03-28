import SocialIcon from "@/components/social-icons";
import siteMetadata from "@/data/siteMetadata";
import { currentDayName } from "@/utils/date-utils";

export default function Footer() {
  return (
    <footer>
      <div className="flex flex-col items-center justify-between md:flex-row mt-10 mb-4">
        <div className="flex mb-3 space-x-4">
          <SocialIcon kind="github" href={siteMetadata.github} />
          <SocialIcon kind="instagram" href={siteMetadata.instagram} />
          <SocialIcon kind="linkedin" href={siteMetadata.linkedin} />
          <SocialIcon kind="twitter" href={siteMetadata.twitter} />
        </div>
        <div className="flex mb-3 space-x-2 text-base text-gray-500 dark:text-gray-400">
          {siteMetadata.author} | Have a good {currentDayName()}!
        </div>
      </div>
    </footer>
  )
}
