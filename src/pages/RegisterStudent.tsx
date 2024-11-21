import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const loginSchema = z.object({
  email: z.string().email(),
  pass: z.string().min(6),
});

export default function RegisterStudent() {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      pass: "",
    },
  });

  async function onSubmit(data: z.infer<typeof loginSchema>) {
    try {
      const response = await fetch("http://localhost:3000/register", {
        mode: "cors",
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data, null, 2),
      });
      if(response.status === 401) {
        toast({
          title: "Registration Unsuccessfull",
          description: "You are not authorized to register",
        });
        form.reset();
      }
      else if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.msg || "Registration failed");
      }
      // const responseData = await response.json();
      else {
      toast({
        title: "Registration Successfull",
        description: "New user created successfully",
      });
      form.reset();
    }
    } catch (error) {
      toast({
        title: "Registration failed",
        description: (error as Error).message,
      });
      console.log(error);
    }
  }
  return (
    <>
    {localStorage.getItem("isAdminLoggedIn") === "true" &&
    <div className="flex flex-col h-[100%]">
      <h1 className="text-4xl text-center font-extrabold mt-[10%] tracking-tight lg:text-5xl">
        Register Student
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col space-y-6 pb-12 mx-auto max-w-lg mt-20 h-[50%] w-full px-4 sm:px-0"
        >
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
            name="pass"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your password"
                    className=" w-full"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
        </Form>
    </div>
    }
    </>
  );
}
