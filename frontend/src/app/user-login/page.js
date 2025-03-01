"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const Page = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="min-h-screen bg-[#F9FDFF] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full max-w-md dark:text-white border-[#0E42D2]">
          <CardHeader>
            <CardTitle className="flex justify-center">
              <img src="/images/logo.png" alt="Vibely" className="w-20" />
            </CardTitle>
            <CardDescription className="text-center text-[#1CA2C1]">
              Cùng học tập và kết bạn ở khắp mọi nơi trên thế giới trên Vibely
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-slate-200">
                <TabsTrigger
                  value="login"
                  className="text-[#086280] data-[state=active]:text-[#086280] data-[state=active]:font-bold"
                >
                  Đăng nhập
                </TabsTrigger>
                <TabsTrigger
                  value="signup"
                  className="text-[#086280] data-[state=active]:text-[#086280] data-[state=active]:font-bold"
                >
                  Đăng ký
                </TabsTrigger>
              </TabsList>
              {/* Tab đăng nhập */}
              <TabsContent value="login">
                <form>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="loginEmail" className="text-[#086280]">Email</Label>
                      <Input
                        id="loginEmail"
                        name="email"
                        type="email"
                        placeholder="Nhập email của bạn"
                        className="col-span-3 dark:border-gray-400 border-[#0E42D2] placeholder:text-gray-400"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="loginPassword" className="text-[#086280]">Mật khẩu</Label>
                      <Input
                        id="loginPassword"
                        name="password"
                        type="password"
                        placeholder="Nhập mật khẩu của bạn"
                        className="col-span-3 dark:border-gray-400 border-[#0E42D2] placeholder:text-gray-400"
                      />
                    </div>
                    <Button
                      className="w-full bg-[#23CAF1] text-white"
                      type="submit"
                    >
                      Đăng nhập
                    </Button>
                  </div>
                </form>

                {/* Nút đăng nhập bằng Google chỉ hiển thị ở tab Đăng nhập */}
                <div className="relative w-full mt-4">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-[30%] border-t border-muted-foreground"></span>
                    <div className="w-[40%]"></div>
                    <span className="w-[30%] border-t border-muted-foreground"></span>
                  </div>
                  <div className="relative flex justify-center text-xs uppercase my-4">
                    <span className="px-2 text-muted-foreground">
                      Hoặc đăng nhập bằng
                    </span>
                  </div>
                </div>
                <div className="w-full gap-4">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button variant="outline" className="w-full bg-slate-200">
                      <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                        <path
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          fill="#4285F4"
                        />
                        <path
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          fill="#34A853"
                        />
                        <path
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                          fill="#FBBC05"
                        />
                        <path
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                          fill="#EA4335"
                        />
                        <path d="M1 1h22v22H1z" fill="none" />
                      </svg>
                      Google
                    </Button>
                  </motion.div>
                </div>
              </TabsContent>
              {/* Tab đăng ký */}
              <TabsContent value="signup">
                <form>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="signupName" className="text-[#086280]">Tên người dùng</Label>
                      <Input
                        id="signupName"
                        name="username"
                        type="text"
                        placeholder="Nhập tên người dùng của bạn"
                        className="col-span-3 dark:border-gray-400 border-[#0E42D2] placeholder:text-gray-400"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="loginEmail" className="text-[#086280]">Email</Label>
                      <Input
                        id="loginEmail"
                        name="email"
                        type="email"
                        placeholder="Nhập email của bạn"
                        className="col-span-3 dark:border-gray-400 border-[#0E42D2] placeholder:text-gray-400"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="loginPassword" className="text-[#086280]">Mật khẩu</Label>
                      <Input
                        id="loginPassword"
                        name="password"
                        type="password"
                        placeholder="Nhập mật khẩu của bạn"
                        className="col-span-3 dark:border-gray-400 border-[#0E42D2] placeholder:text-gray-400"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword" className="text-[#086280]">Mật khẩu</Label>
                      <Input
                        id="confirmPassword"
                        name="confirmpassword"
                        type="password"
                        placeholder="Nhập lại mật khẩu của bạn"
                        className="col-span-3 dark:border-gray-400 border-[#0E42D2] placeholder:text-gray-400"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signupBirthday" className="text-[#086280]">Ngày sinh</Label>
                      <Input
                        id="signupBirthday"
                        name="dateOfBirth"
                        type="date"
                        className="col-span-3 dark:border-gray-400 border-[#0E42D2]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[#086280]">Giới tính</Label>
                      <RadioGroup
                        className="flex justify-between "
                        defaultValue="male"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="male" id="male" />
                          <Label htmlFor="male">Nam</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="female" id="female" />
                          <Label htmlFor="female">Nữ</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="other" id="other" />
                          <Label htmlFor="other">Khác</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <Button className="w-full bg-[#23CAF1] text-white" type="submit">
                      Đăng ký
                    </Button>
                  </div>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Page;
