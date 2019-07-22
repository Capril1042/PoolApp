export default function playersWins(gamesArray) {
  let playersWithWinSum = new Map();
  let WinnerSumArray = [];
  gamesArray.forEach(game => {
    if (playersWithWinSum.has(game.data.winner)) {
      let newWinTotal = playersWithWinSum.get(game.data.winner) + 1;
      playersWithWinSum.set(game.data.winner, newWinTotal);
    } else {
      playersWithWinSum.set(game.data.winner, 1);
    }
  });

  for (const [key, value] of playersWithWinSum.entries()) {
    WinnerSumArray.push({ name: key, wins: value });
  }
  return WinnerSumArray.sort((a, b) => b.wins - a.wins);
}

