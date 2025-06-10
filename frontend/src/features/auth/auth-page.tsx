import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoginForm } from "@/features/auth/components/login-form";
import { SignupForm } from "@/features/auth/components/signup-form";
import { useAppSelector } from "@/app/hooks";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AuthPage() {
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen  flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center opacity-10" />

      <Card className="w-full max-w-md relative backdrop-blur-sm bg-white/95 dark:bg-slate-800/95 shadow-2xl border-0">
        <CardHeader className="text-center space-y-4">
          <div>
            <div className="flex gap-2 items-center justify-center">
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                FilmSpot
              </CardTitle>
            </div>
            <CardDescription className="mt-3 text-slate-600 dark:text-slate-400">
              Your personal movie collection
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-5 rounded-full">
              <TabsTrigger value="login" className="rounded-full">Sign In</TabsTrigger>
              <TabsTrigger value="signup" className="rounded-full">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <LoginForm />
            </TabsContent>

            <TabsContent value="signup">
              <SignupForm />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
