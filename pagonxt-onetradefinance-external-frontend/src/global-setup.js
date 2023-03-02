// This file is needed as it's run before everything else, even before than setupTests.ts
// Set Timezone for tests to UTC so it's the same in CI and in local
module.exports = async () => {
  process.env.TZ = 'UTC';
};
