function About() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">About the Student Brochure System</h1>
      <p className="mb-4">
        The <strong>Student Brochure System</strong> at <strong>Aligarh Muslim University (AMU)</strong> is a dynamic platform designed to streamline the process of showcasing students' academic, extracurricular, and professional achievements.
      </p>
      <p className="mb-4">
        It serves as a centralized repository where students can create, update, and manage personalized brochures that highlight their unique profiles.
      </p>
      <p className="mb-4">This system offers the following features:</p>
      <ul className="list-disc list-inside mb-4">
        <li className="mb-2">
          <strong>Customizable Templates:</strong> Allowing students to design brochures that reflect their individuality and aspirations.
        </li>
        <li className="mb-2">
          <strong>Achievements Showcase:</strong> Highlighting academic excellence, extracurricular participation, and accolades.
        </li>
        <li className="mb-2">
          <strong>Real-Time Updates:</strong> Enabling students to maintain an up-to-date profile throughout their academic journey.
        </li>
        <li className="mb-2">
          <strong>Student Directory:</strong> Providing a searchable list of students and their profiles.
        </li>
        <li className="mb-2">
          <strong>Secure Access:</strong> Ensuring that student data is protected and accessible only to authorized users.
        </li>
      </ul>
    </div>
  );
}

export default About;
