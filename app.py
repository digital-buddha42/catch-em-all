# import necessary libraries
# from models import create_classes
import os
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func, or_
from sqlalchemy.ext.automap import automap_base

import pickle

from flask import (
    Flask,
    render_template,
    jsonify,
    request,
    redirect)

engine = create_engine("sqlite:///data/pokemon.sqlite")

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

print(Base.classes.keys())

Pokemon = Base.classes.pokemon_data

#################################################
# Flask Setup
#################################################
app = Flask(__name__)


# ---------------------------------------------------------
# Web site
@app.route("/")
def home():
    return render_template("index.html")

@app.route("/stats")
def stats():
    return render_template("stats.html")

@app.route("/box")
def box():
    return render_template("poke_page.html")


@app.route("/api/stats")
def apistats():


    # return render_template("stats.html")

    session = Session(engine)

    results = session.query(Pokemon.Pokemon, Pokemon.Abilities).all()

    results = [list(r) for r in results]

    table_results = {
        "table": results

    }

    session.close()

    return jsonify(table_results)

# @app.route("/api/box")
# def apibox():

#     session = Session(engine)

#     results2 = session.query(Pokemon.HP, Pokemon.Attack, Pokemon.Defense, Pokemon.Special_Attack, Pokemon.Special_Defense, 
#     Pokemon.Speed).all()

#     #results = [list(r) for r in results]

#     # hp = [result[0] for result in results]
#     # attack = [result[1] for result in results]
#     # defense = [result[2] for result in results]
#     # special_attack = [result[3] for result in results]
#     # special_defense = [result[4] for result in results]
#     # speed = [result[5] for result in results]

#     boxes = [results2[1], results2[2], results2[3], results2[4], results2[5], results2[6]]
#     labels = ["HP", "Attack", "Defense", "Special Attack", "Special Defense", "Speed"]

#     box_results = {
#         "labels": labels,
#         "scores": boxes,
#     }

#     session.close()

#     return jsonify(box_results)

@app.route("/api/box/<type>")
def apibox(type):

    print(type)

    if type == "normal":
        name = "normal"
    elif type == "fire":
        name = "fire"
    else:
        name = "water"

    session = Session(engine)

    hp_results = session.query(func.avg(Pokemon.HP)).filter(Pokemon.Type_1 == name).all()
    attack_results = session.query(func.avg(Pokemon.Attack)).filter(Pokemon.Type_1 == name).all()
    defense_results = session.query(func.avg(Pokemon.Defense)).filter(Pokemon.Type_1 == name).all()
    special_attack_results = session.query(func.avg(Pokemon.Special_Attack)).filter(Pokemon.Type_1 == name).all()
    special_defense_results = session.query(func.avg(Pokemon.Special_Defense)).filter(Pokemon.Type_1 == name).all()
    speed_results = session.query(func.avg(Pokemon.Speed)).filter(Pokemon.Type_1 == name).all()

    results = [hp_results[0][0], attack_results[0][0], defense_results[0][0], special_attack_results[0][0], 
    special_defense_results[0][0], speed_results[0][0]]
    labels = ["HP", "Attack", "Defense", "Special Attack", "Special Defense", "Speed"]

    box_results = {
        "labels": labels,
        "scores": results,
    }

    session.close()

    return jsonify(box_results)

@app.route("/api/pokemons/<pokemon>")
def pokemons(pokemon):

    session = Session(engine)

    # hp_results2 = session.query(Pokemon.Pokemon, Pokemon.HP).all()
    # attack_results2 = session.query(Pokemon.Pokemon, Pokemon.Attack).all()
    # defense_results2 = session.query(Pokemon.Pokemon, Pokemon.Defense).all()
    # special_attack_results2 = session.query(Pokemon.Pokemon, Pokemon.Special_Attack).all()
    # special_defense_results2 = session.query(Pokemon.Pokemon, Pokemon.Special_Defense).all()
    # speed_results2 = session.query(Pokemon.Pokemon, Pokemon.Speed).all()

    results4 = session.query(Pokemon.Pokemon)

    results5 = session.query(Pokemon.Sprites)

    results3 = session.query(Pokemon.HP, Pokemon.Attack, Pokemon.Defense, Pokemon.Special_Attack,
    Pokemon.Special_Defense, Pokemon.Speed).all()

    # results = [hp_results2[0][1], attack_results2[0][1], defense_results2[0][1], special_attack_results2[0][1], 
    # special_defense_results2[0][1], speed_results2[0][1]]
    identifiers = [list(r) for r in results4]
    sprites = [list(r) for r in results5]
    results = [list(r) for r in results3]
    labels = ["HP", "Attack", "Defense", "Special Attack", "Special Defense", "Speed"]

    individual_results = {
        "names": identifiers,
        "pictures": sprites,
        "labels": labels,
        "scores": results,
    }

    session.close()

    return jsonify(individual_results)

# @app.route("/api/movies")
# def movie_grid():

#     session = Session(engine)

#     results = session.query(Movies.title, Movies.director, Movies.year, Movies.rating, Movies.imdb_votes, Movies.imdb_score).all()

#     results = [list(r) for r in results]

#     table_results = {
#         "table": results
#     }

#     session.close()

#     return jsonify(table_results)
# @app.route("/pokemon")
# def pokemon():

#     return render_template("pokemon.html")

# @app.route("/analysis")
# def actors():
#     return render_template("analysis.html")

# # Datatable
# @app.route("/api/pokemon")
# def movie_grid():

    # session = Session(engine)

    # results = session.query(pokemon_data.Pokemon, pokemon_data.Abilities).all()

    # results = [list(r) for r in results]

    # table_results = {
    #     "table": results
    # }

    # session.close()

    # return jsonify(table_results)

# -------------------------------------------------------------------------------

if __name__ == "__main__":
    app.run()