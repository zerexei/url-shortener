from flask import Blueprint, jsonify, redirect, request
from flask_cors import cross_origin
from supabase_wrapper import Supabase
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address

links = Blueprint("links", __name__)

limiter = Limiter(
    get_remote_address,
    default_limits="1/second; 5/minute; 50/hour; 200/day",
    storage_uri="memory://",
)

supabase = Supabase()


# TODO: cache links
@links.get("/links")
@cross_origin()
def index():
    return supabase.getLinks()


# TODO: cache link
@links.get("/links/<string:short_code>")
@cross_origin()
def show(short_code):
    data = supabase.getLink(short_code)
    if data:
        original_url = data[0]["original_url"]
        return redirect(original_url)
    else:
        return jsonify({"success": False, "message": "Link not found or expired"}), 404


# TODO: update cached links
@links.post("/links")
@cross_origin()
def store():
    payload = request.json
    url = payload["url"]

    if not url:
        raise Exception("URL is required.")

    return supabase.createLink(url)


# TODO: update cached links
@links.patch("/links")
@cross_origin()
def update():
    payload = request.json
    link_id = payload["id"]
    total_clicks = payload["total_clicks"] + 1
    return supabase.clickLink(link_id, total_clicks)
