import { renderStory } from './renderStory';
import { loadCsfFile } from './loadCsfFile';
import { composeStory } from './composeStory.ts';

const globalConfig = require('../../../Chroma/chromatic/.storybook/preview.js');

const context = require.context(
  '../../../Chroma/chromatic/services/webapp/components',
  true,
  /.*\.stories\.js$/,
  'lazy'
);

const componentIdMap = Object.fromEntries(
  context.keys().map((key) => {
    // key is of the form './ActivityItem.stories.js' -- map it to 'activityitem'
    const match = /([a-zA-Z]+)\.stories/.exec(key);
    return [match ? match[1].toLowerCase() : key, key];
  })
);

console.log(componentIdMap);

async function go() {
  const params = new URLSearchParams(document.location.search);
  const storyId = params.get('id');

  // Try to match a componentId inside the storyId
  const componentId = Object.keys(componentIdMap).find((id) => storyId.includes(id));

  if (!componentId) {
    throw new Error(`Didn't find a component matching storyId: ${storyId}
    
    componentIds: ${Object.keys(componentIdMap).join(',')}`);
  }

  const exports = await context(componentIdMap[componentId]);
  console.log(exports);
  const stories = loadCsfFile(exports);
  console.log(stories);

  const story = stories[storyId];

  if (!story) {
    throw new Error(`Didn't find a story matching storyId: ${storyId}
    
    storyIds: ${Object.keys(stories).join(',')}`);
  }

  const composed = composeStory(story, exports.default, globalConfig);

  renderStory(composed);
}

go()
  .then(() => console.log('done'))
  .catch((err) => console.log({ err }));