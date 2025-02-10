// jest.config.mjs
export default {
    testMatch: [
        "**/__tests__/**/*.js?(x)",
        "**/?(*.)+(spec|test).js?(x)"
    ],
    transform: {}, // Leave this empty!
    moduleFileExtensions: ["js", "jsx", "json", "node"],
    // ... other Jest configurations
};