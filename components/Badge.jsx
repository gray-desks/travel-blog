export default function Badge({ children }) {
  if (!children) return null
  return <span className="badge">{children}</span>
}

