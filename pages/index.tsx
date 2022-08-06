import Link from "next/link";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
} from "semantic-ui-react";

export default function Home() {
  return (
    <div style={{ padding: "100px 0", textAlign: "center" }}>
      <Header size="huge">HOME</Header>
      <Link href="/login">
        <Button primary>Login</Button>
      </Link>
      <Link href="/register">
        <Button primary>Register</Button>
      </Link>
      <Link href="/api/users">
        <Button primary>Users</Button>
      </Link>
    </div>
  );
}
