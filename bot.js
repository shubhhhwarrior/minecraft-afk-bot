const mineflayer = require('mineflayer');

function createBot() {
  const bot = mineflayer.createBot({
    host: 'shubhhhwarrior96.aternos.me',
    port: 58076,
    username: 'Neel_gay_che',
    password: 'password',
    version: '1.20.1' 
  });
  

  bot.on('login', () => {
    console.log('Bot has logged in!');
    randomMovement(); // Start random movement to avoid AFK
  });

  bot.on('kicked', (reason) => {
    console.log(`Bot was kicked for: ${reason}`);
  });

  bot.on('error', (err) => {
    console.error(`An error occurred: ${err}`);
  });

  bot.on('end', () => {
    console.log('Bot disconnected, retrying...');
    setTimeout(createBot, 5000);  // Retry connection after 5 seconds
  });

  function randomMovement() {
    const yaw = Math.random() * Math.PI * 2;
    const pitch = (Math.random() - 0.5) * Math.PI;

    bot.look(yaw, pitch, true);
    bot.setControlState('forward', true);

    setTimeout(() => {
      bot.setControlState('forward', false);
      setTimeout(randomMovement, Math.random() * 10000 + 5000); // Random delay between movements
    }, Math.random() * 3000 + 1000); // Move forward for 1-4 seconds
  }

  function antiDrowning() {
    if (bot.entity.isInWater) {
      bot.setControlState('jump', true);  // Makes the bot swim up
      bot.setControlState('sprint', true);  // Move faster while in water
      console.log("Bot is in water, swimming up...");
    } else {
      bot.setControlState('jump', false);
      bot.setControlState('sprint', false);
    }
  }

  bot.on('physicTick', antiDrowning); // Check for water every physics tick
}

createBot(); // Start the bot