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
import login from "./api/auth/login"
import { GetServerSideProps } from "next"

type UserData = {
  nickname: string
  isLoggedIn: Boolean
}

export default function Home({ nickname, isLoggedIn }: UserData) {
  if (!isLoggedIn) {
    return (
      <div style={{ padding: "100px 0", textAlign: "center" }}>
        <Header size="huge">HOME</Header>
        <Link href="/auth/login">
          <Button primary>Login</Button>
        </Link>
        <Link href="/auth/register">
          <Button primary>Register</Button>
        </Link>
      </div>
    )
  } else {
    return (
      <div style={{ padding: "100px 0", textAlign: "center" }}>
        <Header size="huge">Hi {nickname} :)</Header>
        <Link href="/api/logout">
          <Button primary>Logout</Button>
        </Link>
        <Link href="/users/mypage">
          <Button primary>My page</Button>
        </Link>
        <Link href="/api/users">
          <Button primary>Users</Button>
        </Link>
      </div>
    )
  }
}

export const getServerSideProps: GetServerSideProps<UserData> = async (
  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  context,
) => {
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
      nickname: res_json["nickname"],
      isLoggedIn: true,
    },
  }
}
