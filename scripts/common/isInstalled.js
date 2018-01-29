import path from 'path';
import fs from 'fs';

export default () => fs.existsSync(path.resolve(__dirname, '../../../../package.json'));
