"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="fixed top-6 left-1/2 z-10 -translate-x-1/2">
      <NavigationMenu>
        <NavigationMenuList className="flex gap-4">
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link href="#">Início</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link href="#">Sobre</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link href="#">Planos</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link href="#">Experimentar</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuLink asChild>
            <Link href="/login">
              <div>Login</div>
            </Link>
          </NavigationMenuLink>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default Navbar;
