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
];


export default function App() {
  return (
    <>
      {/* TOP BAR */}
      <div className="ui inverted menu" style={{ margin: 0, borderRadius: 0, background: "#5f00c3" }}>
        <div className="ui container">
          <a className="header item" href="#top">
            Somali Kids
          </a>

          <div className="right menu">
            <a className="item" href="#scenes">Games</a>
            <a className="item" href="#download">Download</a>
          </div>
        </div>
      </div>

      {/* HERO */}
      <div
        id="top"
        className="ui inverted vertical segment"
        style={{marginTop: 0, background: "#5f00c3" }}
      >
        <div className="ui text container center aligned">
  <img
    src="logos/playstore.png"
    alt="Somali Kids"
    style={{
      height: 200,              // 👈 ändra här om du vill större/mindre
      width: 'auto',
      display: 'block',
      margin: '0 auto 18px',    // centrerad + space under
    }}
  />

  <h1 className="ui inverted header" style={{ fontSize: '2.6em', marginBottom: 10 }}>
    Educational games for children
    <div className="sub header" style={{ marginTop: 10 }}>
      Interactive games with sound, animation and play
    </div>
  </h1>


          <div className="ui hidden divider" />

          <div
            id="download"
            style={{
              display: 'flex',
              gap: 14,
              justifyContent: 'center',
              flexWrap: 'wrap',
              marginTop: 10,
            }}
          >
            <a
              className="ui large basic inverted button"
              href="https://play.google.com/store"
              target="_blank"
              rel="noreferrer"
              style={{ padding: 10 }}
            >
              <img src="/badges/google-play.png" alt="Google Play" style={{ height: 44, display: 'block' }} />
            </a>

            <a
              className="ui large basic inverted button"
              href="https://apps.apple.com/us/app/somali-kids-learn-somali/id1570713832"
              target="_blank"
              rel="noreferrer"
              style={{ padding: 10 }}
            >
              <img src="/badges/app-store.png" alt="App Store" style={{ height: 44, display: 'block' }} />
            </a>
          </div>

          {/* Small highlight row */}
          <div className="ui tiny horizontal list" style={{ marginTop: 18, opacity: 0.9 }}>
            <div className="item">
              <i className="check circle icon" />
              No text — audio driven
            </div>
            <div className="item">
              <i className="check circle icon" />
              Ages 4+
            </div>
            <div className="item">
              <i className="check circle icon" />
              New games coming
            </div>
          </div>
        </div>
      </div>

      {/* SCENES */}
      <div id="scenes" className="ui container" style={{ marginTop: 40, marginBottom: 60 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
          <h2 className="ui dividing header" style={{ marginBottom: 0 }}>All Games</h2>

          <a className="ui orange basic button" href="#download">
            Download now
          </a>
        </div>

        <div className="ui hidden divider" />

        <div className="ui three stackable cards">
          {scenes.map((s) => (
            <div className="ui card" key={s.title}>
              <div className="image">
                <img
                  src={s.image}
                  alt={s.title}
                  style={{ height: 170, objectFit: 'cover', width: '100%' }}
                />
              </div>
              <div className="content">
                <div className="ui orange ribbon label">{s.tag}</div>
                <div className="header" style={{ marginTop: 10 }}>{s.title}</div>
                <div className="description" style={{ marginTop: 8 }}>{s.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER */}
<div className="ui inverted vertical segment center aligned" style={{ padding: '2.5em 0' }}>
  <div className="ui small horizontal inverted divided link list">
    <a className="item" href="/privacy.html" target="_blank" rel="noreferrer">
      Privacy Policy
    </a>
    <a className="item" href="/terms.html" target="_blank" rel="noreferrer">
      Terms of Use
    </a>
  </div>

  <div style={{ marginTop: 12, opacity: 0.7 }}>
    © {new Date().getFullYear()} Somali Kids
  </div>
</div>

    </>
  )
}
