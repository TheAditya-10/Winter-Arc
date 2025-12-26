"use server"

import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { isRegistered } from "@/utils/auth"


export default async function DashboardLayout({ children }) {

  const { status, redirectToRegister, sessionClaims } = await isRegistered()
  if (!status) return redirectToRegister()

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
          "--sidebar-width": "calc(var(--spacing) * 56)",
          "--header-height": "calc(var(--spacing) * 12)"
        }
      }>
      <AppSidebar variant="inset" user={user} />
      <SidebarInset>
        <SiteHeader user={user}/>
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            {children}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
