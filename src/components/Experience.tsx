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
  <div className="flex items-start gap-2 py-1">
    <div className="text-primary-color dark:text-primary-color-dark text-lg">&#8227;</div>
    <div className="text-gray-700 dark:text-gray-300 text-base">{role}</div>
  </div>
);

const Experience: React.FC<ExperienceProps> = ({ title, company, range, url, roles, logoUrl }) => {
  return (
    <div className="my-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 flex flex-col items-center max-w-xl mx-auto border border-gray-100 dark:border-gray-800">
      {logoUrl && (
        <img
          src={logoUrl}
          alt="Company Logo"
          className="w-20 h-20 rounded-full object-cover mb-4 border-2 border-primary-color dark:border-primary-color-dark shadow"
        />
      )}
      <div className="flex flex-col items-center w-full mb-2">
        <div className="flex flex-row items-center text-xl font-semibold">
          <span className="text-gray-700 dark:text-gray-300">{title}</span>
          <span className="mx-2 text-gray-400">@</span>
          <span className="text-primary-color dark:text-primary-color-dark">
            <Link
              href={url}
              className="hover:underline hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              {company}
            </Link>
          </span>
        </div>
        <div className="font-mono text-gray-400 dark:text-gray-500 text-sm mt-1">{range}</div>
      </div>
      <div className="w-full mt-2 bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
        {roles.map((role, index) => (
          <Role key={index} role={role} />
        ))}
      </div>
      <div className="font-medium text-2xl text-center text-gray-300 dark:text-gray-600 mt-4 select-none">
        &#126;&#126;&#126;
      </div>
    </div>
  );
};

export default Experience;
