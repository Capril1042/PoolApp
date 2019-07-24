import db from "../firebase";

// returns an array of players

export default function getPlayers() {
  const players = [];

  db.collection("players")
    .get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        players.push({ id: doc.id, data: doc.data() });
      });
    })
    .catch(err => {
      console.log("Error getting documents", err);
    });
  return players;
}
