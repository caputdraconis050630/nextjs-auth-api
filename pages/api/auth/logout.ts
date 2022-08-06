/*
	DELETE : 로그아웃을 진행합니다.
*/

import { NextApiRequest, NextApiResponse } from "next";

export default function Logout(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "DELETE":
      res.setHeader(
        "Set-Cookie",
        "access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httyonly"
      );
      res.statusCode = 204;
      return res.end();
    default:
      return res.status(405).end(`Method ${req.method} Is Not Allowed.`);
  }
}
