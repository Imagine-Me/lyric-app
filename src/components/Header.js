import { BsMusicNoteList } from 'react-icons/bs'
export default function Header() {
    return <div className="header d-flex justify-content-between align-item-center">
        <div className="d-flex align-item-center logo">
            <BsMusicNoteList className="text-primary" />
            <span className="ml-1 text-primary text-bold">LyricsFinder</span>
        </div>
    </div>
}