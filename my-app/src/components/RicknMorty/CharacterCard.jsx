import "./CharacterCard.css";

export default function CharacterCard({character}) {
    //{console.log(character)}
    return (
        <div className="character-card">
            <img src={character.image} alt={character.name} />
            <div className="character-info">
                <h3>{character.name}</h3>
                <p className="meta">{character.species} — {character.status}</p>
                <p className="origin">Origin: {character.origin?.name}</p>
            </div>
        </div>
    )
}