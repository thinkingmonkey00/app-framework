import com from './com';

com.run('eslint --fix scripts/*.js scripts/**/*.js', (err, data) => {
  if (err) console.log('ERROR', data);
  else console.log('SUCCESS', data);
});
/*
com.run('node_modules/.bin/', (err, data) => {
  console.log(err ? 'ERROR' : 'NOERROR', data);
});
*/

