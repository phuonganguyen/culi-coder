import Link from '@/components/Link'
import PageTitle from '@/components/PageTitle'
import ProjectCard from '@/components/ProjectCard'
import { PageSEO } from '@/components/SEO'
import { PROJECTS, Project } from '@/data/projectsData'
import siteMetadata from '@/data/siteMetadata'
import { getProjects } from 'src/services'

export async function getStaticProps() {
  let projects: Project[] = PROJECTS

  // Primary source: Hygraph. Falls back to the seeded list when the CMS has
  // no published projects (or is temporarily unreachable).
  try {
    const cms = await getProjects()
    if (cms && cms.length) {
      projects = cms.map((p) => ({
        name: p.name,
        role: p.role,
        description: p.description?.text ?? '',
        technologies: p.technologies ?? [],
        link: p.link,
        thumbnail: p.thumbnail?.url,
      }))
    }
  } catch {
    projects = PROJECTS
  }

  return { props: { projects }, revalidate: 10 }
}

const Projects = ({ projects }: { projects: Project[] }) => (
  <>
    <PageSEO title={`Projects - ${siteMetadata.author}`} description={siteMetadata.description} />
    <div className="pt-6 pb-8 space-y-2 md:space-y-5">
      <PageTitle>Projects</PageTitle>
      <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
        A collection of things I&apos;ve built and tinkered with — side projects, experiments,
        and the occasional game.
      </p>
    </div>

    {projects.length === 0 ? (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Projects are on the way 🚧
        </h2>
        <p className="mt-2 max-w-md text-gray-500 dark:text-gray-400">
          In the meantime, you can find what I&apos;m building over on GitHub.
        </p>
        <Link
          href={siteMetadata.github}
          className="mt-6 inline-flex items-center rounded-lg bg-primary-color px-5 py-3 font-medium text-white transition hover:opacity-90 dark:bg-primary-color-dark dark:text-gray-900"
        >
          Visit my GitHub &rarr;
        </Link>
      </div>
    ) : (
      <div className="grid grid-cols-1 gap-6 py-4 sm:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.name} {...project} />
        ))}
      </div>
    )}
  </>
)

export default Projects
