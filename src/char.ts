import CharacterAI from 'node_characterai';

const characterAI = new CharacterAI();

characterAI.requester.puppeteerPath =
  process.env.NODE_ENV === 'production'
    ? (process.env.PUPPETEER_EXECUTABLE_PATH as string)
    : characterAI.requester.puppeteerPath;

export async function authenticateCharacter() {
  await characterAI.authenticateWithToken(process.env.SESSION_TOKEN as string);
}

export default characterAI;
