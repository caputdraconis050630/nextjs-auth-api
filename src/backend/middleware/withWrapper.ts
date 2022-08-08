import { NextApiRequest, NextApiResponse, NextApiHandler } from "next"

export type HttpMethod = "GET" | "POST" | "DELETE" | "PUT"

export const withWrapper =
  (methods: HttpMethod[], handler: NextApiHandler): NextApiHandler =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    if (
      req.method !== undefined &&
      !methods.includes(req.method as HttpMethod)
    ) {
      res.status(405).end()
    } else {
      try {
        await handler(req, res)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        // eslint-disable-next-line no-console
        console.error(error)
        res.status(400).json({ message: error.message, error })
      }
    }
  }
