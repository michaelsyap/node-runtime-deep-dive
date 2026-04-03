import fs from 'node:fs';

function someAsyncOperation(callback) {
  // Assume this takes 95ms to complete
  fs.readFile('../AGENTS.md', callback);
}

const timeoutScheduled = Date.now();

setTimeout(() => {
  const delay = Date.now() - timeoutScheduled;

  console.log(`${delay}ms have passed since I was scheduled`);
}, 100);

// do someAsyncOperation which takes 95 ms to complete
someAsyncOperation(() => {
  const startCallback = Date.now();

  // do something that will take 10ms...
  while (Date.now() - startCallback < 10) {
    // do nothing
    console.log(Date.now() - startCallback)
  }

  console.log('just finished fs.readFile callback', console.log(Date.now() - startCallback))
});