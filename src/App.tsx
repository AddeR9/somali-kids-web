import { useEffect, useState } from 'react'
import 'semantic-ui-css/semantic.min.css'
import './App.css'

type Scene = { title: string; description: string; image: string; tag: string }

const scenes: Scene[] = [
  {
    title: 'Landscape',
    description: 'A calm and colorful world where children can explore freely and discover fun learning games at their own pace.',
    image: '/scenes/HomeMap.png',
    tag: 'Explore & Play'
  },
  {
    title: 'Transport Memory',
    description: 'A gentle memory game where children tap and listen to transport sounds while learning vehicle names in Somali.',
    image: '/scenes/TheCatch.png',
    tag: 'Memory & Sounds'
  },
  {
    title: 'Catch Numbers',
    description: 'Children catch numbers and place them in a basket while enjoying friendly sounds that support early number learning.',
    image: '/scenes/TheCatch2.png',
    tag: 'Numbers & Play'
  },
  {
    title: 'Food Store',
    description: 'A playful food shop where children listen and tap the correct food while learning Somali words through sound and play.',
    image: '/scenes/Somalishop2.png',
    tag: 'Tap & Listen'
  },
  {
    title: 'DHEGDHEER RUN!',
    description: 'A soft adventure game where children listen to Somali sounds and find the right items to unlock the door.',
    image: '/scenes/Dhegdheer.png',
    tag: 'Sound Adventure'
  },
  {
    title: 'Memory Game',
    description: 'A calm and friendly animal memory game where each card gently plays the animal’s name in Somali when flipped.',
    image: '/scenes/MemoryGame.png',
    tag: 'Animals & Memory'
  }
]

export default function App() {
  const GOOGLE_PLAY_URL = 'https://play.google.com/store' // replace when live
  const SHOW_GOOGLE_PLAY_COMING_SOON = true
  const STORAGE_KEY = 'somalikids_seen_googleplay_comingsoon_v1'

  const [showModal, setShowModal] = useState(false)
  const [hideBanner, setHideBanner] = useState(false)

  useEffect(() => {
    if (!SHOW_GOOGLE_PLAY_COMING_SOON) return
    const seen = localStorage.getItem(STORAGE_KEY)
    if (!seen) {
      setShowModal(true)
      localStorage.setItem(STORAGE_KEY, '1')
    }
  }, [])

  return (
    <>
      {/* TOP BAR */}
      <div className="ui inverted menu" style={{ margin: 0, borderRadius: 0, background: '#5f00c3' }}>
        <div className="ui container">
          <a className="header item" href="#top">Somali Kids</a>
          <div className="right menu">
            <a className="item" href="#scenes">Games</a>
            <a className="item" href="#download">Download</a>
          </div>
        </div>
      </div>

      {/* COMING SOON BANNER */}
      {SHOW_GOOGLE_PLAY_COMING_SOON && !hideBanner && (
        <div
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 1000,
            background: '#fff7e6',
            borderBottom: '1px solid #ffe1ad',
            padding: '10px 12px',
          }}
        >
          <div className="ui container" style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
            <div style={{ fontSize: 14 }}>
              <strong>Google Play coming soon</strong> — Android version is not published yet. iOS is available.
            </div>
            <button className="ui tiny basic button" onClick={() => setHideBanner(true)}>
              OK
            </button>
          </div>
        </div>
      )}

      {/* MODAL + DIMMER (CENTERED) */}
      {SHOW_GOOGLE_PLAY_COMING_SOON && (
        <>
          <div className={`ui dimmer modals ${showModal ? 'active' : ''}`} onClick={() => setShowModal(false)}>
            <div className={`ui modal ${showModal ? 'active' : ''}`} onClick={(e) => e.stopPropagation()}>
              <div className="header">Google Play version coming soon</div>
              <div className="content">
                <p>
                  The Android version of Somali Kids is not available on Google Play yet — but it’s on the way. 🙌
                </p>
                <p>
                  You can already download the iOS version or explore all the games below.
                </p>
              </div>
              <div className="actions">
                <a
                  className="ui button"
                  href="https://apps.apple.com/us/app/somali-kids-learn-somali/id1570713832"
                  target="_blank"
                  rel="noreferrer"
                >
                  Get on App Store
                </a>
                <button className="ui primary button" onClick={() => setShowModal(false)}>
                  OK
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* HERO */}
      <div id="top" className="ui inverted vertical segment" style={{ background: '#5f00c3' }}>
        <div className="ui text container center aligned">
          <img
            src="logos/playstore.png"
            alt="Somali Kids"
            style={{ height: 200, margin: '0 auto 18px', display: 'block' }}
          />

          <h1 className="ui inverted header">
            Educational games for children
            <div className="sub header">
              Interactive learning through sound, animation and play
            </div>
          </h1>

          <div id="download" style={{ marginTop: 20, display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
                        <a
              className="ui large basic inverted button"
              href="https://apps.apple.com/us/app/somali-kids-learn-somali/id1570713832"
              target="_blank"
              rel="noreferrer"
            >
              <img src="/badges/appstore.png" alt="App Store" style={{ height: 44 }} />
            </a>
            {SHOW_GOOGLE_PLAY_COMING_SOON ? (
              <button className="ui large basic inverted button" onClick={() => setShowModal(true)}>
                <img src="/badges/googleplay.png" alt="Google Play" style={{ height: 44, opacity: 0.6 }} />
                <div style={{ fontSize: 12, marginTop: 6 }}>Coming soon</div>
              </button>
            ) : (
              <a className="ui large basic inverted button" href={GOOGLE_PLAY_URL} target="_blank" rel="noreferrer">
                <img src="/badges/googleplay.png" alt="Google Play" style={{ height: 44 }} />
              </a>
            )}
          </div>

          <div className="ui tiny horizontal list" style={{ marginTop: 18 }}>
            <div className="item"><i className="check circle icon" /> Audio-based learning</div>
            <div className="item"><i className="check circle icon" /> Ages 4+</div>
            <div className="item"><i className="check circle icon" /> New games coming</div>
          </div>
        </div>
      </div>

      {/* SCENES */}
      <div id="scenes" className="ui container" style={{ margin: '40px 0 60px' }}>
        <h2 className="ui dividing header">All Games</h2>

        <div className="ui three stackable cards">
          {scenes.map(s => (
            <div className="ui card" key={s.title}>
              <div className="image">
                <img src={s.image} alt={s.title} style={{ height: 170, objectFit: 'cover' }} />
              </div>
              <div className="content">
                <div className="ui orange ribbon label">{s.tag}</div>
                <div className="header" style={{ marginTop: 10 }}>{s.title}</div>
                <div className="description">{s.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <div className="ui inverted vertical segment center aligned" style={{ padding: '2.5em 0' }}>
        <div className="ui small horizontal inverted divided link list">
          <a className="item" href="/privacy.html" target="_blank" rel="noreferrer">Privacy Policy</a>
          <a className="item" href="/terms.html" target="_blank" rel="noreferrer">Terms of Use</a>
        </div>
        <div style={{ marginTop: 12, opacity: 0.7 }}>
          © {new Date().getFullYear()} Somali Kids
        </div>
      </div>
    </>
  )
}
