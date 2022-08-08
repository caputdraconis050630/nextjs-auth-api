import { Button, Form } from "semantic-ui-react"

export default function Register() {
  return (
    <div style={{ padding: "100px 0", textAlign: "center" }}>
      <Form action="/api/auth/register" method="POST">
        <Form.Field inline>
          <input placeholder="ID" name="userid" required={true} />
        </Form.Field>
        <Form.Field inline>
          <input
            placeholder="Nickname"
            name="nickname"
            required={true}
            maxLength={20}
          />
        </Form.Field>
        <Form.Field inline>
          <input
            placeholder="Password"
            name="password"
            required={true}
            maxLength={20}
          />
        </Form.Field>
        <Form.Field inline>
          <input
            placeholder="Password Check"
            name="password_r"
            required={true}
            maxLength={20}
          />
        </Form.Field>
        <Button color="blue">Register</Button>
      </Form>
    </div>
  )
}
