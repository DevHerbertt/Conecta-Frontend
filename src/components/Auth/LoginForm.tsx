import { useState } from 'react'
import { useAuth } from './AuthContexts'

export default function LoginForm() {
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    login(email, password)
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md max-w-sm mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Login</h2>
      <input type="email" placeholder="Email" className="w-full p-2 mb-2 border rounded" value={email} onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Senha" className="w-full p-2 mb-4 border rounded" value={password} onChange={e => setPassword(e.target.value)} />
      <button className="bg-blue-600 hover:bg-blue-700 text-white w-full py-2 rounded">Entrar</button>
    </form>
  )
}
