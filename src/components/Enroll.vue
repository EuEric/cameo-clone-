<template>
  <div>
    <div class="container">
      <div class="d-flex flex-column align-items-center">
        <h3 class="text-light">Aplică acum!</h3>
        <p class="text-light">
          Dacă aveți fani și doriți să vă alăturați Clipper ca talent, vă puteți
          înscrie aici și vom fi în legătură.
        </p>
      </div>
      <form class="needs-validation" novalidate>
        <div class="form-group text-light">
          <label for="nume">Nume</label>
          <input
            type="text"
            class="form-control"
            id="nume"
            aria-describedby="emailHelp"
            required
            v-model="creator.name"
            placeholder="Nume"
          />
          <div class="invalid-feedback">Adaugă un nume.</div>
        </div>
        <div class="form-group text-light">
          <label for="email">Adresa de email</label>
          <input
            type="email"
            class="form-control"
            id="email"
            aria-describedby="emailHelp"
            required
            v-model="creator.email"
            placeholder="email@emial.com"
          />
          <div class="invalid-feedback text-light">
            Adauga o adresa de email.
          </div>
        </div>
        <div class="form-group text-light">
          <label for="telefon">Numărul de telefon</label>
          <input
            type="number"
            class="form-control"
            id="numar"
            aria-describedby="emailHelp"
            required
            placeholder="0722 222 222"
            v-model="creator.phone"
            maxlength="10"
          />
          <div class="invalid-feedback text-light">
            Adaugă un număr de telefon.
          </div>
        </div>
        <div class="form-group text-light">
          <label for="exampleFormControlSelect1">Unde te putem gasi</label>
          <select
            class="form-control"
            id="exampleFormControlSelect1"
            v-model="creator.social"
          >
            <option>Facebook</option>
            <option>Instagram</option>
            <option>Youtube</option>
            <option>TikTok</option>
            <option>Twiter</option>
          </select>
        </div>
        <div class="form-group">
          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              value=""
              id="invalidCheck"
              required
            />
            <label class="form-check-label text-light" for="invalidCheck">
              Acceptă termenii și condițiile
            </label>
            <div class="invalid-feedback text-light">
              Trebuie să accepți înainte să te înscri!
            </div>
          </div>
        </div>
        <button
          @click.prevent="addCreator"
          class="btn btn-primary"
          type="submit"
        >
          Trimite
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  data() {
    return {
      creator: {
        name: "",
        email: "",
        phone: "",
        social: "",
      },
    };
  },
  methods: {
    enrollButton() {
      console.log("my name jeff");
    },
    formValidation() {
      window.addEventListener(
        "load",
        function () {
          var forms = document.getElementsByClassName("needs-validation");
          var validation = Array.prototype.filter.call(forms, function (form) {
            form.addEventListener(
              "submit",
              function (event) {
                if (form.checkValidity() === false) {
                  event.preventDefault();
                  event.stopPropagation();
                }
                form.classList.add("was-validated");
              },
              false
            );
          });
        },
        false
      );
    },
    addCreator() {
      console.log("something");
      firebase
        .firestore()
        .collection("creators")
        .add({
          name: this.creator.name,

          email: this.creator.email,
          phone: this.creator.phone,
          social: this.creator.social,
        })
        .then((docref) => {
          console.log("document created with id: " + docref.id);
        })
        .catch(function (error) {
          console.error("Error adding document: ", error);
        });
    },
  },
  created() {
    this.formValidation();
  },
};
</script>

<style>
</style>