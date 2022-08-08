import Link from "next/link"
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
} from "semantic-ui-react"
import { GetServerSideProps } from "next"

type ChangeNicknameData = {
  userid: string
  nickname: string
  isLoggedIn: Boolean
}

export default function ChangeNickname({
  userid,
  nickname,
  isLoggedIn,
}: ChangeNicknameData) {
  if (!isLoggedIn) {
    return (
      <div style={{ padding: "100px 0", textAlign: "center" }}>
        <Header size="huge">Login is Needed</Header>
        <Link href="/auth/login">
          <Button primary>To Login Page</Button>
        </Link>
      </div>
    )
  } else {
    const change_nickname_url = "/api/users/" + userid
    return (
      <div style={{ padding: "100px 0", textAlign: "center" }}>
        <Header size="huge">Type Your Nickname which you want!</Header>
        <Form action={change_nickname_url} method="POST">
          <Form.Field inline>
            <input
              placeholder={nickname}
              name="nickname"
              required={true}
              maxLength={20}
            />
          </Form.Field>
          <input value={userid} name="userid" type="hidden" />
          <Button type="submit">Save Change</Button>
        </Form>
      </div>
    )
  }
}

export const getServerSideProps: GetServerSideProps<
  ChangeNicknameData
> = async (
  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  context,
) => {
  // 쿠키가 없을 때 => 로그인이 되어있지 않음.
  if (context.req.cookies.access_token === undefined) {
    return {
      props: {
        userid: "sss",
        nickname: "NULL",
        isLoggedIn: false,
      },
    }
  }

  const api_url = String(process.env.HOST) + "/api/auth/login"
  const req: RequestInit = {}
  req.credentials = "include"
  req.headers = {
    "Content-Type": "application/json",
    Cookie: String(context.req.cookies.access_token),
  }
  req.method = "GET"

  const response = await fetch(api_url, req)
  const res_json = await response.json()
  return {
    props: {
      userid: res_json["userid"],
      nickname: res_json["nickname"],
      isLoggedIn: true,
    },
  }
}
