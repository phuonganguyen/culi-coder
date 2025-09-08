import Link from "@/components/Link";
import React from 'react';

interface ExperienceProps {
  title: string;
  company: string;
  range: string;
  url?: string;
  roles: string[];
  logoUrl?: string;
}

const Role: React.FC<{ role: string }> = ({ role }) => (
  <div className="flex flex-row ">
    <div className="text-primary-color dark:text-primary-color-dark mr-2 text-lg"> &#8227;</div>
    <div className="text-gray-500 dark:text-gray-400">{role}</div>
  </div>
);

const Experience: React.FC<ExperienceProps> = ({ title, company, range, url, roles, logoUrl }) => {
  return (
    <div className="my-3 experience-section">
      {logoUrl && (
        <img src={logoUrl} alt="Company Logo" className="company-logo" style={{ maxWidth: 80, maxHeight: 80, marginBottom: 16 }} />
      )}
      <div className="flex flex-row text-xl">
        <span className="text-gray-500 dark:text-gray-400">{title}</span>{' '}
        <span className="text-gray-500 dark:text-gray-400">&nbsp;@&nbsp;</span>{' '}
        <span className="text-primary-color dark:text-primary-color-dark">
          <Link href={url} className="no-underline">
            {company}
          </Link>
        </span>
      </div>
      <div>
        <div className="p-1 font-mono text-gray-400 dark:text-gray-600 text-sm">{range}</div>

        <div className="p-2">
          {roles.map((role, index) => (
            <Role key={index} role={role} />
          ))}
        </div>
      </div>
      <div className="font-medium text-2xl justify-center dark:text-gray-600 text-gray-200  text-center">
        &#126;&#126;&#126;
      </div>
    </div>
  );
};

export default Experience;
