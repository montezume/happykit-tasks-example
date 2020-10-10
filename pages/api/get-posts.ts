import Parser from "rss-parser";
import { NextApiRequest, NextApiResponse } from "next";

const parser: Parser = new Parser();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { publication, days = '30' } = req.query;
  const feed = await parser.parseURL(`https://medium.com/feed/${publication}`);
  const date = new Date();
  date.setDate(date.getDate() - Number(days));
  
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
