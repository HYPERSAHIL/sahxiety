import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import ThreeBackground from './components/ThreeBackground'
import Home from './pages/Home'
import Posts from './pages/Posts'
import Newsletter from './pages/Newsletter'
import Socials from './pages/Socials'
import SonyPost from './pages/SonyPost'
import './index.css'

function Navigation() {
    const location = useLocation()

    return (
        <nav className="main-nav">
            <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link>
            <Link to="/posts" className={location.pathname === '/posts' ? 'active' : ''}>Posts</Link>
            <Link to="/newsletter" className={location.pathname === '/newsletter' ? 'active' : ''}>Newsletter</Link>
            <Link to="/socials" className={location.pathname === '/socials' ? 'active' : ''}>Socials</Link>
        </nav>
    )
}

function AnimatedRoutes() {
    const location = useLocation()
    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home />} />
                <Route path="/posts" element={<Posts />} />
                <Route path="/newsletter" element={<Newsletter />} />
                <Route path="/socials" element={<Socials />} />
                <Route path="/contact" element={<Socials />} />
                <Route path="/sony-story" element={<SonyPost />} />
            </Routes>
        </AnimatePresence>
    )
}

// Mind-bending 3D Brand Header Component
function BrandHeader3D() {
    return (
        <motion.div
            className="brand-3d-container"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, type: 'spring', damping: 12 }}
        >
            {/* Main floating title with 3D depth layers */}
            <div className="brand-3d-wrapper">
                {/* Shadow layers for depth */}
                <span className="brand-shadow-layer layer-1">sahxiety</span>
                <span className="brand-shadow-layer layer-2">sahxiety</span>
                <span className="brand-shadow-layer layer-3">sahxiety</span>
                {/* Main text */}
                <span className="brand-main-text">sahxiety</span>
            </div>
        </motion.div>
    )
}

function App() {
    return (
        <Router>
            {/* 3D Background - sits behind everything */}
            <ThreeBackground />

            {/* FIXED STICKY TITLE - 3D Mind-bending effect */}
            <div className="sticky-brand-container">
                <BrandHeader3D />
            </div>

            {/* Main Content Container */}
            <div className="app-container">
                <div className="header-spacer"></div>
                <Navigation />
                <main>
                    <AnimatedRoutes />
                </main>
                <footer>
                    <p>&copy; {new Date().getFullYear()} Sahxiety. All rights reserved.</p>
                </footer>
            </div>
        </Router>
    )
}

export default App
