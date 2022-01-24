import React, { Component } from "react";
import Bouton from "../../../components/Bouton/Bouton";
import { withFormik } from "formik";
import * as Yup from "yup";

class FormulaireAjout extends Component {
  // state = {
  //   titreSaisi: "",
  //   auteurSaisi: "",
  //   nbPagesSaisi: "",
  // };

  // handleValidationForm = (event) => {
  //   // cette fonction évite le comportement standard du formulaire c'est-à-dire le rechargement de la page
  //   event.preventDefault();
  //   // console.log(this.state.titreSaisi + " " + this.state.auteurSaisi);
  //   this.props.validation(
  //     this.state.titreSaisi,
  //     this.state.auteurSaisi,
  //     this.state.nbPagesSaisi
  //   );
  //   this.setState({
  //     // je réinitialise le formulaire = tout remis à zéro
  //     titreSaisi: "",
  //     auteurSaisi: "",
  //     nbPagesSaisi: "",
  //   });
  // };

  render() {
    return (
      <>
        <h2
          className="text-center text-primary"
          style={{ fontFamily: "Sigmar One" }}
        >
          Affichage du formulaire d'ajout
        </h2>
        <form>
          <div className="mb-3">
            <label htmlFor="titre">Période</label>
            <input
              type="text"
              className="form-control"
              id="titre"
              name="titre"
              value={this.props.values.titre}
              onChange={this.props.handleChange}
              onBlur={this.props.handleBlur}
            />
            {this.props.touched.titre && this.props.errors.titre && (
              <span style={{ color: "red" }}>{this.props.errors.titre}</span>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="auteur">Date Saisie</label>
            <input
              type="text"
              className="form-control"
              id="auteur"
              name="auteur"
              value={this.props.values.auteur}
              onChange={this.props.handleChange}
              onBlur={this.props.handleBlur}
            />
            {this.props.touched.auteur && this.props.errors.auteur && (
              <span style={{ color: "red" }}>{this.props.errors.auteur}</span>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="nbPages">Localisation</label>
            <input
              type="number"
              className="form-control"
              id="nbPages"
              name="nbPages"
              value={this.props.values.nbPages}
              onChange={(event) =>
                this.props.setFieldValue("nbPages", +event.target.value)
              }
              onBlur={this.props.handleBlur}
            />
            {/* {this.props.touched.nbPages && this.props.errors.nbPages && (
              <span style={{ color: "red" }}>{this.props.errors.nbPages}</span>
            )} */}
          </div>
          <Bouton typeBtn="btn-primary" clic={this.props.handleSubmit}>
            Valider
          </Bouton>
        </form>
      </>
    );
  }
}

export default withFormik({
  mapPropsToValues: () => ({
    titre: "",
    auteur: "",
    nbPages: "",
  }),
  validationSchema: Yup.object().shape({
    titre: Yup.string()
      .min(3, "La période doit avoir plus de 3 caractères")
      .max(20, "La période doit avoir moins de 20 caractères")
      .required("La période est obligatoire"),
    auteur: Yup.string()
      .min(3, "La date doit avoir plus de 3 caractères")
      .required("Saisir une date est obligatoire"),
    // nbPages: Yup.number()
    //   .lessThan(1000, "Nombre de page < 1000")
    //   .moreThan(50, "Nombre de page > 50"),
  }),
  // validate: (values) => {
  //   const errors = {};
  //   if (values.titre.length < 3) {
  //     errors.titre = "Le titre doit avoir plus de 3 caractères";
  //   }
  //   if (values.titre.lenght > 15) {
  //     errors.titre = "Le titre doit avoir moins de 15 caractères";
  //   }
  //   if (!values.auteur) {
  //     errors.auteur = "Le champ Auteur est obligatoire";
  //   }
  //   return errors;
  // },
  handleSubmit: (values, { props }) => {
    props.validation(values.titre, values.auteur, values.nbPages);
  },
})(FormulaireAjout);
