import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../db/client"

export default async function API(req: NextApiRequest, res: NextApiResponse) {
    const slug = req.query["slug"];

    if (!slug || typeof slug !== "string") {
        res.statusCode = 404;

        res.send(JSON.stringify({ message: "Not Found" }))

        return;
    }

    const data = await prisma?.shortLink.findFirst({
        where: {
            slug: {
                equals: slug
            }
        }
    })

    if (!data) {
        res.statusCode = 404;

        res.send(JSON.stringify({ message: "Not Found" }))

        return;
    }

    return res.json({ data });
};