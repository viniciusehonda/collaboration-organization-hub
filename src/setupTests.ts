// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

const localStorageMocka = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
  };

const localStorageMock : Storage = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
    length: 0,
    key(index) {
        if (typeof index === 'undefined') {
            throw new Error(
              "Uncaught TypeError: Failed to execute 'key' on 'Storage': 1 argument required, but only 0 present."
            );
          }
      
          if (index >= Object.keys(this.store).length) {
            return null;
          }
      
          return Object.keys(this.store)[index];
    },
}
global.localStorage = localStorageMock;