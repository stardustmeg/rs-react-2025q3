import React from 'react';
import { Link } from 'react-router';

import myPhoto from '@/assets/png/my-photo.png';
import { PATHS } from '@/router/constants';

const AboutPage: React.FC = () => {
  return (
    <div className="mx-auto flex max-w-[80%] flex-col items-center gap-4 p-4 transition-all duration-300">
      <h1 className="mb-4 text-3xl font-bold">About Me</h1>
      <img alt="Meg's Avatar" className="mb-4 h-32 w-32 rounded-full border-2 border-gray-300" src={myPhoto} />
      <a
        className="text-xl text-custom-chocolate hover:underline"
        href="https://github.com/stardustmeg"
        rel="noopener noreferrer"
        target="_blank"
      >
        My GitHub Profile
      </a>
      <p>
        Hi! I&apos;m Meg and I&apos;m obsessed with front-end development. It started off as a hobby I didn&apos;t know
        squat about but soon became the thing I can&apos;t imagine a single day without. Though challenging, this
        course, the people here, each task, and every challenge are going to be imbedded in my memory as some of the
        best experiences I&apos;ve ever had. Looking ahead, I am eager to further explore and expand my skill set, and
        contribute meaningfully to creating innovative digital solutions.
      </p>

      <a
        className="text-xl text-custom-chocolate transition-all duration-300 hover:underline"
        href="https://rs.school/courses/reactjs"
        rel="noopener noreferrer"
        target="_blank"
      >
        RS School React Course
      </a>

      <Link className="text-chocolate text-xl font-bold transition-all duration-300 hover:underline" to={PATHS.main}>
        Back to Home
      </Link>
    </div>
  );
};

export default AboutPage;
