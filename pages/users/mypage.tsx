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

type MyPageData = {
  userid: string
  nickname: string
  isLoggedIn: Boolean
}

export default function Mypage({ userid, nickname, isLoggedIn }: MyPageData) {
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
    return (
      <div style={{ padding: "100px 0", textAlign: "center" }}>
        <Header size="huge">This Is {nickname}'s Page' :)</Header>
        <Segment>userid : {userid}</Segment>
        <Segment>nickname : {nickname}</Segment>
        <Link href="/users/change_nickname">
          <Button primary>Change Nickname</Button>
        </Link>
        <Link href="/">
          <Button primary>Home</Button>
        </Link>
      </div>
    )
  }
}

export const getServerSideProps: GetServerSideProps<MyPageData> = async (
  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  context,
) => {
  if (context.req.cookies.access_token === undefined) {
    return {
      props: {
        userid: "sss",
        nickname: "NULL",
        isLoggedIn: false,
      },
    }
  }

  // GET 방식으로 쿠키를 보존한 채 넘기고 싶었숩니당..
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
      userid: "sss",
      nickname: res_json["nickname"],
      isLoggedIn: true,
    },
  }
}
