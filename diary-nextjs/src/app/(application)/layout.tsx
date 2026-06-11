import { EntryContextProvider } from "@/components/context/EntryContext";

export default function DiaryLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return <EntryContextProvider>{children}</EntryContextProvider>;
}
