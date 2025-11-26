/* © 2025 cloudxs GmbH. All rights reserved. / .release-it.ts */

import type { Config } from 'release-it';

export default {
  git: {
    commit: true,
    tag: true,
    push: true,
    requireBranch: 'main',
  },
  github: {
    release: false,
  },
  npm: {
    publish: true,
  },
  hooks: {
    'before:init': ['git pull', 'bun run lint', 'bun test'],
  },
  plugins: {
    '@release-it/conventional-changelog': {
      preset: 'eslint',
      infile: 'CHANGELOG.md',
    },
  },
} satisfies Config;
