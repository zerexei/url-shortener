from flask import Blueprint, jsonify
from supabase_wrapper import Supabase

auth = Blueprint("auth", __name__)

supabase = Supabase()


@auth.get("/register")
def register():
    response = supabase.getConnection().auth.sign_up(
        {
            "email": "zeretei64@gmail.com",
            "password": "password",
        }
    )

    return list(response)


@auth.get("/login")
def login():
    response = supabase.getConnection().auth.sign_in_with_password(
        {
            "email": "zeretei64@gmail.com",
            "password": "password",
        }
    )

    return jsonify(response.model_dump())


@auth.get("/verify-email")
def verify_email():
    response = supabase.getConnection().auth.verify_otp(
        {
            "email": "zeretei64@gmail.com",
            "token_hash": "1a09a426357e99330400cb733814f151f5a045fd39e7771350becf86",
            "type": "email",
        }
    )

    return list(response)


@auth.get("/user")
def user():
    response = supabase.getConnection().auth.get_user("eyJhbGciOiJIUzI1NiIsImtpZCI6ImxrNi8xSXNzZHptUFkxRDEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3lmc2luZGVjaW9ub3ZoZnFxdHlwLnN1cGFiYXNlLmNvL2F1dGgvdjEiLCJzdWIiOiI4MmUxN2JhOS1jMmI5LTQ3NGQtODFkOS1mOWFjNmNjMTE5NGYiLCJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzQxNDkyNzY4LCJpYXQiOjE3NDE0ODkxNjgsImVtYWlsIjoiemVyZXRlaTY0QGdtYWlsLmNvbSIsInBob25lIjoiIiwiYXBwX21ldGFkYXRhIjp7InByb3ZpZGVyIjoiZW1haWwiLCJwcm92aWRlcnMiOlsiZW1haWwiXX0sInVzZXJfbWV0YWRhdGEiOnsiZW1haWwiOiJ6ZXJldGVpNjRAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBob25lX3ZlcmlmaWVkIjpmYWxzZSwic3ViIjoiODJlMTdiYTktYzJiOS00NzRkLTgxZDktZjlhYzZjYzExOTRmIn0sInJvbGUiOiJhdXRoZW50aWNhdGVkIiwiYWFsIjoiYWFsMSIsImFtciI6W3sibWV0aG9kIjoicGFzc3dvcmQiLCJ0aW1lc3RhbXAiOjE3NDE0ODkxNjh9XSwic2Vzc2lvbl9pZCI6ImI1M2QxMDQ2LTg3YzItNGZiMC04NTY2LWM5Nzg0MTE0OWQwYiIsImlzX2Fub255bW91cyI6ZmFsc2V9.bKHQzQvtcb1HuMlKIiXwh3JqT2wbhlFwjKINcHFyLfs")

    if response is None:
        return "Unauthenticated"

    return jsonify(response.model_dump())
