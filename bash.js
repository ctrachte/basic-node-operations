// #1
 process.stdout.write('prompt > ');

// #2
 process.stdin.on('data', (data) => {
// #3
   const cmd = data.toString().trim();

   process.stdout.write('You typed: ' + cmd);
   process.stdout.write('\nprompt > ');
 });