"use client";

import { useState } from "react";
import { User, Upload } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    notifications: false,
    animations: true,
    motivationalMessages: true,
    emailVerified: false,
    linkedinConnect: true,
  });

  return (
    <div className="h-[calc(100vh-4rem)] w-full bg-slate-950 overflow-hidden flex flex-col font-sans selection:bg-cyan-500/30">
      <div className="flex-1 overflow-y-auto p-4 md:p-8 scrollbar-thin scrollbar-track-slate-900 scrollbar-thumb-slate-700">
        <div className="max-w-5xl mx-auto">
          
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="font-mono font-bold text-3xl tracking-wider text-white uppercase">Account</h1>
            <Button className="bg-slate-900 border border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white transition-all">
              SAVE CHANGES
            </Button>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* === LEFT COLUMN: FORM (Span 2) === */}
            <div className="lg:col-span-2">
              <h2 className="font-mono font-bold text-xl text-cyan-400 mb-6 uppercase tracking-wide">User Settings</h2>
              
              {/* Profile Picture */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-10 p-6 bg-slate-900/30 border border-slate-800 rounded-2xl">
                <span className="text-slate-400 w-32 font-medium">Profile picture</span>
                <div className="flex flex-col gap-2">
                  <Button className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold w-fit">
                    <Upload className="w-4 h-4 mr-2" />
                    CHOOSE FILE
                  </Button>
                  <p className="text-sm text-slate-500">no file selected</p>
                  <p className="text-xs text-slate-600">maximum image size is 1 MB</p>
                </div>
              </div>

              {/* Form Fields */}
              <div className="space-y-6 mb-10">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <Label className="text-slate-400 w-32 sm:text-right">Name</Label>
                  <Input 
                    type="text" 
                    defaultValue="Aryan Shukla"
                    className="bg-slate-900 border-slate-800 focus:border-cyan-500 text-white"
                  />
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <Label className="text-slate-400 w-32 sm:text-right">Username</Label>
                  <Input 
                    type="text" 
                    defaultValue="bacchahoonmai69"
                    className="bg-slate-900 border-slate-800 focus:border-cyan-500 text-white"
                  />
                </div>

                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  <Label className="text-slate-400 w-32 sm:text-right mt-3">Email</Label>
                  <div className="flex-1 w-full">
                    <Input 
                      type="email" 
                      defaultValue="baccha19kahojayega@gmail.com"
                      className="bg-slate-900 border-slate-800 focus:border-cyan-500 text-white"
                    />
                    <p className="text-xs text-red-400 mt-2">
                      Email not verified. <a href="#" className="underline hover:text-red-300">Verify now</a>
                    </p>
                  </div>
                </div>
              </div>

              {/* Settings Toggles */}
              <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
                <div className="grid md:grid-cols-2 gap-y-8 gap-x-12">
                  <ToggleItem 
                    label="Notifications" 
                    checked={settings.notifications} 
                    onChange={(c) => setSettings({ ...settings, notifications: c })} 
                  />
                  <ToggleItem 
                    label="Animations" 
                    checked={settings.animations} 
                    onChange={(c) => setSettings({ ...settings, animations: c })} 
                  />
                  <ToggleItem 
                    label="Motivational messages" 
                    checked={settings.motivationalMessages} 
                    onChange={(c) => setSettings({ ...settings, motivationalMessages: c })} 
                  />
                  <ToggleItem 
                    label="Email Verified" 
                    checked={settings.emailVerified} 
                    onChange={(c) => setSettings({ ...settings, emailVerified: c })} 
                  />
                  
                  <div className="md:col-span-2 pt-4 border-t border-slate-800">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-slate-200 font-medium">LinkedIn Connect</span>
                      <Switch
                        checked={settings.linkedinConnect}
                        onCheckedChange={(c) => setSettings({ ...settings, linkedinConnect: c })}
                      />
                    </div>
                    <p className="text-xs text-cyan-500">
                      LinkedIn not connected, <a href="#" className="underline hover:text-cyan-400">Link now</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* === RIGHT COLUMN: ACCOUNT CARD (Span 1) === */}
            <div className="lg:col-span-1">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center sticky top-6 shadow-lg shadow-cyan-900/5 hover:border-cyan-500/30 transition-all group">
                
                {/* Avatar */}
                <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(6,182,212,0.3)] group-hover:scale-105 transition-transform duration-300">
                  <User className="w-12 h-12 text-white" />
                </div>
                
                <h3 className="font-mono font-bold text-lg text-white mb-1">ARYAN SHUKLA</h3>
                <p className="text-sm text-slate-500 mb-8">@bacchahoonmai69</p>

                <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent mb-6" />
                
                <p className="text-slate-400 text-xs uppercase font-bold tracking-widest mb-4">Manage Courses</p>
                <Button variant="outline" className="w-full bg-slate-950 border-slate-800 text-slate-400 hover:text-white hover:border-slate-600 mb-8">
                  Account
                </Button>

                <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent mb-6" />
                
                <p className="text-xs text-red-400/80 mb-3">This action is permanent</p>
                <Button className="w-full bg-red-500/10 text-red-500 hover:bg-red-500/20 border border-red-500/20 mb-4 font-bold">
                  DELETE ACCOUNT
                </Button>

                <Button variant="ghost" className="w-full text-slate-500 hover:text-white hover:bg-slate-800">
                  LOGOUT
                </Button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

function ToggleItem({ label, checked, onChange }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-slate-300">{label}</span>
      <Switch checked={checked} onCheckedChange={onChange} />
    </div>
  );
}