'use client'
import Loader from "@/lib/Loader";
import { checkUserAuth, logoutAdmin } from "@/service/auth.service";
import userStore from "@/store/userStore";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
// import Header from "./components/Header";


export default function AuthWrapper({ children }) {
    const { setUser, clearUser, user } = userStore();
    const router = useRouter();
    const pathname = usePathname();
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8081';

    const publicPages = ["/admin-login"];
    const isPublicPage = publicPages.includes(pathname);


    

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const result = await checkUserAuth();
                if (result.isAuthenticated) {
                    setUser(result?.user);
                    setIsAuthenticated(true);

               
                } else {
                    await handleLogout();
                }
            } catch (error) {
                console.error("Đăng nhập thất bại", error);
                await handleLogout();
            } finally {
                setLoading(false);
            }
        };

        const handleLogout = async () => {
            clearUser();
            setIsAuthenticated(false);

   

            try {
                await logoutAdmin();
            } catch (error) {
                console.log("Đăng xuất thất bại. Vui lòng thử lại sau", error);
            }
            if (!isPublicPage) {
                router.push("/admin-login");
            }
        };

        if (!isPublicPage) {
            checkAuth();
        } else {
            setLoading(false);
        }

        // Cleanup function
       
    }, [isPublicPage, router, setUser, clearUser]);

 

    if (loading) {
        return <Loader />;
    }

    return (
        <>
            {/* {isAuthenticated && !isPublicPage && <Header />} */}
            {children}
        </>
    );
}
