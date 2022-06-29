import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from "@/db/client";
import { customAlphabet } from "nanoid";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { link } = JSON.parse(req.body);

    if (!link) {
        res.statusCode = 404;

        res.send(JSON.stringify({ message: "Link not passed in the body or type of link is not string" }));

        return;
    }

    const foundLink = await prisma.shortLink.findFirst({
        where: {
            url: {
                equals: link
            }
        }
    });

    if (foundLink) {
        res.statusCode = 409;

        res.send(JSON.stringify({ message: "Link already exists", link: foundLink }));

        return;
    }

    const nanoid = customAlphabet('qwertyuiopasdfghjklzxcvbnm', 6);

    const newLink = await prisma.shortLink.create({
        data: {
            url: link,
            slug: nanoid()
        }
    })

    if (newLink) {
        res.statusCode = 200;

        res.json({ link: newLink });

        return;
    }

    res.statusCode = 500;

    res.send(JSON.stringify({ message: "Internal server error", }));
}