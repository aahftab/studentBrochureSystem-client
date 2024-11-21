import * as React from "react";
import { Link } from "react-router-dom";
import { ModeToggle } from "@/components/mode-toggle";
import AMULogo from "@/assets/amu-aligarh-muslim-university-logo-F582210441-seeklogo.com.png";
import {
  NavigationMenu,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(
    !!localStorage.getItem("isLoggedIn")
  );
  window.addEventListener("storage", () => {
    setIsLoggedIn(!!localStorage.getItem("isLoggedIn"));
  });
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
    <div className=" h-24 -z-10 flex  items-center w-full bg-slate-300  dark:bg-slate-700 dark:bg-opacity-50 bg-opacity-50 backdrop-blur">
      <div className="inline-block align-middle w-48 ">
        <Link to="/">
          <img src={AMULogo} className="inline m-4 size-20" alt="" />
          <span className="text-xl size-20 font-bold">AMU</span>
        </Link>
      </div>
      <div className="inline-block justify-center items-center">
        <NavigationMenu>
          <NavigationMenuList className="gap-3">
            <NavigationMenuItem>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                <Link to="/">Home page</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/dashboard">
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Dashboard
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/About">
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  About
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuIndicator className="NavigationMenuIndicator">
              <div className="Arrow" />
            </NavigationMenuIndicator>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div className="inline-block absolute end-20">
        <Button
          asChild
          className="inline-block mx-2 bg-blue-500 hover:bg-blue-400"
        >
          <Link to={"/admin"} target="_blank">
            Admin Panel
          </Link>
        </Button>
        {isLoggedIn && (
          <span>
            <Button
              onClick={logout}
              className="inline-block bg-blue-500 hover:bg-blue-400"
            >
              <LogOut className={"inline-block bg-inherit hover:bg-inherit"} />
            </Button>
          </span>
        )}
        {!isLoggedIn && (
          <span>
            <Button
              asChild
              className="inline-block mx-2 bg-blue-500 hover:bg-blue-400"
            >
              <Link to={"/login"}>
                Login
              </Link>
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
