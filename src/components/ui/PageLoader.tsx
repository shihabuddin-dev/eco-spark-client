'use client';
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import NProgress from 'nprogress';

export default function PageLoader () {
    const pathname = usePathname();

    useEffect(() => {
        NProgress.configure({ speed: 600 });
        NProgress.start();
        NProgress.done();
    }, [pathname]);

    return null;
};