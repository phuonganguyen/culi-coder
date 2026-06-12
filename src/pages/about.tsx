import Experience from '@/components/Experience'
import Link from '@/components/Link'
import PageTitle from '@/components/PageTitle'
import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import Image from 'next/image'
import { RoughNotation } from 'react-rough-notation'
import { getExperiences } from 'src/services'

export async function getStaticProps() {
  const experiences = (await getExperiences()) || []

  return { props: { experiences }, revalidate: 10 }
}

const About = ({experiences}) => (
  <>
    <PageSEO title={`About - ${siteMetadata.author}`} description={siteMetadata.description} />
    <div className="pt-6 pb-8 space-y-2 md:space-y-5">
      <PageTitle>About</PageTitle>
    </div>
    <div className="items-start space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0">
      <div className="flex flex-col items-center pt-8 space-x-2">
        <Image
          src="/static/avatar.jpg"
          alt="avatar"
          width="192px"
          height="192px"
          className="w-48 h-48 rounded-full"
        />
        <h3 className="pt-4 pb-2 text-2xl font-bold leading-8 tracking-tight">Phuong Nguyen</h3>
        <div className="text-gray-500 dark:text-gray-400">Senior Software Engineer</div>
        <div className="text-gray-500 dark:text-gray-400">Ho Chi Minh City</div>
      </div>
      <div className="pt-8 pb-8 prose dark:prose-dark max-w-none xl:col-span-2">
        <p>
          I graduated with a bachelor of information systems degree from Hoa Sen University in the
          summer of 2014. I live in Ho Chi Minh City.
        </p>
        <p>
          <RoughNotation type="bracket" brackets={['left', 'right']} show={true} color="#c78a3b">
            I'm very dedicated to learning new things and truly believe that you should never stop
            learning. I enjoy creating different things, whether that be websites, applications, or
            anything in between.
          </RoughNotation>
        </p>
        <p>
          At my first full-time job as a developer I feel like I've been very lucky to experience a
          broad and diverse range of projects and tasks. I get to deal with everything from user
          feedback and design to backend tests and improving parts of our daily operations.{' '}
          <RoughNotation type="underline" show={true} color="#c78a3b" animationDelay={1000}>
            <Link
              href={'/uses'}
              className="hover:text-primary-color dark:hover:text-primary-color-dark no-underline"
            >
              Here{' '}
            </Link>
          </RoughNotation>{' '}
          you can see what I use on a daily basis.
        </p>
        <p>
          Feel free to reach out if you have anything to talk about, you can reach me on{' '}
          <RoughNotation type="highlight" show={true} color="#f0dcb8" animationDelay={1200}>
            <span className="dark:text-gray-800">phuong.nguyenanh06@gmail.com </span>
          </RoughNotation>
          or on social media.
        </p>
      </div>
    </div>
    <div className="mt-10">
      <div className="pt-6 pb-8 space-y-2 md:space-y-5">
        <h2 className="font-display text-3xl font-semibold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10">
          Experience
        </h2>
      </div>
      <div className="max-w-none divide-y divide-gray-200 dark:divide-gray-800 xl:col-span-2">
        {experiences.map((d, index) => (
          <Experience
            key={index}
            title={d.title}
            company={d.company}
            range={`${formatMonthYear(d.startDate)} - ${
              d.current ? 'Present' : formatMonthYear(d.endDate)
            }`}
            url={d.companyUrl}
            roles={d.description.text.split('\\n').filter((role) => role.trim() !== '')}
            logoUrl={d.companyLogo?.url}
          />
        ))}
      </div>
    </div>
  </>
)
function formatMonthYear(dateStr) {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;
  return date.toLocaleString('en-US', { month: 'long', year: 'numeric' });
}

export default About
