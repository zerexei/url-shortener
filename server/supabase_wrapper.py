import os
import uuid
from datetime import datetime, timedelta
from supabase import create_client, Client

url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_KEY")

supabase: Client = create_client(url, key)


class Supabase:
    def getConnection(self):
        return supabase

    def getLinks(self):
        # session = supabase.auth.get_session()
        # print(session)

        response = supabase.table("urls").select("*").execute()
        return response.data

    def getLink(self, short_code):
        current_time = datetime.now().isoformat()
        response = (
            supabase.table("urls")
            .select("*")
            .eq("short_code", short_code)
            .gte("expires_at", current_time)
            .limit(1)
            .execute()
        )

        return response.data

    def createLink(self, url):
        short_code = str(uuid.uuid4())[:8]
        expires_at = (datetime.now() + timedelta(days=5)).strftime("%Y-%m-%d %H:%M:%S")

        existing_url = self._urlExists(url)
        if len(existing_url.data):
            return existing_url.data[0]

        response = (
            supabase.table("urls")
            .insert(
                {
                    "short_code": short_code,
                    "original_url": url,
                    "expires_at": expires_at,
                }
            )
            .execute()
        )

        return response.data[0]

    def clickLink(self, link_id, total_clicks):
        response = (
            supabase.table("urls")
            .update({"total_clicks": total_clicks})
            .eq("id", link_id)
            .execute()
        )

        if not len(response.data):
            raise Exception("Something went wrong.")

        return response.data[0]

    def _urlExists(self, url):
        return (
            supabase.table("urls")
            .select("*")
            .eq("original_url", url)
            .limit(1)
            .execute()
        )
