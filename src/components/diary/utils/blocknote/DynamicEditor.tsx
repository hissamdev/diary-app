"use client";

import dynamic from "next/dynamic";

export const DynamicEditor = dynamic(() => import("./DiaryInitialization"), {
    ssr: false,
});
