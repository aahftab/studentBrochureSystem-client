import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export default function LogoutButton({ className }: { className: string }) {
  const logout = async () => {
    await fetch("http://localhost:3000/logout", {
      mode: "cors",
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      console.log(res);
      localStorage.removeItem("isLoggedIn");
      location.reload();
    });
  };
  return (
    <Button onClick={logout} className={className}>
      <LogOut className={"inline-block bg-inherit hover:bg-inherit"} />
    </Button>
  );
}
