import axios from "axios";
import {
    Container,
    FormWrap,
    FormContent,
    Form,
    FormH1,
    FormLabel,
    FormInput,
    FormButton,
    FormSelect,
    FormInputImg

} from './RegisterMeasurementElements'
import React, { Component } from 'react'
import { withAuth0 } from "@auth0/auth0-react"

class RegisterMearsument extends Component {
    
  state  = {
    users:[],
    categoria:'',
    lugar:'',
    valor_co2:'',
    comentario:'',
    file:null
  }

  onSubmit = async (e) => {
    e.preventDefault();
    const { user } = this.props.auth0
    if(user){
      const newMeasurement = {
        categoria: this.state.categoria,
        lugar: this.state.lugar,
        valor_co2: this.state.valor_co2,
        comentario: this.state.comentario,
        file: this.state.file,
        nombre: user.nickname,
        email: user.email
        
      }
      try{
        const formdata = new FormData();
        formdata.append('image', newMeasurement.file);
        formdata.append('categoria',newMeasurement.categoria);
        formdata.append('lugar',newMeasurement.lugar);
        formdata.append('valor_co2',newMeasurement.valor_co2);
        formdata.append('comentario',newMeasurement.comentario);
        formdata.append('nombre',newMeasurement.nombre);
        formdata.append('email',newMeasurement.email);
        const result = await axios.post('http://localhost:5000/api/measurement', formdata, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        })
        console.log("Result", result);
      }catch(error){
        console.log(error)
      }
      document.getElementById('fileinput').value = null;
      document.getElementById('measurementload').reset();
      window.location.href = '/community';
      this.setState(null);
      
    }else{
      alert("Debes iniciar sesión")
    }
    
  }

  onInputChange = (e) => {
    this.setState({
      [e.target.name] : e.target.value
    })
  }

  selectedHandler = (e) => {
    this.setState({file: e.target.files[0]})
  }

  reload = () =>{
    window.location.replace('');
  }

    render() {
        return (
            <>
            <Container>
                <FormWrap>
                    <FormContent>
                        <Form onSubmit={this.onSubmit} id = "measurementload">
                            <FormH1>Registra una Medicion</FormH1>
                            <FormLabel htmlFor='for'>Categoría</FormLabel>
                            <FormSelect id="categoria" name="categoria"  onChange={this.onInputChange}>
                                <option selected>Elige una categoría</option>
                                <option value="Transporte">Transporte</option>
                                <option value="Entretenimiento">Entretenimiento</option>
                                <option value="Supermercado">Supermecados</option>
                                <option value="Restaurantes">Restaurantes</option>
                                <option value="Institución Educativa">Institución Educativa</option>
                                <option value="Centros Comerciales">Centros Comerciales</option>
                                <option value="Otros">Otros</option>
                            </FormSelect>
                            <FormLabel htmlFor='for'>Lugar de medición</FormLabel>
                            <FormInput type='text' placeholder = "Ejemplo: Riocentro norte" required name="lugar" onChange={this.onInputChange}/>
                            <FormLabel htmlFor='for'>Valor de CO2 (ppm)</FormLabel>
                            <FormInput type='number' min="0" required name="valor_co2" onChange={this.onInputChange}/>
                            <FormLabel htmlFor='for'>Comentario (Opcional)</FormLabel>
                            <FormInput type='text' name = "comentario" placeholder = "comentario" required onChange={this.onInputChange} />
                            <FormLabel htmlFor='for'>Foto de la medición</FormLabel>
                            <FormInputImg type='file' required  id="fileinput" onChange = {this.selectedHandler}/>
                            <FormButton type ='submit'>Registrar</FormButton>
                        </Form>                 
                    </FormContent>
                </FormWrap>
            </Container>
        </>
            
        )
    }
}


/*const RegisterMearsument = () => {
    return (
        <>
            <Container>
                <FormWrap>
                    <FormContent>
                        <Form action ="#">
                            <FormH1>Registra una Medicion</FormH1>
                            <FormLabel htmlFor='for'>Categoría</FormLabel>
                            <FormSelect>
                                <option selected>Elige una categoría</option>
                                <option value="Transporte">Transporte</option>
                                <option value="Entretenimiento">Entretenimiento</option>
                                <option value="Supermercado">Supermecados</option>
                                <option value="Restaurantes">Restaurantes</option>
                                <option value="Institución Educativa">Institución Educativa</option>
                                <option value="Centros Comerciales">Centros Comerciales</option>
                                <option value="Otros">Otros</option>
                            </FormSelect>
                            <FormLabel htmlFor='for'>Lugar de medición</FormLabel>
                            <FormInput type='text' required/>
                            <FormLabel htmlFor='for'>Valor de CO2 (ppm)</FormLabel>
                            <FormInput type='number' min="0" required/>
                            <FormLabel htmlFor='for'>Comentario (Opcional)</FormLabel>
                            <FormInput type='text' />
                            <FormLabel htmlFor='for'>Foto de la medición</FormLabel>
                            <FormInputImg type='file' required/>
                            <FormButton type ='submit'>Registrar</FormButton>
                        </Form>                 
                    </FormContent>
                </FormWrap>
            </Container>
        </>
    )
}*/

export default withAuth0(RegisterMearsument)
