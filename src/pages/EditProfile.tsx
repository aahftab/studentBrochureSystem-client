import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Trash2 } from "lucide-react";

const FluencyEnum = z.enum(["Beginner", "Intermediate", "Advanced", "Expert"]);

const programmingLanguagesSchema = z.object({
  name: z.string(),
  fluency: FluencyEnum,
});

const LibrariesSchema = z.object({
  name: z.string(),
  fluency: FluencyEnum,
});

const FrameworksSchema = z.object({
  name: z.string(),
  fluency: FluencyEnum,
});


const projectSchema = z.object({
  projectName: z.string().min(2, { message: "Project name must be at least 2 characters." }),
  projectDescription: z.string().min(10, { message: "Project description must be at least 10 characters." }),
  technologiesUsed: z.string(),
  projectLink: z.string().url().optional(),
  projectDuration: z.string().min(2, { message: "Project duration must be at least 2 characters." }),
});

const FormSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  githubProfile: z.string().min(2, { message: "GitHub Profile ID must be at least 2 characters." }),
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  programmingLanguages: z.array(programmingLanguagesSchema),
  libraries: z.array(LibrariesSchema),
  frameworks: z.array(FrameworksSchema),
  projects: z.array(projectSchema),
});

type FormData = z.infer<typeof FormSchema>;

function EditProfile() {
  const [initialData, setInitialData] = useState<FormData | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: initialData || {
      email: "",
      githubProfile: "",
      name: "",
      programmingLanguages: [],
      libraries: [],
      frameworks: [],
      projects: [],
    },
  });

  const { fields: languageFields, append: appendLanguage, remove: removeLanguage } = useFieldArray({
    control: form.control,
    name: "programmingLanguages",
  });

  const { fields: libraryFields, append: appendLibrary, remove: removeLibrary } = useFieldArray({
    control: form.control,
    name: "libraries",
  });

  const { fields: frameworkFields, append: appendFramework, remove: removeFramework } = useFieldArray({
    control: form.control,
    name: "frameworks",
  });

  const { fields: projectFields, append: appendProject, remove: removeProject } = useFieldArray({
    control: form.control,
    name: "projects",
  });

  useEffect(() => {
    fetch("http://localhost:3000/fetchPortfolio",{
      mode: "cors",
      method: "GET",
      credentials: "include",
    } )
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          setInitialData(data);
          form.reset(data);
        }
      })
      .catch((error) => {
        if(error.message !== "The string did not match the expected pattern.") {
        toast({
          title: "Error fetching profile",
          description: error.message,
        });
      }
      });
  }, [form]);

  async function onSubmit(data: FormData) {
    try {
      const response = await fetch("http://localhost:3000/submitportfolio", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data, null, 2),
      });
      console.log(response);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.msg || "Update failed");
      }

      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Error updating profile",
        description: "Something went wrong while updating your profile.",
      });
    }
  }

  return localStorage.getItem("isLoggedIn") === "true" ? (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Profile</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col space-y-6 pb-12 mx-auto max-w-3xl"
        >
          <div className="flex space-x-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your email"
                      className=" w-full"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="githubProfile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>GitHub Profile ID</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter GitHub Profile ID" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex space-x-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <h3 className="text-lg font-medium">Programming Languages</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Programming Language</TableHead>
                  <TableHead>Fluency</TableHead>
                  <TableHead className=" w-[50px] text-center">Delete</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {languageFields.map((item, index) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">
                      <FormField
                        control={form.control}
                        name={`programmingLanguages.${index}.name`}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                placeholder="Enter programming language"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </TableCell>
                    <TableCell>
                      <FormField
                        control={form.control}
                        name={`programmingLanguages.${index}.fluency`}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select fluency" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Beginner">Beginner</SelectItem>
                                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                                  <SelectItem value="Advanced">Advanced</SelectItem>
                                  <SelectItem value="Expert">Expert</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </TableCell>
                    <TableCell className="text-center">
                      <Button
                        type="button"
                        variant={"destructive"}
                        onClick={() => removeLanguage(index)}
                      >
                        <Trash2 color="white" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Button
              type="button"
              variant={"secondary"}
              className="mt-[32px]"
              onClick={() => appendLanguage({ name: "", fluency: "Beginner" })}
            >
              Add Programming Language
            </Button>
          </div>
          <div>
            <h3 className="text-lg font-medium">Libraries</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Library</TableHead>
                  <TableHead>Fluency</TableHead>
                  <TableHead className=" w-[50px] text-center">Delete</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {libraryFields.map((item, index) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">
                      <FormField
                        control={form.control}
                        name={`libraries.${index}.name`}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                placeholder="Enter library"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </TableCell>
                    <TableCell>
                      <FormField
                        control={form.control}
                        name={`libraries.${index}.fluency`}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select fluency" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Beginner">Beginner</SelectItem>
                                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                                  <SelectItem value="Advanced">Advanced</SelectItem>
                                  <SelectItem value="Expert">Expert</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </TableCell>
                    <TableCell className="text-center">
                      <Button
                        type="button"
                        variant={"destructive"}
                        onClick={() => removeLibrary(index)}
                      >
                        <Trash2 color="white" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Button
              type="button"
              variant={"secondary"}
              className="mt-[32px]"
              onClick={() => appendLibrary({ name: "", fluency: "Beginner" })}
            >
              Add Library
            </Button>
          </div>
          <div>
            <h3 className="text-lg font-medium">Frameworks</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Framework</TableHead>
                  <TableHead>Fluency</TableHead>
                  <TableHead className=" w-[50px] text-center">Delete</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {frameworkFields.map((item, index) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">
                      <FormField
                        control={form.control}
                        name={`frameworks.${index}.name`}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                placeholder="Enter framework"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </TableCell>
                    <TableCell>
                      <FormField
                        control={form.control}
                        name={`frameworks.${index}.fluency`}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select fluency" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Beginner">Beginner</SelectItem>
                                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                                  <SelectItem value="Advanced">Advanced</SelectItem>
                                  <SelectItem value="Expert">Expert</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </TableCell>
                    <TableCell className="text-center">
                      <Button
                        type="button"
                        variant={"destructive"}
                        onClick={() => removeFramework(index)}
                      >
                        <Trash2 color="white" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Button
              type="button"
              variant={"secondary"}
              className="mt-[32px]"
              onClick={() => appendFramework({ name: "", fluency: "Beginner" })}
            >
              Add Framework
            </Button>
          </div>
          <div>
            <h3 className="text-lg font-medium">Projects</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Project Name</TableHead>
                  <TableHead>Project Description</TableHead>
                  <TableHead>Technologies Used</TableHead>
                  <TableHead>Project Link</TableHead>
                  <TableHead>Project Duration</TableHead>
                  <TableHead className=" w-[50px] text-center">Delete</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projectFields.map((item, index) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">
                      <FormField
                        control={form.control}
                        name={`projects.${index}.projectName`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Project Name</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter project name"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </TableCell>
                    <TableCell>
                      <FormField
                        control={form.control}
                        name={`projects.${index}.projectDescription`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Project Description</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Enter project description"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </TableCell>
                    <TableCell>
                    <FormField
                        control={form.control}
                        name={`projects.${index}.technologiesUsed`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Technology</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder=""
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </TableCell>
                    <TableCell>
                      <FormField
                        control={form.control}
                        name={`projects.${index}.projectLink`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Project Link</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter project link"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </TableCell>
                    <TableCell>
                      <FormField
                        control={form.control}
                        name={`projects.${index}.projectDuration`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Project Duration</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter project duration"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </TableCell>
                    <TableCell className="text-center">
                      <Button
                        type="button"
                        variant={"destructive"}
                        onClick={() => removeProject(index)}
                      >
                        <Trash2 color="white" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Button
              type="button"
              variant={"secondary"}
              className="mt-[32px]"
              onClick={() =>
                appendProject({
                  projectName: "",
                  projectDescription: "",
                  technologiesUsed: "",
                  projectLink: "",
                  projectDuration: "",
                })
              }
            >
              Add Project
            </Button>
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  ) : (
    <div className="container mx-auto p-4 text-center">
      <h2 className="text-2xl font-bold mb-4">You need to log in to edit your profile</h2>
      <Link to="/login">
        <Button className="btn btn-primary">Go to Login</Button>
      </Link>
    </div>
  );
}

export default EditProfile;
