/*
	GET : 특정 유저 아이디로 사용자를 조회합니다.
	POST : 특정 유저 아이디로 해당 사용자 닉네임을 수정합니다.
*/

export type ChangeNickname = {
  userid: string
  nickname: string
}

import { NextApiRequest, NextApiResponse } from "next"
import pc from "../../../lib/backend/prismaClient" // From PIE
import * as yup from "yup"
import { withWrapper } from "../../../src/backend/middleware/withWrapper"

export default withWrapper(
  ["GET", "POST"],
  async (req: NextApiRequest, res: NextApiResponse) => {
    const { userId } = req.query
    // console.log(req.method)
    switch (req.method) {
      case "GET":
        const user_data = await pc.user.findFirst({
          where: {
            userid: userId as string,
          },
        })
        return res.status(200).send(user_data)
      case "POST":
        const formdata = await validateChangeNicknameBody(req.body)
        await pc.user.update({
          data: {
            nickname: formdata.nickname,
          },
          where: {
            userid: userId as string,
          },
        })
        return res
          .status(200)
          .redirect("/")
          .end("Nickname has changed successfully")
      default:
        // api/users/[userId]에 GET, POST가 아닌 다른 방식으로는 접근 불가능
        return res.status(405).end(`Method ${req.method} Is Not Allowed.`)
    }
  },
)

async function validateChangeNicknameBody(body: any): Promise<ChangeNickname> {
  return await yup
    .object({
      userid: yup.string().required(),
      nickname: yup.string().max(20).required(),
    })
    .validate(body)
}
