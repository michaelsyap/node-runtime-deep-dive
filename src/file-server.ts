import { createServer, IncomingMessage, ServerResponse } from 'node:http';
import { createReadStream } from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const server = createServer<IncomingMessage, ServerResponse>((req: IncomingMessage, res:ServerResponse) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plan');
  
  console.log(process.cwd())

  let stream = createReadStream(path.join(process.cwd(), 'scratch/file.txt'));
  
  stream.on('error', (err: Error) => {
    res.statusCode = 404;
    res.end(`File not found:${err.message}`);    
  });



  stream.pipe(res);
  
  
});


server.listen(3000, () => {
  console.log('File server is running at http://localhost:3000')
});