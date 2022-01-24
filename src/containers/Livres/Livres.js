import React, { Component } from "react";
import Livre from "./Livre/Livre";
import FormulaireAjout from "./FormulaireAjout/FormulaireAjout";
import FormulaireModification from "./FormulaireModification/FormulaireModification";
import Alert from "../../components/Alert/Alert";
import Bouton from "../../components/Bouton/Bouton";
import axios from "axios";

// base url of APInpm
const BASE_URL = "http://localhost:4000/";

class Livres extends Component {
  state = {
    livres: [
      {
        id: 1,
        titre: "Contemporaine",
        auteur: "10 / 09 / 2001",
        nbPages: "3216549873206",
      },
      {
        id: 3,
        titre: "Médiéval",
        auteur: "01 / 10 / 2005",
        nbPages: "1234567896846514",
      },
      {
        id: 5,
        titre: "Néolithique",
        auteur: "23 / 01 / 1996",
        nbPages: "212618467841751",
      },
      {
        id: 8,
        titre: "Proto-Histoire",
        auteur: "05 / 07 / 2019",
        nbPages: "25654197651841681",
      },
    ],
    lastIdLivre: 8,
    // : et pas = car c'est un objet
    idLivreAModifier: 0,
    alertMessage: null,
    selectedFile: null, // to store selected file
    handleResponse: null, // handle the API response
    imageUrl: null, // to store uploaded image path
  };

  handleSuppressionLivre = (id) => {
    const livreIndexTab = this.state.livres.findIndex((l) => {
      return l.id === id;
    });
    const newLivres = [...this.state.livres]; // Duplicata en faisant une copie du tableau de livres
    newLivres.splice(livreIndexTab, 1);

    this.setState({
      livres: newLivres,
      alertMessage: {
        message: "Suppression effectuée",
        type: "alert-danger",
      },
    }); // fusion du nouveau tableau de livres avec l'ancien pour mettre la modification à jour
  };

  handleAjoutLivre = (titre, auteur, nbPages) => {
    // console.log(titre);
    // console.log(auteur);
    // console.log(nbPages);
    const newLivre = {
      id: this.state.lastIdLivre + 1,
      titre: titre,
      auteur: auteur,
      nbPages: nbPages,
    };

    const newListeLivres = [...this.state.livres];
    // après avoir fait une réel copie de liste de livres, je peux rajouter mon nouveau livre à l'intérieur de la nouvelle liste
    newListeLivres.push(newLivre);

    this.setState((oldState) => {
      return {
        livres: newListeLivres,
        lastIdLivre: oldState.lastIdLivre + 1,
        alertMessage: {
          message: "Ajout effectuée",
          type: "alert-success",
        },
      };
    });
    this.props.fermerAjoutLivre();
  };

  handleModificationLivre = (id, titre, auteur, nbPages) => {
    const caseLivre = this.state.livres.findIndex((l) => {
      return l.id === id;
    });

    const newLivre = { id, titre, auteur, nbPages };
    // ensuite je fais une copie avant de faire la modification dans mon state
    const newListe = [...this.state.livres];
    // désormais j'ai la nouvelle liste de livres, je peux faire la modification à la case donnée =[caseLivre] pour y mettre le nouveau livre
    newListe[caseLivre] = newLivre;
    // maintenant que mon tableau de livre, contient la modification, je peux modifier le state

    this.setState({
      livres: newListe,
      idLivreAModifier: 0,
      alertMessage: {
        message: "Modification effectuée",
        type: "alert-warning",
      },
    });
  };

  componentDidMount = () => {
    this.handleSelectionParPeriode("all");
  };

  handleSelectionParPeriode = (periode) => {
    // let param = "";
    // if (periode === "all") param = periode;
    // else param = `periode/${periode}`;

    this.setState({ loading: true });

    // choper la bdd ici
  };

  // handle change event of input file
  onChangeFile = (event) => {
    this.setState({ selectedFile: event.target.files[0] });
  };

  // handle click event of the upload button
  handleUpload = () => {
    const { selectedFile } = this.state;
    if (!selectedFile) {
      this.setState({
        handleResponse: {
          isSuccess: false,
          message: "Please select image to upload.",
        },
      });
      return false;
    }
    const formData = new FormData();
    formData.append("dataFile", selectedFile, selectedFile.name);
    axios
      .post(BASE_URL + "uploadfile", formData)
      .then((response) => {
        this.setState({
          handleResponse: {
            isSuccess: response.status === 200,
            message: response.data.message,
          },
          imageUrl: BASE_URL + response.data.file.path,
        });
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  render() {
    const { handleResponse, imageUrl } = this.state;
    return (
      <>
        <div>
          <Bouton
            typeBtn="btn-primary"
            clic={() => this.handleSelectionParPeriode("all")}
          >
            Tous
          </Bouton>
          <Bouton
            typeBtn="btn-secondary"
            clic={() => this.handleSelectionParPeriode("moderne")}
          >
            Moderne
          </Bouton>
          <Bouton
            typeBtn="btn-success"
            clic={() => this.handleSelectionParPeriode("contemporaine")}
          >
            Contemporaine
          </Bouton>
          <Bouton
            typeBtn="btn-danger"
            clic={() => this.handleSelectionParPeriode("medieval")}
          >
            Médiéval
          </Bouton>
          <Bouton
            typeBtn="btn-warning"
            clic={() => this.handleSelectionParPeriode("antiquités")}
          >
            Antiquité
          </Bouton>
          <Bouton
            typeBtn="btn-info"
            clic={() => this.handleSelectionParPeriode("all")}
          >
            Néolithique
          </Bouton>
          <Bouton
            typeBtn="btn-light"
            clic={() => this.handleSelectionParPeriode("all")}
          >
            Paléolithique
          </Bouton>
          <Bouton
            typeBtn="btn-dark"
            clic={() => this.handleSelectionParPeriode("all")}
          >
            Proto-Histoire
          </Bouton>
        </div>

        {this.state.alertMessage && (
          <Alert typeAlert={this.state.alertMessage.type}>
            {this.state.alertMessage.message}
          </Alert>
        )}
        <table className="table text-center">
          <thead>
            <tr className="table-dark">
              <th>Période</th>
              <th>Date Saisie</th>
              <th>Localisation</th>
              <th colSpan="2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* Ci-dessous, je liste l'ensemble des livres en utilisant le composant de Livre */}

            {this.state.livres.map((livre) => {
              if (livre.id !== this.state.idLivreAModifier) {
                return (
                  <tr key={livre.id}>
                    <Livre
                      titre={livre.titre}
                      auteur={livre.auteur}
                      nbPages={livre.nbPages}
                      suppression={() => this.handleSuppressionLivre(livre.id)}
                      modification={() =>
                        this.setState({ idLivreAModifier: livre.id })
                      }
                    />
                  </tr>
                );
              } else {
                return (
                  <tr key={livre.id}>
                    <FormulaireModification
                      id={livre.id}
                      titre={livre.titre}
                      auteur={livre.auteur}
                      nbPages={livre.nbPages}
                      validationModification={this.handleModificationLivre}
                    />
                  </tr>
                );
              }
            })}
          </tbody>
        </table>

        {this.props.ajoutLivre && (
          <FormulaireAjout validation={this.handleAjoutLivre} />
        )}
        <div className="App text-center">
          <h4>Envoyez nous vos photos : </h4>

          <p className="title">Sélectionnez vos images:</p>
          <div style={{ marginBottom: 10 }}>
            <input type="file" onChange={this.onChangeFile} />
          </div>
          <input type="button" value="Upload" onClick={this.handleUpload} />
          {handleResponse && (
            <p className={handleResponse.isSuccess ? "success" : "error"}>
              {handleResponse.message}
            </p>
          )}

          <p className="title" style={{ marginTop: 30 }}>
            Vos Images Télécharger :
          </p>
          {imageUrl && (
            <img
              src={imageUrl}
              alt="Fichiers Télécharger"
              height="100"
              width="100"
            />
          )}
        </div>
      </>
    );
  }
}

export default Livres;
