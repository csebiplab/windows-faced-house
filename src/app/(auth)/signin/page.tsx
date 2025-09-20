import { LoginForm } from "@/components/auth/Login";
import getCurrentUser from "@/lib/session";
import { redirect } from "next/navigation";

export default async function page() {
  const user = await getCurrentUser();

  if (user) {
    redirect("/dashboard/profile/me");
  }

  return (
    <div className="">
      <LoginForm />
    </div>
  );
}
