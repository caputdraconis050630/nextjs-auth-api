/*
	현재 회원가입한 사용자를 모두 보여줍니다.
*/

import { NextApiRequest, NextApiResponse } from "next";
import pc from "../../../lib/backend/prismaClient"; // From PIE

export default async function (req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET":
      const user_data = await pc.user.findMany();
      return res.status(200).send(user_data);
    default:
      // api/users에 GET이 아닌 방식으로는 접근 불가능
      return res.status(405).end(`Method ${req.method} Is Not Allowed.`);
  }
}
