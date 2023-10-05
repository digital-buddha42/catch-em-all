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

# @app.route("/box")
# def box():
#     return render_template("poke_page.html")
@app.route("/box")
def box():
    # Create a database session
    session = Session(engine)

    # Query the database to get a list of Pokémon names
    pokemon_names = session.query(Pokemon.Pokemon).all()

    # Close the database session
    session.close()

    # Extract the names from the query results
    pokemon_names = [pokemon.Pokemon for pokemon in pokemon_names]

    return render_template("poke_page.html", pokemon_names=pokemon_names)

@app.route("/api/stats")
def apistats():


  

    session = Session(engine)

    results = session.query(Pokemon.Pokemon, Pokemon.Abilities).all()

    results = [list(r) for r in results]

    table_results = {
        "table": results

    }

    session.close()

    return jsonify(table_results)



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

  
    results4 = session.query(Pokemon.Pokemon).all()

    results5 = session.query(Pokemon.Sprites).all()

    results6 = session.query(Pokemon.Height, Pokemon.Weight, Pokemon.Abilities, Pokemon.Type_1, Pokemon.Type_2)

    results3 = session.query(Pokemon.HP, Pokemon.Attack, Pokemon.Defense, Pokemon.Special_Attack,
    Pokemon.Special_Defense, Pokemon.Speed).filter(Pokemon.Pokemon == pokemon).all()

    sprites = [list(r) for r in results5]
    info = [list(r) for r in results6]
    results = [list(r) for r in results3]
    labels = ["HP", "Attack", "Defense", "Special Attack", "Special Defense", "Speed"]

    individual_results = {
        "names": pokemon,
        "pictures": sprites,
        "summary_info": info,
        "labels": labels,
        "scores": results,
    }

    session.close()

    return jsonify({"scores": results})

# @app.route("/api/pokemons/<pokemon>")
# def pokemons(pokemon):
#     # results6 = session.query(Pokemon.Height, Pokemon.Weight, Pokemon.Abilities, Pokemon.Type_1, Pokemon.Type_2)

#     results3 = session.query(Pokemon.HP, Pokemon.Attack, Pokemon.Defense, Pokemon.Special_Attack,
#     Pokemon.Special_Defense, Pokemon.Speed).all()

#     # Return the Pokémon stats as JSON
#     return jsonify({"scores": results3})


if __name__ == "__main__":
    app.run()
