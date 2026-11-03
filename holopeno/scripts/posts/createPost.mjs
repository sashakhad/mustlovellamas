import fs from 'fs';
import path from 'path';
import { getCurrentDateInfo } from '../../lib/utils/date-utils.mjs';
import { getPostsDir } from '../../lib/utils/path-utils.mjs';
import { logInfo, logSuccess } from '../../lib/utils/logging.mjs';

const { year, monthStr, dayStr } = getCurrentDateInfo();
const postDir = path.join(getPostsDir(), `${year}`, `${monthStr}`);
const baseFilename = `${year}-${monthStr}-${dayStr}`;

function generateDefaultContent() {
  return `---
title: "new post on ${year}-${monthStr}-${dayStr}"
date: "${year}-${monthStr}-${dayStr}"
tags: [notes]
description: "a short summary for the index and rss."
---

Write here. This is MDX, so ordinary Markdown works.

For a photo, put the file in \`public/images\` and use either Markdown:

\`\`\`md
![Alt text that also becomes the caption](/images/example.png)
\`\`\`

or the image component when you need exact dimensions:

\`\`\`mdx
<MdxImage src="/images/example.png" alt="Alt text" width={1400} height={900} caption="Optional caption" />
\`\`\`
`;
}

function getAvailableFilename(baseDir, baseName) {
  let counter = 0;
  let filename = baseName;
  let filePath = path.join(baseDir, `${filename}.mdx`);

  while (fs.existsSync(filePath)) {
    counter += 1;
    filename = `${baseName}.${counter}`;
    filePath = path.join(baseDir, `${filename}.mdx`);
  }

  return filePath;
}

fs.mkdirSync(postDir, { recursive: true });

const postPath = getAvailableFilename(postDir, baseFilename);
fs.writeFileSync(postPath, generateDefaultContent(), 'utf8');

logSuccess(`New post created at: ${postPath}`);
logInfo("Edit the post, then run 'pnpm run publish' when you want it committed.");
