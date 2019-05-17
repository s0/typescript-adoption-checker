import {Request, Response} from './now';

import {getInfo} from './';

export default async (req: Request, res: Response) => {
  console.log(req.url);
  const info = await getInfo('express');
  res.end('result: ' + JSON.stringify(info));
};
