import './App.css'

function App() {
  const connectWallet = async () => {
    console.log('connectWallet')
  }

  return (
    <>
      <h1>Welcome to Crypto World</h1>

      <div className="card">
        <button className="btn-connect-wallet" onClick={connectWallet}>
          Connect Wallet
        </button>
      </div>
    </>
  )
}

export default App
