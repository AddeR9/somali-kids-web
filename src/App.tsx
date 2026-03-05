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
  const GOOGLE_PLAY_URL = 'https://play.google.com/store/apps/details?id=com.SharpStack.SomaliKids'
  const APP_STORE_URL = 'https://apps.apple.com/us/app/somali-kids-learn-somali/id1570713832'

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

      {/* HERO */}
      <div id="top" className="ui inverted vertical segment" style={{ background: '#5f00c3', padding: '4em 0' }}>
        <div className="ui text container center aligned">
          <img
            src="logos/playstore.png"
            alt="Somali Kids Logo"
            style={{ height: 180, margin: '0 auto 20px', display: 'block' }}
          />

          <h1 className="ui inverted header" style={{ fontSize: '3em' }}>
            Educational games for children
            <div className="sub header" style={{ marginTop: '0.5em', opacity: 0.9 }}>
              Interactive learning through sound, animation and play
            </div>
          </h1>

          <div id="download" style={{ marginTop: 40, display: 'flex', gap: 20, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a 
              className="ui large basic inverted button" 
              href={APP_STORE_URL} 
              target="_blank" 
              rel="noreferrer"
              style={{ padding: '10px' }}
            >
              <img src="/badges/appstore.png" alt="Download on App Store" style={{ height: 48 }} />
            </a>
            
            <a 
              className="ui large basic inverted button" 
              href={GOOGLE_PLAY_URL} 
              target="_blank" 
              rel="noreferrer"
              style={{ padding: '10px' }}
            >
              <img src="/badges/googleplay.png" alt="Get it on Google Play" style={{ height: 48 }} />
            </a>
          </div>

          <div className="ui tiny horizontal list" style={{ marginTop: 30, opacity: 0.8 }}>
            <div className="item"><i className="check circle icon" /> Audio-based learning</div>
            <div className="item"><i className="check circle icon" /> Ages 4+</div>
            <div className="item"><i className="check circle icon" /> Culturally relevant content</div>
          </div>
        </div>
      </div>

      {/* SCENES */}
      <div id="scenes" className="ui container" style={{ margin: '60px 0 80px' }}>
        <h2 className="ui dividing header">Explore the Games</h2>

        <div className="ui three stackable cards">
          {scenes.map(s => (
            <div className="ui card" key={s.title} style={{ borderRadius: 12, overflow: 'hidden' }}>
              <div className="image">
                <img src={s.image} alt={s.title} style={{ height: 200, objectFit: 'cover' }} />
              </div>
              <div className="content">
                <div className="ui orange ribbon label">{s.tag}</div>
                <div className="header" style={{ marginTop: 15 }}>{s.title}</div>
                <div className="description" style={{ color: '#555' }}>{s.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <div className="ui inverted vertical segment center aligned" style={{ padding: '3em 0', background: '#1b1c1d' }}>
        <div className="ui small horizontal inverted divided link list">
          <a className="item" href="/privacy.html" target="_blank" rel="noreferrer">Privacy Policy</a>
          <a className="item" href="/terms.html" target="_blank" rel="noreferrer">Terms of Use</a>
        </div>
        <div style={{ marginTop: 15, opacity: 0.5, fontSize: '0.9em' }}>
          © {new Date().getFullYear()} Somali Kids. Built with care for the next generation.
        </div>
      </div>
    </>
  )
}