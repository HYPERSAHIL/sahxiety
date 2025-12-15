import { Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ErrorBoundary } from 'react-error-boundary'

// Components
import ThreeBackground from './components/ThreeBackground'
import CustomCursor from './components/CustomCursor'
import ErrorFallback from './components/ErrorFallback'
import SEO from './components/SEO'
import './index.css'

// Direct imports (no lazy loading - site is small enough)
import Home from './pages/Home'
import Posts from './pages/Posts'
import Newsletter from './pages/Newsletter'
import Socials from './pages/Socials'
import SonyPost from './pages/SonyPost'
import NotFound from './pages/NotFound'
import DynamicPost from './pages/DynamicPost'

// Contact points to Socials
const Contact = Socials

function Navigation() {
    const location = useLocation()

    return (
        <nav className="main-nav" role="navigation" aria-label="Main navigation">
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
                <Route path="/" element={
                    <>
                        <SEO title="Home" />
                        <Home />
                    </>
                } />
                <Route path="/posts" element={
                    <>
                        <SEO title="Posts" description="My archive of thoughts and stories." />
                        <Posts />
                    </>
                } />
                <Route path="/newsletter" element={
                    <>
                        <SEO title="Newsletter" description="Join the circle for updates." />
                        <Newsletter />
                    </>
                } />
                <Route path="/socials" element={
                    <>
                        <SEO title="Socials" description="Connect with me across the web." />
                        <Socials />
                    </>
                } />
                <Route path="/contact" element={
                    <>
                        <SEO title="Contact" />
                        <Contact />
                    </>
                } />
                <Route path="/sony-story" element={
                    <>
                        <SEO title="Sony: The Rise and Fall" description="A deep dive into Sony's history, the Walkman, and their quiet reinvention." />
                        <SonyPost />
                    </>
                } />
                {/* Dynamic CMS Route */}
                <Route path="/posts/:slug" element={<DynamicPost />} />
                <Route path="*" element={
                    <>
                        <SEO title="404 Not Found" />
                        <NotFound />
                    </>
                } />
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
            {/* Skip to content link for keyboard users */}
            <a href="#main-content" className="skip-link">Skip to main content</a>

            <ErrorBoundary FallbackComponent={ErrorFallback}>
                <CustomCursor />
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
                    <main id="main-content" tabIndex="-1">
                        <AnimatedRoutes />
                    </main>
                    <footer>
                        <p>&copy; {new Date().getFullYear()} Sahxiety. All rights reserved.</p>
                    </footer>
                </div>
            </ErrorBoundary>
        </Router>
    )
}

export default App
