import { authHandlers } from './mockHandlers/authMockHandlers';
import { postHandlers } from './mockHandlers/postMockHandlers';

export const handlers = [...authHandlers, ...postHandlers];
