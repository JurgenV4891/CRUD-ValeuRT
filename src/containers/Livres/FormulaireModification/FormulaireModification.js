import React, { Component } from "react";
import Bouton from "../../../components/Bouton/Bouton";

class ModificationLivre extends Component {
  state = {
    titreSaisi: this.props.titre,
    auteurSaisi: this.props.auteur,
    nbPagesSaisi: this.props.nbPages,
  };
  //   ci-dessus, je vais pouvoir charger au démarrage l'ensemble de mes valeurs dans mon state

  handleValidation = () => {
    // console.log("validation");
    // ci-dessous, pas de state pour id sinon on modifie celui-ci donc props
    this.props.validationModification(
      this.props.id,
      this.state.titreSaisi,
      this.state.auteurSaisi,
      this.state.nbPagesSaisi
    );
  };

  render() {
    return (
      <>
        <td>
          {/* et là , je lie mes valeurs de state dans ma value, ce qui fait que je peux mettre onChange pour modifier la valeur dans le state */}
          <input
            type="text"
            className="form-control"
            value={this.state.titreSaisi}
            onChange={(event) =>
              this.setState({ titreSaisi: event.target.value })
            }
          />
        </td>
        <td>
          <input
            type="text"
            className="form-control"
            value={this.state.auteurSaisi}
            onChange={(event) =>
              this.setState({ auteurSaisi: event.target.value })
            }
          />
        </td>
        <td>
          <input
            type="text"
            className="form-control"
            value={this.state.nbPagesSaisi}
            onChange={(event) =>
              this.setState({ nbPagesSaisi: event.target.value })
            }
          />
        </td>
        <td>
          <Bouton typeBtn="btn-primary" clic={this.handleValidation}>
            Valider
          </Bouton>
        </td>
      </>
    );
  }
}

export default ModificationLivre;
