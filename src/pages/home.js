import React from 'react'
import {MDBContainer, MDBInput, MDBRow, MDBCol, MDBBtn  } from 'mdbreact'
import ReactFileReader from 'react-file-reader'
import {CsvToHtmlTable} from 'react-csv-to-table'

function parseCSV(text) {
    // Obtenemos las lineas del texto
    let lines = text.replace(/\r/g, '').split('\n');
    return lines.map(line => {
      // Por cada linea obtenemos los valores
      let values = line.split(',');
      return values;
    });
  }
  
  function reverseMatrix(matrix){
    let output = [];
    // Por cada fila
    matrix.forEach((values, row) => {
      // Vemos los valores y su posicion
      values.forEach((value, col) => {
        // Si la posición aún no fue creada
        if (output[col] === undefined) output[col] = [];
        output[col][row] = value;
      });
    });
    return output;
  }
  
  function readFile(evt) {
    let file = evt.target.files[0];
    let reader = new FileReader();
    reader.onload = (e) => {
      // Cuando el archivo se terminó de cargar
      let lines = parseCSV(e.target.result);
      let output = reverseMatrix(lines);
      console.log(output);
    };
    // Leemos el contenido del archivo seleccionado
    reader.readAsBinaryString(file);
  }



class Home extends React.Component {

    constructor(props){
        super(props);
        this.state = {
          csvData: '',
          nums: [],
          
        };
      }
      


    handleFiles = files => {
        let reader = new FileReader();
        reader.onload = () => {
        // Use reader.result
        this.setState({
            csvData: reader.result,
            
          });
        }
        reader.readAsText(files[0]);
        
    }    

    handleData = () => {
        this.setState({
            nums: this.state.csvData.split(',')
        })
    }

    handleChange = e => {
        this.setState({
            nums: {
              ...this.state.nums,
              [e.target.name]: e.target.value,
            },
        })
        
    }

    

    render(){

        return(
            <React.Fragment>
                <MDBContainer fluid>
                    <MDBRow>

                    <MDBCol size="6" md="4">
                        <MDBRow center>
                            <h2 align="center">Asignacion de Equipos</h2>
                        </MDBRow>
                        <MDBRow center>
                            <ReactFileReader handleFiles={this.readFile} fileTypes={'.csv'}>
                                <MDBBtn  gradient="peach"><i className="far fa-folder-open fa-3x" /><h4>Abrir CSV</h4></MDBBtn>
                            </ReactFileReader>
                        </MDBRow>    
                        <MDBRow center>
                            <MDBInput name='NoEquipos'  label="No. de equipos" 
                                onChange={this.handleChange}
                            />
                        </MDBRow>
                            <MDBRow center>                            
                            <MDBBtn gradient="aqua"
                                onClick={this.handleData}
                            >Generar</MDBBtn>
                        </MDBRow>   
                    </MDBCol>
                    <MDBCol size="12" md="8">
                     
                        {this.state.csvData === '' ?
                            <div>
                            <h1>Carga el archivo</h1>
                            </div>
                            : 
                            <div> 
                             {this.state.nums === undefined ?
                                <div>
                                <h1>Lista vacia</h1>
                                </div>
                                : 
                                <ul>
                                    {this.state.nums.map(nums => <li>{nums}</li>)}
                                </ul>
                             }   
                             </div>                         
                            }
                    </MDBCol>
                    
                    </MDBRow>
                    <MDBRow>
                        <MDBCol size="6" md="4">
                        <CsvToHtmlTable
                                data={this.state.csvData}
                                csvDelimiter=","
                                tableClassName="table table-striped table-hover"
                            />
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
               
            </React.Fragment>
        );
    
    }
}

export default Home;