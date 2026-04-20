import { ArrowRight } from 'lucide-react'
import DiarySidebar from '../DiarySidebar'
import EntryList from './EntryList'

export default function DiaryUi() {
    return (
        <section className="flex h-screen bg-gray-50">
            <DiarySidebar />
            <EntryList />
        </section>
    )
}
