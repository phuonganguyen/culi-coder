import Link from '@/components/Link'
import React from 'react'

interface ExperienceProps {
  title: string
  company: string
  range: string
  url?: string
  roles: string[]
  logoUrl?: string
}

const Role: React.FC<{ role: string }> = ({ role }) => (
  <li className="flex flex-row">
    <span className="text-primary-color dark:text-primary-color-dark mr-2 text-lg leading-7">
      &#8227;
    </span>
    <span className="text-gray-600 dark:text-gray-400">{role}</span>
  </li>
)

const Experience: React.FC<ExperienceProps> = ({ title, company, range, url, roles, logoUrl }) => {
  return (
    <div className="py-6 experience-section">
      <div className="flex flex-row items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="flex flex-wrap items-center text-xl font-semibold">
            <span className="text-gray-900 dark:text-gray-100">{title}</span>
            <span className="mx-2 text-gray-400 dark:text-gray-500">@</span>
            <span className="text-primary-color dark:text-primary-color-dark">
              {url ? (
                <Link href={url} className="no-underline hover:underline">
                  {company}
                </Link>
              ) : (
                company
              )}
            </span>
          </h3>
          <p className="mt-1 font-mono text-sm text-gray-400 dark:text-gray-500">{range}</p>

          <ul className="mt-3 space-y-1">
            {roles.map((role, index) => (
              <Role key={index} role={role} />
            ))}
          </ul>
        </div>
        {logoUrl && (
          <img
            src={logoUrl}
            alt={`${company} logo`}
            className="company-logo hidden h-16 w-16 shrink-0 rounded-md bg-white object-contain p-1 ring-1 ring-gray-200 dark:ring-gray-700 sm:block"
          />
        )}
      </div>
    </div>
  )
}

export default Experience
