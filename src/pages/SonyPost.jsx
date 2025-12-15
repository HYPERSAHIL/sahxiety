import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const pageTransition = {
    initial: { opacity: 0, y: 20, filter: 'blur(10px)' },
    animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
    exit: { opacity: 0, y: -20, filter: 'blur(10px)' },
    transition: { duration: 0.5 }
}

export default function SonyPost() {
    return (
        <motion.div {...pageTransition} className="page-content" style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 0' }}>
            <Link to="/posts" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none', marginBottom: '20px', display: 'inline-block', fontSize: '0.9rem' }}>← Back to Posts</Link>

            <h1>Sony – The Rise, the Fall, and the Reinvention</h1>
            <p style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.6)', marginTop: '-10px', marginBottom: '30px' }}>Part of the Tech History Series</p>

            <p>
                Sony. For a name that once meant the future, it's strange how many people today barely notice it unless it's printed on a camera lens or a PlayStation. But the story of Sony is way more interesting than just electronics. It's a story of innovation, pride, mistakes, and quiet survival.
            </p>
            <p>
                Sony began in 1946 in post-war Japan. It started small — just a few engineers trying to fix radios. But soon, it invented Japan's first tape recorder. Then came the game changer — the <strong>Walkman</strong> in 1979. Imagine a time when music was stuck in one place — and suddenly, you could carry it in your pocket. That was Sony's magic.
            </p>
            <p>
                In the 80s and 90s, Sony dominated. TVs, CD players, camcorders — all built like tanks, all stylish. Then they gave us the PlayStation, which changed gaming forever.
            </p>
            <p>
                But behind all that success, Sony started slipping.
            </p>
            <p>
                They invented things that didn't catch on — like MiniDiscs. They kept making proprietary formats like Memory Stick when the world was going USB. Then came DRM (Digital Rights Management) — Sony tried to protect its music CDs by secretly installing spyware on people's computers in 2005. That didn't just ruin trust, it became a full-blown scandal. They were literally sued for it.
            </p>
            <p>
                While Apple made iPods simple and clean, Sony got lost in its own complications. Instead of adapting, they stuck to their own systems — even when the market moved on.
            </p>
            <p>
                Even in phones, Xperia devices had solid specs and amazing cameras, but they were always a step behind in marketing, design, or pricing. Eventually, Sony stopped trying to be "everywhere" and shifted into the background.
            </p>
            <p>
                But Sony never really disappeared. It just became quieter — and smarter.
            </p>
            <p>
                Today, they make some of the best camera sensors in the world — used in iPhones, Samsungs, and almost every flagship Android. They're not bragging about it, but they own the image. Literally.
            </p>
            <p>
                Then there's the entertainment empire. Sony owns Columbia Pictures, TriStar, and most famously, the Spider-Man movie rights. They bought Crunchyroll, so anime fans probably use their platform without even realizing it's Sony. They also own Funimation, and a huge chunk of the music industry through Sony Music. In short: from anime to blockbusters to music — Sony is everywhere, just not loudly.
            </p>
            <p>
                Their consoles? Still a beast. PlayStation 5 is one of the top gaming systems globally, even though it's hard to get one sometimes.
            </p>
            <p>
                So what do we learn from Sony? That even if you fall, you can still rise — maybe not as loudly, but more wisely. Sony stopped chasing trends and started dominating quietly in the background — in sensors, in entertainment, in gaming.
            </p>
            <p>
                It's not the same Sony that gave us the Walkman. But maybe it doesn't need to be.
            </p>

            <p className="signature">Sahil</p>

            {/* Mobile Only: Walkman appears here (between Sahil and Newsletter) */}
            <div className="walkman-mobile">
                <img src="/images/walkman.png" alt="Sony Walkman TPS-L2" className="walkman-img-mobile" />
                <p className="walkman-caption">The Original Sony Walkman TPS-L2 (1979)</p>
            </div>

            <div style={{ marginTop: '40px', textAlign: 'center' }}>
                <Link to="/newsletter" className="btn-premium">Join the Newsletter</Link>
            </div>

            {/* Desktop Only: Walkman positioned absolutely to the far right */}
            <div className="walkman-desktop">
                <img src="/images/walkman.png" alt="Sony Walkman TPS-L2" className="walkman-img-desktop" />
                <p className="walkman-caption">The Original Walkman (1979)</p>
            </div>

            <style>{`
                /* Desktop: Walkman in the middle of empty space on right */
                .walkman-desktop {
                    position: fixed;
                    /* Position in center of gap between content (ends at ~50%+400px) and right edge */
                    left: calc(50% + 480px);
                    top: 50%;
                    transform: translateY(-50%);
                    text-align: center;
                    z-index: 10;
                }
                
                .walkman-img-desktop {
                    max-width: 280px;
                    height: auto;
                    border-radius: 14px;
                    box-shadow: 
                        0 25px 50px rgba(0, 0, 0, 0.6),
                        0 0 80px rgba(255, 102, 0, 0.2);
                    transition: transform 0.3s ease;
                }
                
                .walkman-img-desktop:hover {
                    transform: scale(1.05);
                }
                
                .walkman-caption {
                    margin-top: 12px;
                    font-size: 0.75rem;
                    color: rgba(255, 255, 255, 0.4);
                    font-style: italic;
                }
                
                /* Hide mobile version on large screens */
                .walkman-mobile {
                    display: none;
                }

                /* ========== LARGE DESKTOP (1600px+) ========== */
                @media (min-width: 1600px) {
                    .walkman-desktop {
                        left: calc(50% + 520px);
                    }
                    .walkman-img-desktop {
                        max-width: 320px;
                    }
                }

                /* ========== MEDIUM DESKTOP (1200px - 1400px) ========== */
                @media (max-width: 1400px) {
                    .walkman-desktop {
                        left: calc(50% + 440px);
                    }
                    .walkman-img-desktop {
                        max-width: 220px;
                    }
                }

                /* ========== TABLET / NARROW (below 1200px) ========== */
                @media (max-width: 1200px) {
                    /* Hide desktop version */
                    .walkman-desktop {
                        display: none;
                    }
                    
                    /* Show mobile version */
                    .walkman-mobile {
                        display: block;
                        text-align: center;
                        margin: 40px 0;
                        padding: 20px 0;
                    }
                    
                    .walkman-img-mobile {
                        max-width: 240px;
                        height: auto;
                        border-radius: 14px;
                        box-shadow: 
                            0 20px 40px rgba(0, 0, 0, 0.5),
                            0 0 60px rgba(255, 102, 0, 0.15);
                    }
                }

                /* ========== MOBILE PHONES (below 600px) ========== */
                @media (max-width: 600px) {
                    .walkman-img-mobile {
                        max-width: 180px;
                    }
                    .walkman-mobile {
                        margin: 30px 0;
                    }
                }
            `}</style>
        </motion.div>
    )
}
