import { Project } from '@/data/projectsData'
import Image from 'next/image'
import React from 'react'
import { FiExternalLink, FiGithub } from 'react-icons/fi'

import Link from './Link'

const ProjectCard: React.FC<Project> = ({
  name,
  role,
  description,
  technologies,
  link,
  repo,
  thumbnail,
}) => (
  <div className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white transition duration-200 hover:-translate-y-1 hover:shadow-md dark:border-gray-800 dark:bg-gray-900/40">
    <div className="relative h-40 w-full overflow-hidden">
      {thumbnail ? (
        <Image
          src={thumbnail}
          alt={name}
          layout="fill"
          objectFit="cover"
          className="transition duration-300 group-hover:scale-105"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-gray-100 dark:bg-gray-800">
          <span className="select-none font-display text-6xl font-semibold text-primary-color/60 dark:text-primary-color-dark/50">
            {name.charAt(0)}
          </span>
        </div>
      )}
    </div>

    <div className="flex flex-1 flex-col p-5">
      <div className="flex items-start justify-between gap-2">
        <h2 className="font-display text-xl font-semibold text-gray-900 dark:text-gray-100">
          {name}
        </h2>
        <div className="mt-1 flex shrink-0 items-center gap-3 text-gray-400">
          {repo && (
            <Link
              href={repo}
              aria-label={`${name} source code`}
              className="transition hover:text-primary-color dark:hover:text-primary-color-dark"
            >
              <FiGithub size={18} />
            </Link>
          )}
          {link && (
            <Link
              href={link}
              aria-label={`${name} live demo`}
              className="transition hover:text-primary-color dark:hover:text-primary-color-dark"
            >
              <FiExternalLink size={18} />
            </Link>
          )}
        </div>
      </div>

      {role && (
        <p className="mt-0.5 text-sm font-medium text-primary-color dark:text-primary-color-dark">
          {role}
        </p>
      )}

      <p className="mt-2 flex-1 text-sm leading-6 text-gray-600 dark:text-gray-400">
        {description}
      </p>

      {technologies?.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {technologies.map((tech) => (
            <span
              key={tech}
              className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-300"
            >
              {tech}
            </span>
          ))}
        </div>
      )}
    </div>
  </div>
)

export default ProjectCard
