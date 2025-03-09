import { useEffect, useState } from "react";
import axios from "axios";

type Link = {
  id: number;
  short_code: string;
  original_url: string;
  expires_at: string;
  total_clicks: number;
}

const sortedLinks = (links: Link[]) => {
  return links.sort((a, b) => b.total_clicks - a.total_clicks)
}

const CreateShortenLink = ({ generateShortenLink }: { generateShortenLink: (event: any) => void }) => {
  return (
    <section className="space-y-6">
      <h1 className="text-4xl font-extrabold">Paste the URL to be shortened</h1>
      <form onSubmit={generateShortenLink} className="flex max-sm:flex-col items-center gap-2">
        <input type="text" name="url" className="input" />
        <button className="button w-1/4 max-sm:w-full ">Shorten URL</button>
      </form>
    </section>
  );
}

const ShortenLink = ({ link, updateTotalClicks }: { link: Link, updateTotalClicks: (link: Link) => void }) => {
  const parsedDate = (createdAt: string) => {
    const date = new Date(createdAt);

    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
  }

  return (
    <button onClick={() => updateTotalClicks(link)} className="cursor-pointer bg-teal-200 p-2 rounded-md  hover:bg-teal-400 w-full space-y-2">
      <p className="text-left">
        https://zerexei.dev/{link.short_code} ({link.original_url})
      </p>

      <div className="flex items-center justify-between">
        <p>expires at: {parsedDate(link.expires_at)}</p>
        <p className="border rounded px-2 text-xs font-semibold border-teal-600 text-teal-700">{link.total_clicks}</p>
      </div>
    </button>
  )

}

const ShortenLinks = ({ links, updatePopularLinkTotalClicks }: {
  links: Link[],
  updatePopularLinkTotalClicks: (link: Link) => void
}) => {
  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">Popular Links</h2>
      <ul className="space-y-2 max-h-[25rem] overflow-y-auto pr-2">
        {sortedLinks(links).map(link => (
          <li className="" key={link.id}>
            <ShortenLink
              link={link}
              updateTotalClicks={updatePopularLinkTotalClicks}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}

const GeneratedShortenLink = ({ link, updateGeneratedLinkTotalClicks }: { link: Link, updateGeneratedLinkTotalClicks: (link: Link) => void }) => {
  const copy = () => {
    navigator.clipboard.writeText(`https://zerexei.dev/${link.short_code}`)
  }
  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">Generated Link</h2>

      <div className="flex items-center gap-2">
        <ShortenLink
          link={link}
          updateTotalClicks={updateGeneratedLinkTotalClicks}
        />
        <button onClick={copy} className="button">Copy</button>
      </div>
    </section>
  )
}


const App = () => {
  const [generatedShortenLink, setGeneratedShortenLink] = useState<Link>({} as Link);
  const [shortenLinks, setShortenLinks] = useState<Link[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await axios('http://localhost:5000/links');
      const links: Link[] = res.data
      setShortenLinks(links);
      setLoading(false);
    })()
  }, [])

  const visit = async (link: Link) => {
    const res = await axios.patch("http://localhost:5000/links", link);
    return res.data
  }

  const updateGeneratedLinkTotalClicks = async (link: Link) => {
    setLoading(true);
    link = await visit(link)
    setGeneratedShortenLink(link);
    setLoading(false);
  }
  const updatePopularLinkTotalClicks = async (target: Link) => {
    setLoading(true);
    target = await visit(target)

    setShortenLinks((prevLinks) =>
      prevLinks.map((link) =>
        link.id === target.id ? { ...link, ...target } : link
      )
    );
    setLoading(false);
  }

  const generateShortenLink = async (event: any) => {
    setLoading(true);
    event.preventDefault();
    const formData = new FormData(event.target);
    const url = formData.get("url");

    const res = await axios.post('http://localhost:5000/links', { url })
    setGeneratedShortenLink(res.data)
    setLoading(false);
  }
  return (
    <>
      <main className="space-y-6">
        {
          loading
            ? <div className="fixed inset-0 bg-black/10 text-4xl font-extrabold flex items-center justify-center">Loading....</div>
            : ""
        }

        <CreateShortenLink generateShortenLink={generateShortenLink} />

        {
          generatedShortenLink.id
            ? <GeneratedShortenLink link={generatedShortenLink} updateGeneratedLinkTotalClicks={updateGeneratedLinkTotalClicks} />
            : ""
        }

        {
          shortenLinks.length
            ? <ShortenLinks links={shortenLinks} updatePopularLinkTotalClicks={updatePopularLinkTotalClicks} />
            : ""
        }
      </main>
    </>
  )
}

export default App
