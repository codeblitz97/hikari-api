import * as dotenv from 'dotenv';
import app from './app';
import CharacterAI from 'node_characterai';
import { authenticateCharacter } from './char';

const characterAI = new CharacterAI();

dotenv.config();

const PORT = process.env.PORT ?? 3000;

app.listen(PORT, async () => {
  await authenticateCharacter();
  console.log(`Server started on ${PORT}`);
});
