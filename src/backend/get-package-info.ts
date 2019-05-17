import {Request, Response} from './now';

import {getInfo} from './';

export default async (req: Request, res: Response) => {
  console.log(req.url);
  const info = await getInfo('express');
  res.end('result 2: ' + JSON.stringify(info));
};
