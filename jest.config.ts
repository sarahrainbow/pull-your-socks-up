import type {Config} from 'jest';

const config: Config = {
    verbose: true,
};

module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
}

export default config;