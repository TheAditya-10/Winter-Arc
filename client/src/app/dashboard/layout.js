"use server"

import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { auth } from "@clerk/nextjs/server"


export default async function DashboardLayout({ children }) {

  const { sessionClaims } = await auth()
  const user = {
    id: sessionClaims.id,
    email: sessionClaims.email,
    username: sessionClaims.publicMetadata.username,
    name: sessionClaims.firstName,
    avatar_url: sessionClaims.avatar_url
  }

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)"
        }
      }>
      <AppSidebar variant="inset" user={user}/>
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            {children}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
