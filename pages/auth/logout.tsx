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

export default function Logout() {
  return (
    <div style={{ padding: "100px 0", textAlign: "center" }}>
      <Form action="/api/auth/logout" method="GET">
        <Header>Are you real..?</Header>
        <Button color="blue" type="submit">
          Yes!!
        </Button>
        <Link href="/">
          <Button>No!!</Button>
        </Link>
      </Form>
    </div>
  )
}
