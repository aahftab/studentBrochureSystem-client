import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
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

type StudentType = {
  _id: string;
  name: string;
  email: string;
  programmingLanguages: ProgrammingLanguage[];
  libraries: Library[];
  frameworks: Framework[];
};

function Home() {
  const [students, setStudents] = useState<StudentType[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<keyof StudentType | "">("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    fetch("http://localhost:3000/fetchStudents")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setStudents(data);
        } else {
          throw new Error("Invalid data format");
        }
      })
      .catch((error) => {
        console.log(error);
        toast({
          title: "Error fetching students",
          description: error.message,
        });
      });
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSort = (field: keyof StudentType) => {
    const order = sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(order);
  };

  const filteredStudents = students
    .filter((student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.programmingLanguages.some((lang) =>
        lang.name.toLowerCase().includes(searchTerm.toLowerCase())
      ) ||
      student.libraries.some((lib) =>
        lib.name.toLowerCase().includes(searchTerm.toLowerCase())
      ) ||
      student.frameworks.some((framework) =>
        framework.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
    .sort((a, b) => {
      if (!sortField) return 0;
      const aValue = a[sortField];
      const bValue = b[sortField];
      if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
      if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
          className="border p-2 rounded w-full"
        />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell onClick={() => handleSort("name")}>Name</TableCell>
            <TableCell onClick={() => handleSort("email")}>Email</TableCell>
            <TableCell>Portfolio</TableCell>
            <TableCell>Languages</TableCell>
            <TableCell>Libraries</TableCell>
            <TableCell>Frameworks</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredStudents.map((student) => (
            <TableRow key={student._id}>
              <TableCell>{student.name}</TableCell>
              <TableCell>{student.email}</TableCell>
              <TableCell>
                <Link to={`/portfolio/${student._id}`} className="text-blue-500">
                  View Portfolio
                </Link>
              </TableCell>
              <TableCell>
                {student.programmingLanguages.map((lang) => lang.name).join(", ")}
              </TableCell>
              <TableCell>
                {student.libraries.map((lib) => lib.name).join(", ")}
              </TableCell>
              <TableCell>
                {student.frameworks.map((framework) => framework.name).join(", ")}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default Home;
