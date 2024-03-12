import './index.css'

const MatchCard = props => {
  const {data} = props
  const {competingTeam, result, competingTeamLogo, matchStatus} = data

  const classOfResult = matchStatus === 'Won' ? 'won-match' : 'lost-match'

  return (
    <li className="match-card">
      <img
        src={competingTeamLogo}
        className="match-card-logo"
        alt={`competing team ${competingTeam}`}
      />
      <p className="competing-team">{competingTeam}</p>
      <p className="result">{result}</p>
      <p className={classOfResult}>{matchStatus}</p>
    </li>
  )
}

export default MatchCard
