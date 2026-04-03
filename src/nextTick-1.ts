/*
On this example, we can see process.nextTick() in action.
The output looks like this:
test1 null
test2 hello world

This file executes test1() right away and even if foo was updated to 'hello world' at the very end of the the file, test1() will still print null because it was executed before foo was updated.

Now, after this file is processed, the callback in process.nextTick() will be executed. When it is executed, foo will be 'hello world' and test2() will print 'hello world'. 

That is because process.nextTick() is executed after the current operation is completed, but before the event loop continues to the next operation.

*/
let foo:any = null;

process.nextTick(() => {
  test2();
});

function test1() {
  console.log('test1',foo);
}

function test2() {
  console.log('test2', foo)
}

test1();

foo = 'hello world';


