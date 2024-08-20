import { useEffect, useState } from 'react'
import Header from './components/Header'
import Produtos from './containers/Produtos'
import { GlobalStyle } from './styles'

export type Game = {
  id: number
  titulo: string
  plataformas: string[]
  precoAntigo: number
  preco: number
  categoria: string
  imagem: string
}

function App() {
  const [games, setGames] = useState<Game[]>([])
  const [carrinho, setCarrinho] = useState<Game[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('http://localhost:3000/produtos')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Ocorreu um problema de rede!')
        }
        return res.json()
      })
      .then((data) => setGames(data))
      .catch((error) => {
        console.error('Ocorreu um problema ao realizar o fetch da API', error)
        setError(
          'Erro ao carregar os jogos. Por favor tente novamente mais tarde.'
        )
      })
  }, [])

  function adicionarAoCarrinho(jogo: Game) {
    if (carrinho.find((game) => game.id === jogo.id)) {
      alert('Item já adicionado')
    } else {
      setCarrinho([...carrinho, jogo])
    }
  }

  return (
    <>
      <GlobalStyle />
      <div className="container">
        <Header itensNoCarrinho={carrinho} />
        {error ? (
          <div>{error}</div>
        ) : (
          <Produtos jogos={games} adicionarAoCarrinho={adicionarAoCarrinho} />
        )}
      </div>
    </>
  )
}

export default App
