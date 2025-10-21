import { useState, useEffect } from "react";
import "./CharacterList.css";
import CharacterCard from "./CharacterCard";

export default function CharacterList() {
    const [characters, setCharacters] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");

    async function loadCharacters() {
        setLoading(true);
        setError(null);

        try {
            const res = await fetch("https://rickandmortyapi.com/api/character");
            if (!res.ok) throw new Error(`Http status code: ${res.status}`);
            const data = await res.json();
            setCharacters(data.results);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadCharacters();
    }, []);

    const filteredCharacters = characters.filter(c =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.species.toLowerCase().includes(search.toLowerCase())
    );

    function clearSearch() {
        setSearch("");
    }

    return (
        <div className="character-list-wrapper">
            <button className="load-btn" onClick={loadCharacters}>
                {loading ? "Loading..." : "Reload Characters"}
            </button>

            {error && <div className="error">Error: {error}</div>}

            <div className="search-wrapper">
                <input
                    type="text"
                    placeholder="Search characters..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="search-input"
                />
                {search && (
                    <button onClick={clearSearch} className="clear-btn">
                        Clear
                    </button>
                )}
            </div>

            <ul className="character-list">
                {filteredCharacters.map((c) => (
                    <li key={c.id}>
                        <CharacterCard character={c} />
                    </li>
                ))}
            </ul>

            {filteredCharacters.length === 0 && characters.length > 0 && (
                <p>No characters found.</p>
            )}
        </div>
    );
}
