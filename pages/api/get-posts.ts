import Parser from "rss-parser";
import { NextApiRequest, NextApiResponse } from "next";

const parser: Parser = new Parser();

interface ApiRequest extends NextApiRequest {
  body: {
    publication: string;
    days: number;
  }
}

export default async (req: ApiRequest, res: NextApiResponse) => {
  const { publication = 'frontend-digest', days = 30 } = req.body;

  const feed = await parser.parseURL(`https://medium.com/feed/${publication}`);
  const date = new Date();
  date.setDate(date.getDate() - days);
  
  const { items } = feed;
  const filteredItems = items?.filter(item => {
    if (item.pubDate) {
      const publicationTime = new Date(item.pubDate).getTime();
      return publicationTime > date.getTime();
    }
    return false;
  });
  res.status(200).json({...feed, items: filteredItems});
};
