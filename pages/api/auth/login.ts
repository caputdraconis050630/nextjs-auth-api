import { request } from "http";
import pc from "../../../lib/backend/prismaClient"; // From PIE
import { NextApiRequest, NextApiResponse } from "next";
import * as yup from "yup";

export type LoginUser = {
  userid: string;
  password: string;
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    // 아이디와 비밀번호를 입력하면 로그인
    const user = await pc.user.findFirst({
      where: { userid: req.body.id },
    });
    if (user === undefined) {
      // 아이디 존재 X
      res
        .status(200)
        .json({ login: false, message: "아이디가 존재하지 않습니다. :)" });
    }
    if (user?.password === req.body.password) {
      // 쿠키 설정

      res.status(200).json({ login: true, message: "로그인 되었습니다 :)" });
    } else {
      // 아이디 존재, 비밀번호 일치 X
      res
        .status(200)
        .json({ login: false, message: "비밀번호가 일치하지 않습니다 :(" });
    }
  } else if (req.method === "GET") {
    // 현재 로그인된 사용자를 조회합니다. 로그인한 사용자가 없으면 에러 처리를 합니다.
  }
};

async function validateRegisterUserBody(body: any): Promise<LoginUser> {
  return await yup
    .object({
      userid: yup.string().required(),
      nickname: yup.string().max(20).required(),
      password: yup.string().max(20).required(),
      password_r: yup.string().max(20).required(),
    })
    .validate(body);
}
