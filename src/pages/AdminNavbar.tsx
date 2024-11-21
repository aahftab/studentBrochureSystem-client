import * as React from "react";
import { Link } from "react-router-dom";
import { ModeToggle } from "@/components/mode-toggle";
import AMULogo from "@/assets/amu-aligarh-muslim-university-logo-F582210441-seeklogo.com.png";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
export default function Navbar() {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = React.useState(
    !!localStorage.getItem("isAdminLoggedIn")
  );
  window.addEventListener("storage", () => {
    setIsAdminLoggedIn(!!localStorage.getItem("isAdminLoggedIn"));
  });

  const adminlogout = async () => {
    await fetch("http://localhost:3000/adminlogout", {
      mode: "cors",
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      console.log(res);
      localStorage.removeItem("isAdminLoggedIn");
      location.reload();
    });
  };

  return (
    <div className=" h-24 -z-10 flex  items-center justify-between w-full bg-slate-300  dark:bg-slate-700 dark:bg-opacity-50 bg-opacity-50 backdrop-blur">
      <div className="felx items-center space-x-4 ">
        <Link to="/admin" className="flex items-center space-x-2">
          <img src={AMULogo} className="m-4 h-10 w-10" alt="" />
          <span className="text-xl w-24 font-bold">AMU</span>
          <span className="text-4xl fixed px-[40%] font-extrabold tracking-tight lg:text-5xl">
        Admin Panel
      </span>
        </Link>
        </div>
        {isAdminLoggedIn &&
        <div className="flex justify-center items-center ml-auto">
              <NavigationMenu>
                <NavigationMenuList className="gap-3">
                  <NavigationMenuItem>
                    <Link to="/admin/registerstudent">
                      <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                      >
                        Register Student
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>}
      <div className="inline-block absolute end-20">
        {isAdminLoggedIn && (
          <>
            <span>
              <Button
                onClick={adminlogout}
                className="inline-block bg-blue-500 hover:bg-blue-400"
              >
                <LogOut
                  className={"inline-block bg-inherit hover:bg-inherit"}
                />
              </Button>
            </span>
          </>
        )}
        {!isAdminLoggedIn && (
          <span>
            <Button
              asChild
              className="inline-block mx-2 bg-blue-500 hover:bg-blue-400"
            >
              <Link to={"/admin/login"}>Login</Link>
            </Button>
          </span>
        )}
      </div>
      <div className="inline-block absolute end-5">
        <ModeToggle />
      </div>
    </div>
  );
}
