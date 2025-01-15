import jwt, { Algorithm } from 'jsonwebtoken';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const teamID = process.env.APPLE_TEAM_ID!;
const clientID = process.env.APPLE_CLIENT_ID!;
const keyID = process.env.APPLE_KEY_ID!;
const privateKey = process.env.APPLE_PRIVATE_KEY!.replace(/\\n/g, '\n');

/**
 * Creates a client secret for Apple OAuth using JWT.
 * @returns {string} The signed JWT as a client secret.
 */
const createClientSecret = (): string => {
  const payload = {
    iss: teamID,
    aud: 'https://appleid.apple.com',
    sub: clientID,
  };

  const options: jwt.SignOptions = {
    algorithm: 'ES256' as Algorithm,
    header: {
        kid: keyID,
        alg: ''
    },
    expiresIn: '180d', // Adjust as needed
  };

  return jwt.sign(payload, privateKey, options);
};


// Apple authorization URL
const getAuthorizationUrl = (redirectUri: string, state: string, nonce: string): string => {
  const queryParams = new URLSearchParams({
    response_type: 'code id_token',
    client_id: clientID,
    redirect_uri: redirectUri,
    scope: 'email name',
    state,
    nonce,
  });

  return `https://appleid.apple.com/auth/authorize?${queryParams.toString()}`;
};

/**
 * Exchanges an authorization code for tokens with Apple's OAuth service.
 * @param {string} code - The authorization code received from Apple.
 * @returns {Promise<any>} A promise that resolves to the token response data.
 * @throws Will throw an error if the token exchange fails.
 */
const exchangeCodeForTokens = async (code: string): Promise<any> => {
    try {
      const clientSecret = createClientSecret();
  
      const response = await axios.post(
        'https://appleid.apple.com/auth/token',
        new URLSearchParams({
          grant_type: 'authorization_code',
          code,
          redirect_uri: process.env.APPLE_REDIRECT_URI!,
          client_id: process.env.APPLE_CLIENT_ID!,
          client_secret: clientSecret,
        }),
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
      );
  
      return response.data; // Contains id_token, access_token, etc.
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error exchanging code for tokens:', error.response?.data || error.message);
      } else {
        console.error('Unexpected error:', error);
      }
      throw new Error('Failed to exchange code for tokens.');
    }
  };

// Verify ID token (JWT)
const verifyIdToken = (idToken: string): any => {
  const decoded = jwt.decode(idToken, { complete: true }) as any;

  if (!decoded) {
    throw new Error('Invalid ID token');
  }

  // You can also verify using Apple's public keys: https://appleid.apple.com/auth/keys
  return decoded.payload;
};

export { createClientSecret, getAuthorizationUrl, exchangeCodeForTokens, verifyIdToken };
