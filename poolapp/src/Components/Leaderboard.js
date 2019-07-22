import React, { Component } from "react";
import playersWins from "../Utils/PlayersWins.js";
import db from "../firebase.js";
import { Link } from "react-router-dom";
import "./Leaderboard.css";

class Leaderboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      games: []
    };
  }
  componentDidMount() {
    db.collection("games")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          this.setState(({ games }) => ({
            games: [...games, { id: doc.id, data: doc.data() }]
          }));
        });
      })
      .catch(err => {
        console.log("Error getting documents", err);
      });
  }
  render() {
    const scores = playersWins(this.state.games);
    console.log(scores);
    return (
      <div className="leaderboard">
        {" "}
        <h2 className="leaderboard--heading">Leaderboard</h2>
        <table className="leaerboard--table">
          <thead>
            {" "}
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th> Wins</th>
            </tr>
          </thead>

          <tbody>
            {scores.map((winner, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{winner.name.toUpperCase()}</td>
                <td>{winner.wins}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Link to="/">
          <i class="fa fa-arrow-left" />
        </Link>
      </div>
    );
  }
}

export default Leaderboard;
