"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Upload, ArrowLeft, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ChallengeSubmissionClient({ challenge, tasks, isRegistered, completedTaskMap }) {
  const router = useRouter();
  const fileInputRef = useRef(null);
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // If tasks exist, we use the first one as the active task for this UI
  const activeTask = tasks && tasks.length > 0 ? tasks[0] : null;
  const isCompleted = activeTask ? completedTaskMap?.has(activeTask.id) : false;

  const handleSubmit = async () => {
    // Basic validation
    if (!file && !description) return; 

    setIsSubmitting(true);

    // TODO: Connect this to your Supabase upload logic later
    // await uploadProof(file, description, challenge.id, activeTask.id);

    // Simulate network delay for effect
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Navigate to the success page
    router.push("/mission-complete");
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-950 relative overflow-hidden text-slate-100 font-sans selection:bg-cyan-500/30">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[100px] opacity-30"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] opacity-30"></div>
      </div>

      <div className="max-w-6xl mx-auto p-4 md:p-8 relative z-10">
        
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="mb-8 w-10 h-10 md:w-12 md:h-12 rounded-full border border-slate-700 bg-slate-900/50 flex items-center justify-center hover:bg-slate-800 hover:text-cyan-400 transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        </button>

        {/* Header Section */}
        <div className="mb-10">
          <h1 className="text-2xl md:text-3xl font-bold text-cyan-400 mb-4 uppercase tracking-wider font-mono">
            {challenge?.title || "Weekly Challenge"}
          </h1>
          <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
             <p className="text-slate-300 text-sm md:text-base leading-relaxed font-mono">
               {activeTask ? `Q. ${activeTask.description}` : (challenge?.description || "Loading description...")}
             </p>
          </div>
        </div>

        {/* Not Registered Warning */}
        {!isRegistered && (
            <div className="mb-8 p-4 bg-yellow-500/10 border border-yellow-500/50 rounded-lg flex items-center gap-3 text-yellow-500">
                <AlertCircle className="w-5 h-5" />
                <span>You must register for this challenge to submit work.</span>
            </div>
        )}

        <hr className="border-slate-800 mb-10" />

        {/* Submission Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          
          {/* Upload Section */}
          <div className="flex flex-col">
            <h2 className="font-bold text-xl mb-2 text-white">Upload Proof Of Work</h2>
            <p className="text-sm text-slate-500 mb-6">Max Size: 2 MB</p>

            <div
              onClick={() => isRegistered && !isCompleted && fileInputRef.current?.click()}
              className={`group relative h-80 rounded-2xl border flex flex-col items-center justify-center transition-all duration-300
                ${!isRegistered || isCompleted 
                    ? "bg-slate-900/20 border-slate-800 cursor-not-allowed opacity-60" 
                    : "bg-slate-900/40 border-slate-800 cursor-pointer hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] hover:bg-slate-900/60 backdrop-blur-sm"
                }`}
            >
              <div className="p-4 rounded-full bg-slate-950 border border-slate-800 mb-4 group-hover:scale-110 transition-transform duration-300">
                <Upload className={`w-8 h-8 ${isCompleted ? "text-green-500" : "text-slate-400 group-hover:text-cyan-400"}`} />
              </div>
              
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                disabled={!isRegistered || isCompleted}
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                accept="image/*,video/*,.pdf,.doc,.docx"
              />
              
              {isCompleted ? (
                 <p className="text-green-500 font-bold text-lg">Task Completed ✅</p>
              ) : file ? (
                <div className="flex flex-col items-center gap-2 px-6">
                    <p className="text-sm text-cyan-400 font-medium text-center break-all">{file.name}</p>
                    <span className="text-xs text-green-500 font-mono">Ready to upload</span>
                </div>
              ) : (
                <span className="text-slate-500 text-sm font-medium group-hover:text-slate-300 transition-colors">
                    {!isRegistered ? "Register to upload" : "Click to upload file"}
                </span>
              )}
            </div>

            <div className="mt-4 space-y-1 text-center">
              <p className="text-xs text-slate-500">Accepted: Screenshots, Code, Notes, Video Links</p>
              <p className="text-xs text-slate-600">(Required For XP Verification)</p>
            </div>
          </div>

          {/* Description Section */}
          <div className="flex flex-col">
            <h2 className="font-bold text-xl mb-2 text-white">Description Of The Task</h2>
            <p className="text-sm text-slate-500 mb-6">Explain briefly what you learned</p>

            <div className="h-80 rounded-2xl border border-slate-800 bg-slate-900/40 backdrop-blur-sm p-1 focus-within:border-cyan-500/50 transition-all duration-300">
              <textarea
                value={description}
                disabled={!isRegistered || isCompleted}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={`Answer In The Following Format:\n\n• What You Learned\n• What You Struggled With\n• What You Improved`}
                className="w-full h-full bg-transparent resize-none p-5 focus:outline-none text-slate-300 placeholder:text-slate-600 text-sm leading-relaxed rounded-xl font-mono disabled:opacity-50"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-12 mb-8 flex justify-center md:justify-start">
          <Button
            onClick={handleSubmit}
            disabled={!isRegistered || isCompleted || (!file && !description) || isSubmitting}
            className="w-full md:w-auto bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-lg px-12 py-6 h-auto rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] disabled:opacity-50 disabled:shadow-none transition-all uppercase tracking-wide active:scale-95"
          >
            {isSubmitting ? "Submitting..." : isCompleted ? "Submitted" : "Submit To The Arc"}
          </Button>
        </div>
      </div>
    </div>
  );
}