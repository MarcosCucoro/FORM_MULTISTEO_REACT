/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
// Components
import UserForm from "./components/UserForm";
import ReviewForm from "./components/ReviewForm";
import Thanks from "./components/Thanks";
import Steps from "./components/Steps";

// import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { MdOutlineNavigateNext, MdOutlineNavigateBefore } from "react-icons/md";
import { FiSend } from "react-icons/fi";

// Hooks
import { useForm } from "./hooks/useForm";
import React, { useState } from "react";

// CSS
import './App.css'

const formTemplate = {
  name: "",
  email: "",
  review: "",
  comment: "",
}


function App() {

  const [data, setData] = useState(formTemplate)
  const [infoClass, setInfoClass] = useState('')

  const updateFieldHandler = (key, value) => {
    setData((prev) => {
      return { ...prev, [key]: value }
    })
  }

  const formComponents = [
    <UserForm data={data} updateFieldHandler={updateFieldHandler}/>,
    <ReviewForm data={data} updateFieldHandler={updateFieldHandler}/>,
    <Thanks data={data}/>,
  ]

  const { currentStep, currentComponent, changeStep, isLastStep, isFirstStep } = useForm(formComponents)

  const finishAvaliation = () => {
    setData("")
    alert("Avaliação enviada!")
  }

  return (
    <div className="app">
      <div className="header">
        <h2>Deixe sua avaliação</h2>
        <p>Ficamos felizes com a sua compra, utilize o formulário abaixo para avaliar o produto</p>
      </div>
      <div className="form-container">
        <Steps currentStep = {currentStep} />
        <form onSubmit={(e) => changeStep(currentStep + 1, e)}>
          <div className="inputs-container">
            {currentComponent}
          </div>
          <div className="actions">
            {!isFirstStep && (
              <button type='button' onClick={() => changeStep(currentStep - 1)}>
                <MdOutlineNavigateBefore />
                <span>Voltar</span>
              </button>
            )}
            {!isLastStep ? (
              <button type='submit'>
              <span>Avançar</span>
              <MdOutlineNavigateNext />
            </button>
            ) : (
              <button type="button" onClick={finishAvaliation}>
                <span>Enviar</span>
                <FiSend />
              </button>
            )}
          </div>
        </form>
      </div>
    </ div>
  )
}

export default App
