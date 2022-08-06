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

export default function Login() {
  return (
    <div style={{ padding: "100px 0", textAlign: "center" }}>
      <Form action="api/auth/login" method="POST">
        <Form.Field inline>
          <input placeholder="ID" name="userid" required={true} />
        </Form.Field>
        <Form.Field inline>
          <input
            placeholder="Password"
            name="password"
            required={true}
            maxLength={20}
          />
        </Form.Field>
        <Button color="blue" type="submit">
          Login
        </Button>
        <Link href="/register">
          <Button color="blue" type="submit">
            Register
          </Button>
        </Link>
      </Form>
    </div>
  );
}
