import CharacterAI from 'node_characterai';

const characterAI = new CharacterAI();

export async function authenticateCharacter() {
  await characterAI.authenticateWithToken(process.env.SESSION_TOKEN as string);
}

export default characterAI;
