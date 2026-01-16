"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getLineLoginUrl } from "@/lib/admin-api";
import { useAuth } from "@/lib/auth-context";
import { useLiff } from "@/lib/liff-provider";

export default function LoginClient() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { isAuthenticated } = useAuth();
    const { isInLiff, isLiffLoading, liffError } = useLiff();

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (isAuthenticated) {
            const redirect = searchParams.get("redirect");
            const table = searchParams.get("table");

            if (redirect) {
                const redirectUrl = table ? `${redirect}?table=${table}` : redirect;
                router.push(redirectUrl);
            } else {
                router.push("/");
            }
        }
    }, [isAuthenticated, router, searchParams]);

    useEffect(() => {
        if (liffError) setError(liffError);
    }, [liffError]);

    const handleLineLogin = async () => {
        try {
            setIsLoading(true);
            setError(null);

            const redirect = searchParams.get("redirect");
            const table = searchParams.get("table");

            if (redirect) sessionStorage.setItem("login_redirect", redirect);
            if (table) sessionStorage.setItem("login_table", table);

            const { loginUrl, state } = await getLineLoginUrl();
            sessionStorage.setItem("line_login_state", state);

            window.location.href = loginUrl;
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to initiate LINE login");
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-background">
            {/* your JSX unchanged */}
        </div>
    );
}
