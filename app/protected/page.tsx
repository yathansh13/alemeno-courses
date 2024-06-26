import DeployButton from "@/components/DeployButton";
import AuthButton from "@/components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import FetchDataSteps from "@/components/tutorial/FetchDataSteps";
import Header from "@/components/Header";
import { redirect } from "next/navigation";
import UserDashboard from "@/components/UserDashboard";
import "./dashnav.css";

export default async function ProtectedPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <div className="w-full">
        <nav className="w-full flex flex-col-sm h-auto justify-center border-b border-b-foreground/10 h-16">
          <div className="dashnav w-full max-w-4xl flex justify-between items-center p-3 text-sm">
            <DeployButton />
            <p>Student dashboard</p>
            <AuthButton />
          </div>
        </nav>
        <UserDashboard userid={user.id} />
      </div>
    </div>
  );
}
