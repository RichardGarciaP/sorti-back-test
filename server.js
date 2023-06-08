const app = require('./app')
const {PORT} = require('./config/config.env')


process.on('uncaughtException', (err) => {
    console.log('UNCAUGHT EXCEPTION 💥 Shutting down...');
    console.log(err.name, err.message);
    process.exit(1);
});


const port = PORT|| 5000;

const server = app.listen(port, ()=> {
    console.log(`SERVER RUNNING ON http://localhost:${server.address().port}`)
})

process.on('unhandledRejection', (err) => {
    console.log('UNHANDLERED REJECTION 💥 Shutting down...');
    console.log(err.name, err.message);
    server.close(() => {
      process.exit(1);
    });
});


process.on('SIGTERM', () => {
    console.log('💥 SIGTERM RECEIVED. Shutting down gracefully');
    server.close(() => {
      console.log('💥 Process terminated!');
    });
  });
  