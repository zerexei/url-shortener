from flask import Blueprint, request
from flask_cors import cross_origin
from supabase_wrapper import Supabase

links = Blueprint("links", __name__)

supabase = Supabase()


@links.get("/links")
@cross_origin()
def index():
    return supabase.getLinks()


@links.post("/links")
@cross_origin()
def store():
    payload = request.json
    url = payload["url"]

    if not url:
        raise Exception("URL is required.")

    return supabase.createLink(url)


@links.patch("/links")
@cross_origin()
def update():
    payload = request.json
    link_id = payload["id"]
    total_clicks = payload["total_clicks"] + 1
    return supabase.clickLink(link_id, total_clicks)
