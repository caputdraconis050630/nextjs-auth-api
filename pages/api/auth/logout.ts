/*
	DELETE : 로그아웃을 진행합니다.
*/

import { NextApiRequest, NextApiResponse } from "next"
import { withWrapper } from "../../../src/backend/middleware/withWrapper"

export default withWrapper(
  ["GET"],
  (req: NextApiRequest, res: NextApiResponse) => {
    console.log("LOGOUT")
    switch (req.method) {
      case "GET":
        res.setHeader(
          "Set-Cookie",
          "access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; Httponly",
        )
        res.statusCode = 204
        return res.redirect("/").end()
      default:
        return res.status(405).end(`Method ${req.method} Is Not Allowed.`)
    }
  },
)
