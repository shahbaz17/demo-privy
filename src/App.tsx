import './App.css'
import { useConnectWallet, useWallets, useX402Fetch, useLogout } from '@privy-io/react-auth'
import { createWalletClient, custom, type Hex } from 'viem'
import { baseSepolia } from 'viem/chains'

function App() {
  const { connectWallet } = useConnectWallet()
  const { wallets } = useWallets()
  const wallet = wallets[0]
  const { wrapFetchWithPayment } = useX402Fetch()
  const { logout } = useLogout()

  if (!wallets.length) {
    return <div>No wallets found</div>
  }

  const getPremiumContent = async () => {
    // Switch to Base Sepolia chain before making payment
    await wallet.switchChain(baseSepolia.id)

    const provider = await wallet.getEthereumProvider()

    const walletClient = createWalletClient({
      account: wallet.address as Hex,
      chain: baseSepolia,
      transport: custom(provider),
    })

    const [address] = await walletClient.getAddresses()
    console.log(address)

    // Wrap fetch with X402 payment functionality
    const fetchWithPayment = wrapFetchWithPayment({
      walletAddress: wallet.address,
      fetch,
      maxValue: 1000000000000000000n, // 1 ETH
    })

    const premiumContent = await fetchWithPayment('/api/resume')
    const data = await premiumContent.json()
    console.log(data)
  }

  return (
    <>
      <h1>Welcome to Crypto World</h1>

      <div className="card">
        {wallets.length === 0 && (
          <button className="btn-connect-wallet" onClick={connectWallet}>
            Connect Wallet
          </button>
        )}
        {wallets.length > 0 && (
          <>
            <div className="wallet-address">
              <p>{wallets[0].address}</p>
            </div>
            <button className="btn-get-premium-content" onClick={() => getPremiumContent()}>
              Get Premium Content
            </button>
            <button className="btn-disconnect-wallet" onClick={logout}>
              Disconnect Wallet
            </button>
          </>
        )}
      </div>
    </>
  )
}

export default App
