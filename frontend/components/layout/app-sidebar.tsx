"use client"

import * as React from "react"
import {
  NotepadText,
  Hammer,
  Building2,
  Camera,
  ChartBar,
  Database,
  Folder,
  Search,
  Settings,
  Users,
} from "lucide-react"

import { NavDocuments } from "@/components/layout/nav-documents"
import { NavMain } from "@/components/layout/nav-main"
import { NavSecondary } from "@/components/layout/nav-secondary"
import { NavUser } from "@/components/layout/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Work Entries",
      url: "/work-entries",
      icon: NotepadText,
    },
    {
      title: "Projects",
      url: "/projects",
      icon: Hammer,
    },
    {
      title: "Companies",
      url: "/companies",
      icon: Building2,
    },
    // {
    //   title: "Projects",
    //   url: "#",
    //   icon: Folder,
    // },
    // {
    //   title: "Team",
    //   url: "#",
    //   icon: Users,
    // },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: Settings,
    },
    // {
    //   title: "Get Help",
    //   url: "#",
    //   icon: Settings,
    // },
    {
      title: "Search",
      url: "#",
      icon: Search,
    },
  ],
  documents: [
    {
      name: "Data Library",
      url: "#",
      icon: Database,
    },
    {
      name: "Reports",
      url: "#",
      icon: Search,
    },
    {
      name: "Word Assistant",
      url: "#",
      icon: File,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offExamples" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                {/* <IconInnerShadowTop className="!size-5" /> */}
                <span className="text-base font-semibold">Paystub Dash</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavDocuments items={data.documents} /> */}
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
