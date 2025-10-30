const express = require('express');
const app = express();
const PORT = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { Queue, Worker } = require('bullmq');

// Create a new connection in every instance
const prediction_queue = new Queue('predict', {
  connection: {
    host: 'localhost',
    port: 6379,
  },
});
// producer
async function addJobs() {
  let job=await prediction_queue.add('predict', { foo: 'bar' });
//   await myQueue.add('myJobName', { qux: 'baz' });
return job;
}
// consumer (worker)
addJobs().then((job) => {
  console.log('Jobs added to the queue',job.id);
}).catch((err) => {
  console.error('Error adding jobs to the queue', err);
});

const myWorker = new Worker('predict', async job => {
    console.log(job.id);
}, {
  connection: {
    host: 'localhost',
    port: 6379,
  },
});












app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});