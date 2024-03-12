import Loader from 'react-loader-spinner'
import {Component} from 'react'
import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'
import './index.css'

class TeamMatches extends Component {
  state = {matchDetails: {}, isLoading: true}

  componentDidMount() {
    this.getMatchDetails()
  }

  getMatchDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const jsonData = await response.json()

    const formattedData = {
      teamBannerUrl: jsonData.team_banner_url,
      latestMatchDetails: {
        competingTeam: jsonData.latest_match_details.competing_team,
        competingTeamLogo: jsonData.latest_match_details.competing_team_logo,
        date: jsonData.latest_match_details.date,
        firstInnings: jsonData.latest_match_details.first_innings,
        id: jsonData.latest_match_details.id,
        manOfTheMatch: jsonData.latest_match_details.man_of_the_match,
        matchStatus: jsonData.latest_match_details.match_status,
        result: jsonData.latest_match_details.result,
        secondInnings: jsonData.latest_match_details.secondInnings,
        umpires: jsonData.latest_match_details.umpires,
        venue: jsonData.latest_match_details.venue,
      },
      recentMatches: jsonData.recent_matches.map(eachMatch => ({
        competingTeam: eachMatch.competing_team,
        competingTeamLogo: eachMatch.competing_team_logo,
        date: eachMatch.date,
        firstInnings: eachMatch.first_innings,
        id: eachMatch.id,
        manOfTheMatch: eachMatch.man_of_the_match,
        matchStatus: eachMatch.match_status,
        result: eachMatch.result,
        secondInnings: eachMatch.secondInnings,
        umpires: eachMatch.umpires,
        venue: eachMatch.venue,
      })),
    }
    this.setState({matchDetails: formattedData, isLoading: false})
  }

  renderLoader = () => (
    <div className="loader-container">
      <Loader type="Oval" color="#ffffff" height={70} width={70} />
    </div>
  )

  renderMatchCard = () => {
    const {matchDetails} = this.state
    const {recentMatches} = matchDetails
    return (
      <ul className="match-card-list">
        {recentMatches.map(eachMatch => (
          <MatchCard key={eachMatch.id} data={eachMatch} />
        ))}
      </ul>
    )
  }

  renderTeamMatches = () => {
    const {matchDetails} = this.state
    const {teamBannerUrl, latestMatchDetails} = matchDetails
    console.log(latestMatchDetails)

    return (
      <div className="team-matches-container">
        <img src={teamBannerUrl} className="team-banner" alt="team banner" />
        <h1 className="latest">Latest Matches</h1>
        <LatestMatch latestMatchData={latestMatchDetails} />
        {this.renderMatchCard()}
      </div>
    )
  }

  getBackgroundClass = id => {
    switch (id) {
      case 'RCB':
        return 'rcb'
      case 'KKR':
        return 'kkr'
      case 'KXP':
        return 'kxp'
      case 'CSK':
        return 'csk'
      case 'RR':
        return 'rr'
      case 'MI':
        return 'mi'
      case 'SH':
        return 'srh'
      case 'DC':
        return 'dc'
      default:
        return ''
    }
  }

  render() {
    const {isLoading} = this.state
    const {match} = this.props
    const {params} = match
    const {id} = params
    const backgroundClass = this.getBackgroundClass(id)

    return (
      <div className={`app-team-matches-container ${backgroundClass}`}>
        {isLoading ? this.renderLoader() : this.renderTeamMatches()}
      </div>
    )
  }
}

export default TeamMatches
