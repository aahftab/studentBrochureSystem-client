import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardHeader, CardFooter, CardContent } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";

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

type PortfolioType = {
  email: string;
  githubProfile: string;
  name: string;
  programmingLanguages: ProgrammingLanguage[];
  libraries: Library[];
  frameworks: Framework[];
  projects: Project[];
};

function Portfolio() {
  const { id } = useParams<{ id: string }>();
  const [portfolio, setPortfolio] = useState<PortfolioType | null>(null);

  useEffect(() => {
    fetch(`http://localhost:3000/portfolio/${id}`)
      .then((response) => response.json())
      .then((data) => setPortfolio(data))
      .catch((error) => {
        toast({
          title: "Error fetching portfolio",
          description: error.message,

        });
      });
  }, [id]);

  if (!portfolio) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="border p-4 rounded shadow-lg">
        <CardHeader>
          <h2 className="text-2xl font-bold">{portfolio.name}</h2>
          <p className="text-gray-600">{portfolio.email}</p>
          <p className="text-blue-500">
            <a href={portfolio.githubProfile} target="_blank" rel="noopener noreferrer">
              GitHub Profile
            </a>
          </p>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <h3 className="text-lg font-medium">Programming Languages</h3>
            <ul className="list-disc list-inside">
              {portfolio.programmingLanguages?.map((lang, index) => (
                <li key={index}>
                  {lang.name} - {lang.fluency}
                </li>
              ))}
            </ul>
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-medium">Libraries</h3>
            <ul className="list-disc list-inside">
              {portfolio.libraries?.map((lib, index) => (
                <li key={index}>
                  {lib.name} - {lib.fluency}
                </li>
              ))}
            </ul>
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-medium">Frameworks</h3>
            <ul className="list-disc list-inside">
              {portfolio.frameworks?.map((framework, index) => (
                <li key={index}>
                  {framework.name} - {framework.fluency}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium">Projects</h3>
            {portfolio.projects?.map((project, index) => (
              <div key={index} className="border p-4 rounded mt-4 shadow-sm">
                <h4 className="font-bold text-xl">{project.projectName}</h4>
                <p className="text-gray-700">{project.projectDescription}</p>
                <p className="text-gray-600">Duration: {project.projectDuration}</p>
                {project.projectLink && (
                  <p>
                    Link:{" "}
                    <a href={project.projectLink} className="text-blue-500" target="_blank" rel="noopener noreferrer">
                      {project.projectLink}
                    </a>
                  </p>
                )}
                <span className="font-medium mt-2">Technologies Used:</span>
                <p>{project.technologiesUsed}</p>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Portfolio;