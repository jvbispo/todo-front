import React,{useState, useCallback, useRef} from 'react'
import {TextField, Button} from '@material-ui/core'
import {format,parseISO} from 'date-fns'
import {Container,ButtonContainer} from './styles'
import api from '../../service/api'

interface ContainerProps {
  visible: boolean;
}

/**
 * Menu pop-up de criação de lembretes
 * recebe propriedade visible para alternar entre display none e flex
 */

const Menu: React.FC<ContainerProps> = ({visible}) => {
  const formRef = useRef();
  const [noteData,setNoteData]= useState('');
  const [titleData,setTitleData] = useState('');
  const [categoryData,setCategoryData] = useState('');
  const [startDateData,setStartDateData] = useState('');
  const [endDateData,setEndDateData] = useState('');
  const initialDate= Date.now()
  const formatedInitialDate = format(initialDate,"yyyy-MM-dd'T'HH':'mm")
  const handleSubmit = useCallback(async (event)=>{

    event.preventDefault();
    console.log(typeof(startDateData))
    let parsedStartDate;
    let parsedEndDate;

      parsedStartDate= parseISO(startDateData);
      parsedEndDate = parseISO(endDateData)


    console.log(startDateData)
    const response = await api.post('/tasks', {
      category: categoryData,
      title: titleData,
      body: noteData,
      date_start: parsedStartDate,
      date_end: parsedEndDate
    })
    

    console.log(response.data)
  },[titleData,noteData,categoryData,startDateData,endDateData])



  return(
    <Container visible={visible}>
      <form noValidate onSubmit={(event)=> handleSubmit(event)} >
        <span>Título</span>
        <TextField id="standard-basic" color="primary"  onChange={(event)=>setTitleData(event.target.value)}/>
        <span>Lembrete</span>
        <TextField id="standard-basic" onChange={(event)=>setNoteData(event.target.value)}/>
        <span>Categoria</span>
        <TextField id="standard-basic" style={{marginBottom: 20}} onChange={(event)=>setCategoryData(event.target.value)} />

        <TextField
        id="datetime-local"
        label="início"
        type="datetime-local"
        defaultValue={formatedInitialDate}
        InputLabelProps={{
          shrink: true,
        }}
        style={{marginBottom: 20}}
        onChange={(event)=>setStartDateData(event.target.value)}
        />

      <TextField
        id="datetime-local1"
        label="Término"
        type="datetime-local"
        defaultValue={formatedInitialDate}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={(event)=>setEndDateData(event.target.value)}
        />

        <ButtonContainer>
           <Button variant="contained" color="primary" type='submit'>
          Criar
          </Button>
        </ButtonContainer>

      </form>
    </Container>
  )
}

export default Menu;
