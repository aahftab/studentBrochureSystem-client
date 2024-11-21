import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardFooter,
  CardContent,
} from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

type FluencyEnum = "Beginner" | "Intermediate" | "Advanced" | "Expert";

type ProgrammingLanguage = {
  name: string;
  fluency: FluencyEnum;
};

type Framework = {
  name: string;
  fluency: FluencyEnum;
};

type Library = {
  name: string;
  fluency: FluencyEnum;
};

type Project = {
  projectName: string;
  projectDescription: string;
  technologiesUsed: string;
  projectLink?: string;
  projectDuration: string;
};

type StudentType = {
  email: string;
  githubProfile: string;
  name: string;
  programmingLanguages: ProgrammingLanguage[];
  libraries: Library[];
  frameworks: Framework[];
  projects: Project[];
};

function Dashboard() {
  const [student, setStudent] = useState<StudentType | null>(null);

  useEffect(() => {
    fetch("http://localhost:3000/fetchPortfolio", {
      mode: "cors",
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => setStudent(data))
      .catch((error) => {
        console.error(error);
        if (
          error.message !== "The string did not match the expected pattern."
        ) {
          toast({
            title: "Error fetching profile",
            description: error.message,
          });
        }
      });
  }, []);

  if (localStorage.getItem("isLoggedIn") === "true") {
    if (!student) {
      return (
        <CardFooter>
          <Link to="/editportfolio">
            <Button className="btn btn-primary">Edit Portfolio</Button>
          </Link>
        </CardFooter>
      );
    } else {
      return (
        <div className="container mx-auto p-4">
          <Card className="border p-4 rounded shadow-lg">
            <CardHeader>
              <h2 className="text-2xl font-bold">{student.name}</h2>
              <p className="text-gray-600">{student.email}</p>
              <p className="text-blue-500">
                <a
                  href={student.githubProfile}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub Profile
                </a>
              </p>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <h3 className="text-lg font-medium">Programming Languages</h3>
                <ul className="list-disc list-inside">
                  {student.programmingLanguages?.map((lang, index) => (
                    <li key={index}>
                      {lang.name} - {lang.fluency}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mb-4">
                <h3 className="text-lg font-medium">Libraries</h3>
                <ul className="list-disc list-inside">
                  {student.libraries?.map((lib, index) => (
                    <li key={index}>
                      {lib.name} - {lib.fluency}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mb-4">
                <h3 className="text-lg font-medium">Frameworks</h3>
                <ul className="list-disc list-inside">
                  {student.frameworks?.map((framework, index) => (
                    <li key={index}>
                      {framework.name} - {framework.fluency}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-medium">Projects</h3>
                {student.projects?.map((project, index) => (
                  <div key={index} className="border p-2 rounded mt-2">
                    <h4 className="font-bold">{project.projectName}</h4>
                    <p>{project.projectDescription}</p>
                    <p>Duration: {project.projectDuration}</p>
                    {project.projectLink && (
                      <p>
                        Link:{" "}
                        <a
                          href={project.projectLink}
                          className="text-blue-500"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {project.projectLink}
                        </a>
                      </p>
                    )}
                    <span className="font-medium">Technologies Used: </span>
                    <span>{project.technologiesUsed}</span>
                    <ul className="list-disc list-inside"></ul>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Link to="/editportfolio">
                <Button className="btn btn-primary">Edit Portfolio</Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      );
    }
  } else {
    return (
      <div className="container mx-auto p-4 text-center">
        <h2 className="text-2xl font-bold mb-4">
          You need to log in to view profile
        </h2>
        <Link to="/login">
          <Button className="btn btn-primary">Go to Login</Button>
        </Link>
      </div>
    );
  }
}

export default Dashboard;
