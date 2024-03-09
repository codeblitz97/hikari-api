import express from 'express';
import cors from 'cors';
import { Message } from 'node_characterai';
import packageJSON from '../package.json';
import characterAI from './char';
import morgan from 'morgan';

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('combined'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Success',
    status: {
      code: 200,
      text: 'OK',
    },
    characterAiStatus: {
      isAuthenticated: characterAI.isAuthenticated(),
      type:
        packageJSON.dependencies.node_characterai.startsWith('github:') ||
        packageJSON.dependencies.node_characterai.startsWith('https://')
          ? 'GitHub'
          : 'Package',
      version: packageJSON.dependencies.node_characterai,
    },
    moduleStatus: {
      express: {
        ver: `${packageJSON.dependencies.express}`,
        status: 'HEALTHY',
      },
      cors: {
        ver: `${packageJSON.dependencies.cors}`,
      },
    },
  });
});

app.post('/send-message', async (req, res) => {
  try {
    const { message } = req.body;
    const characterId = process.env.CHARACTER_ID;

    const chat = await characterAI.createOrContinueChat(characterId as string);

    const response = await chat.sendAndAwaitResponse(message, true);

    res.json({
      message: 'Success',
      status: {
        code: 200,
        message: 'OK',
      },
      sent: message,
      ai: {
        src: (response as Message).src,
        response: (response as Message).text,
      },
    });
  } catch (error) {
    console.error('Error', error);
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
});

export default app;
