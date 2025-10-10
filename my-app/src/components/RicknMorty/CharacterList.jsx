import { useState } from "react";
import "./CharacterList.css";
import CharacterCard from "./CharacterCard";

export default function CharacterList() {
    const [characters, setCharacter] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)


    async function loadCharacters() {
        setLoading(true)
        setError(null)

        try {
            const res = await fetch("https://rickandmortyapi.com/api/character")
            if (!res.ok) throw new Error(`Http status code: ${res.status}`)
            const data = await res.json()
            setCharacter(data.results)
        } catch(err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="character-list-wrapper">
            <button className="load-btn" onClick={loadCharacters}>
                {loading ? "Loading..." : "Load Characters"}
            </button>

            {error && <div className="error">Error: {error}</div> }

            <ul className="character-list">
                {characters.map(c => {
                    return (
                        <li key={c.id}>
                            <CharacterCard character = {c} />
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}