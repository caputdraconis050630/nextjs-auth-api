/*
    POST : 아이디와 비밀번호를 입력하면 로그인 합니다.
    GET : 현재 로그인된 사용자를 조회합니다. 로그인한 사용자가 없으면 에러 처리를 합니다.
*/

import { request } from "http"
import pc from "../../../lib/backend/prismaClient" // From PIE
import { NextApiRequest, NextApiResponse } from "next"
import * as yup from "yup"
import jwt from "jsonwebtoken"

export type LoginUser = {
  userid: string
  password: string
}

// JWT SECRET KEY

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "POST":
      /**  아이디와 비밀번호를 입력하면 로그인 */
      const formdata = await validateRegisterUserBody(req.body)

      const user = await pc.user.findFirst({
        where: formdata,
      })

      if (user === null) {
        // 아이디 존재 X
        return res.status(200).json({
          login: false,
          message: "아이디나 비밀번호가 일치하지 않습니다. :)",
        })
      }
      // 쿠키 설정
      // 쿠키가 내가 만든 쿠키가 맞나,, 테스트용으로 앞에 TEST라는 문자열을 이어붙임
      const token = jwt.sign(
        String(formdata.userid),
        process.env.JWT_SECRET_KEY!,
      )
      res.setHeader(
        "Set-Cookie",
        `access_token=${token}; path=/; Expires=${new Date(
          Date.now() + 60 * 60 * 24 * 1000 * 3, //3일
        ).toUTCString()}; Httponly`,
      )

      res.statusCode = 200
      return res.redirect("/").send(user)
    // return res
    //   .status(200)
    //   .json({ login: true, message: "로그인 되었습니다 :)" });

    case "GET":
      // 현재 로그인된 사용자를 조회합니다. 로그인한 사용자가 없으면 에러 처리를 합니다.
      const accessToken = req.headers.cookie
      // console.log(accessToken)
      if (accessToken === undefined) {
        return res.status(404).end("sss")
      }
      if (!accessToken) {
        res.statusCode = 400
        return res.send("access_token이 없습니다.(로그인 되어있지 않습니다.)")
      }
      // console.log(accessToken);
      const userId = jwt.verify(accessToken, process.env.JWT_SECRET_KEY!)

      const user_get = await pc.user.findFirstOrThrow({
        where: { userid: String(userId) },
      })
      return res.status(200).json(user_get)

    default:
      return res.status(405).end(`Method ${req.method} Is Not Allowed.`)
  }
}

async function validateRegisterUserBody(body: any): Promise<LoginUser> {
  return await yup
    .object({
      userid: yup.string().required(),
      password: yup.string().max(20).required(),
    })
    .validate(body)
}
