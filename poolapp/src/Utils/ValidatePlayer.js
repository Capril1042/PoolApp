export default function exists( players, newName ) {
  let flag= false;
  players.forEach(player => {
    if ((player.data.name.toLowerCase()) === (newName.toLowerCase())) {
      flag = true;
      console.log(`true ${player.data.name} equals ${newName}`);
    }
  });
  return flag;
}
