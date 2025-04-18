'use client';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { loginUser } from '@/lib/redux/features/authSlice';
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import axios from "axios"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useState } from "react"
import { toast } from "sonner"

type LoginFormProps = React.ComponentPropsWithoutRef<"div"> & {
  searchParams?: { [key: string]: string | string[] | undefined }
};

export default function LoginForm({
  className,
  searchParams,
  ...props
}: LoginFormProps) {
  const dispatch = useAppDispatch();
  const { loading, error, isAuthenticated } = useAppSelector((state) => state.auth);
  const router = useRouter();

  // Remove searchParams from the props spread to avoid passing it to the div
  const { searchParams: _, ...divProps } = props;

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  const [userData, setUserData] = useState({
    email: "",
    password: ""
  })
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!userData.email || !userData.password) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      const result = await dispatch(loginUser(userData)).unwrap();
      toast.success("Login successful");

      // Check stepsCompleted from the user object
      if (result.user?.stepsCompleted === 2) {
        // If user has completed all steps, redirect to home
        router.push("/");
      } else {
        // If user hasn't completed all steps, redirect to data collection
        router.push("/user-data-collect");
      }
    } catch (error: any) {
      toast.error(error || "Login failed");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4" {...divProps}>
      <div className={cn("grid place-items-center w-full", className)} {...props}>
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    value={userData.email}
                    onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <Link
                      href="#"
                      className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    required
                    value={userData.password}
                    onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                  />
                </div>
                <Button type="submit" className="w-full">
                  {loading ? <Loader2 className="animate-spin" /> : "Login"}
                </Button>
                <Button variant="outline" className="w-full">
                  Login with Google
                </Button>
              </div>
              <div className="mt-4 text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link href="/signup" className="underline underline-offset-4">
                  Sign up
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
