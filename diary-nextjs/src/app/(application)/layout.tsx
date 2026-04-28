import { EntryContextProvider } from "@/components/diary/utils/context/entry/EntryContext";

export default function DiaryLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return <EntryContextProvider>{children}</EntryContextProvider>;
}
