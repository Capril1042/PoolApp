export default function playersWins(gamesArray) {
    const winners =[];
     gamesArray.forEach(game=> winners.push(game.data.winner));
    const winnersCount = new Map([...new Set(winners)]
    .map(x => [x, winners.filter(y => y === x).length]
        ));
    return winnersCount;
}
