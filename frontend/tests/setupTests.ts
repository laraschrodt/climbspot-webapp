import '@testing-library/jest-dom';
import fetchMock from 'jest-fetch-mock';
import { TextEncoder, TextDecoder } from 'util';
fetchMock.enableMocks();

(global as any).TextEncoder = TextEncoder;
(global as any).TextDecoder = TextDecoder;
