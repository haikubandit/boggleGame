from flask import Flask, request, render_template, redirect, flash, session, jsonify
from flask_debugtoolbar import DebugToolbarExtension
import pdb

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
    highscore = session.get("highscore", 0)
    play_count = session.get('play_count', 0)

    print(session["board"], flush=True)
    return render_template("gameboard.html", board=board,
                            highscore=highscore,
                            play_count=play_count)

@app.route("/guess")
def guess_page():
    """Refresh home page when checking for guess."""
    board = session["board"]
    guess = request.args["word"]
    response = {"result": boggle_game.check_valid_word(board,guess)}
    
    print(board, flush=True)
    print(guess, flush=True)
    print(response, flush=True)
    return jsonify(response)


@app.route("/gameover", methods=["POST"])
def gameover_page():
    """Gameover stats."""
    
    score = request.json["score"]
    highscore = session.get("highscore", 0)
    play_count = session.get('play_count', 0)

    session['play_count'] = play_count + 1
    session['highscore'] = max(score, highscore)

    print(score, flush=True)
    print(highscore, flush=True)

    return jsonify(newHighScore=score > highscore)