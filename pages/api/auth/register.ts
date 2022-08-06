import pc from "../../../lib/backend/prismaClient"; // From PIE
import { NextApiRequest, NextApiResponse } from "next";
import * as yup from "yup";

export type RegisterUser = {
  userid: string;
  nickname: string;
  password: string;
  password_r: string;
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    // 아이디 입력, 닉네임 입력, 비밀번호 입력, 비밀번호 재입력 검사 → 회원가입
    // const user: RegisterUser = {
    //   userid: req.body.id,
    //   nickname: req.body.nickname,
    //   password: req.body.password,
    // };
    // 유효성 검사
    const formdata: RegisterUser = await validateRegisterUserBody(req.body);

    if (formdata.password !== formdata.password_r) {
      res.status(400).json({
        register: false,
        message: "비밀번호를 동일하게 입력해주세요 :(",
      });
      return;
    }
    await pc.user.create({
      data: formdata,
    });
    res
      .status(200)
      .json({ register: true, message: "회원가입이 완료되었습니다." });
  } else {
    // api/register에 POST가 아닌 방식으로는 접근 불가능
    res.status(400).end();
  }
};

async function validateRegisterUserBody(body: any): Promise<RegisterUser> {
  return await yup
    .object({
      userid: yup.string().required(),
      nickname: yup.string().max(20).required(),
      password: yup.string().max(20).required(),
      password_r: yup.string().max(20).required(),
    })
    .validate(body);
}
