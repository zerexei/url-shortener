from flask import Flask

from routes.links import links
from routes.auth import auth

app = Flask(__name__)


@app.get("/")
def home():
    return "Hello, World!"


app.register_blueprint(auth)
app.register_blueprint(links)


if __name__ == "__main__":
    app.run(debug=True)
