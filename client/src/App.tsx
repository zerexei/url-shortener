import { useState } from "react";

type Link = {
  id: number;
  url: string;
  total_clicks: number;
}

const CreateShortenLink = () => {
  return (
    <section className="space-y-6">
      <h1 className="text-4xl font-extrabold">Paste the URL to be shortened</h1>
      <div className="flex max-sm:flex-col items-center gap-2">
        <input type="text" className="input" />
        <button className="button w-1/4 max-sm:w-full ">Shorten URL</button>
      </div>
    </section>
  );
}

const sortedLinks = (links: Link[]) => {
  return links.sort((a, b) => b.total_clicks - a.total_clicks)
}

const ShortenLinks = ({ links }: { links: Link[] }) => {
  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">Popular Links</h2>
      <ul className="space-y-2 max-h-[25rem] overflow-y-auto pr-2">
        {sortedLinks(links).map(link => (
          <li className="">
            <a href={link.url} className="cursor-pointer bg-teal-200 p-2 rounded-md flex items-center justify-between hover:bg-teal-400">
              <p>{link.url}</p>
              <p className="border rounded px-2 text-xs font-semibold border-teal-600 text-teal-700">{link.total_clicks}</p>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

const GeneratedShortenLink = ({ link }: { link: Link }) => {
  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">Generated Link</h2>

      <div className="flex items-center gap-2">
        <a href={link.url} className="cursor-pointer bg-teal-200 p-2 rounded-md flex items-center justify-between hover:bg-teal-400 w-full">
          <p>{link.url}</p>
          <p className="border rounded px-2 text-xs font-semibold border-teal-600 text-teal-700">{link.total_clicks}</p>
        </a>
        
        <button className="button">Copy</button>
      </div>
    </section>
  )
}


const App = () => {
  const [generatedShortenLink, setGeneratedShortenLink] = useState<Link>({id: 1, url: 'asdasd', total_clicks: 123} as Link);

  const [shortenLinks, setShortenLinks] = useState<Link[]>([
    { id: 1, url: "https://short-link.com/abc1231", total_clicks: 1 },
    { id: 2, url: "https://short-link.com/abc1232", total_clicks: 12 },
    { id: 3, url: "https://short-link.com/abc1233", total_clicks: 123 },
    { id: 433, url: "https://short-link.com/abc1234", total_clicks: 1234 },
    { id: 5232, url: "https://short-link.com/abc1235", total_clicks: 12345 },
    { id: 522, url: "https://short-link.com/abc1235", total_clicks: 12345 },
    { id: 115, url: "https://short-link.com/abc1235", total_clicks: 12345 },
    { id: 65, url: "https://short-link.com/abc1235", total_clicks: 12345 },
    { id: 55, url: "https://short-link.com/abc1235", total_clicks: 12345 },
    { id: 45, url: "https://short-link.com/abc1235", total_clicks: 12345 },
    { id: 35, url: "https://short-link.com/abc1235", total_clicks: 12345 },
    { id: 25, url: "https://short-link.com/abc1235", total_clicks: 12345 },
    { id: 15, url: "https://short-link.com/abc1235", total_clicks: 12345 },
    { id: 58, url: "https://short-link.com/abc1235", total_clicks: 12345 },
    { id: 57, url: "https://short-link.com/abc1235", total_clicks: 12345 },
    { id: 56, url: "https://short-link.com/abc1235", total_clicks: 12345 },
    { id: 55, url: "https://short-link.com/abc1235", total_clicks: 12345 },
    { id: 54, url: "https://short-link.com/abc1235", total_clicks: 12345 },
    { id: 53, url: "https://short-link.com/abc1235", total_clicks: 12345 },
    { id: 52, url: "https://short-link.com/abc1235", total_clicks: 12345 },
  ]);
  return (
    <>
      <main className="space-y-6">
        <CreateShortenLink />
        {generatedShortenLink.id ? <GeneratedShortenLink link={generatedShortenLink} /> : ""}
        {shortenLinks.length ? <ShortenLinks links={shortenLinks} /> : ""}
      </main>
    </>
  )
}

export default App
