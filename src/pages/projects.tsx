import PageTitle from '@/components/PageTitle'
import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'

const Projects = () => (
  <>
    <PageSEO title={`Projects - ${siteMetadata.author}`} description={siteMetadata.description} />
    <div className="pt-6 pb-8 space-y-2 md:space-y-5">
      <PageTitle>Projects</PageTitle>
    </div>
  </>
)

export default Projects
