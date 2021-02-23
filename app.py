from flask import Flask, request, render_template, redirect, flash, session
from flask_debugtoolbar import DebugToolbarExtension

from boggle import Boggle

boggle_game = Boggle()


app = Flask(__name__)
app.config['SECRET_KEY'] = "super-secret-key"
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
debug = DebugToolbarExtension(app)


@app.route("/")
def home_page():
    """Show home page with boggle game board."""

    board = boggle_game.make_board()
    session["board"] = board
    print(session["board"], flush=True)
    return render_template("gameboard.html", board=board)

# @app.route("/guess", methods=["POST"])
# def guess_page():
#     """Refresh home page when checking for guess."""
#     board = session["board"]
#     guess = request.form["guess"]
    
#     print(session["board"], flush=True)
#     return render_template("gameboard.html", board=board)