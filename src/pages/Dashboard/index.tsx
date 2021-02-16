import React,{useState, useCallback, useEffect} from 'react'
import {Fab} from '@material-ui/core'
import {format,parseISO} from 'date-fns'
import {Container, NoteContainer, TimeDiv,CloseIcon, LogOutButton} from "./styles"
import { MdAdd, MdClose,MdPowerSettingsNew} from 'react-icons/md'
import Menu from '../../components/Menu'
import api from '../../service/api'
import {useAuth} from '../../hooks/authContext'

interface CategoryInterface{
  id: string;
  name: string;
  created_at: string;
}

interface NotesInterface {
  id: string;
  user_id:string;
  title: string;
  body: string;
  category_id: string;
  date_start?: string;
  date_end?: string;
  category: CategoryInterface;
 }

const Dashboard: React.FC = () => {
  //estado para mostrar/esconder o form de criação de lembrete
  const [isVisible,setIsVisible] = useState(false)
  const [tasks, setTasks] = useState<NotesInterface[]>([])
  const {user,signOut} = useAuth();
  useEffect(()=>{
     api.get('/tasks').then(response => {
       setTasks(response.data)
     })

  },[tasks])

  //função que deleta um lembrete

  const handleDelete = useCallback(async (id)=>{
    await api.delete(`/tasks/${id}`)
    const filteredTasks = tasks.filter(task => task.id !== id)

    setTasks(filteredTasks)
  },[tasks])

  // retorno dos lembretes com um map que renderiza todos os lembretes, com condicional
  // para checar a presença da data, se tiver data de inicio e término, renderiza,
  // se não, não renderiza
  return (
    <>
    <Menu visible={isVisible}/>
   <Container>
     {tasks.map((task) => {
       let dateStart;
       let dateEnd;
       if(task.date_start && task.date_end){
         dateStart = format(parseISO(task.date_start),'d/MM/yyy HH:mm')
         dateEnd = format(parseISO(task.date_start),'d/MM/yyy HH:mm')
       }
       return (
         <>
         <NoteContainer key={task.id} >
         <div>
          <strong>{task.title}</strong>
         <span>{task.category.name}</span>
         </div>
         <p>{task.body}</p>
         <TimeDiv>
           {(task.date_start && task.date_end) &&
           <>
           <p>{dateStart} </p>
           -
           <p> {dateEnd}</p>
           </>
           }

         </TimeDiv>
         <CloseIcon>
           <MdClose style={{color: '#5199EE'}} onClick={()=> handleDelete(task.id)}/>
         </CloseIcon>
       </NoteContainer>


         </>
       )
     })}


   </Container>

    {isVisible ?
    <Fab color="secondary" aria-label="add" onClick={()=>setIsVisible(false)} style={{position: 'fixed', bottom: 20, right: 20}} >
    <MdClose size={20}/>
   </Fab>:<Fab color="primary" aria-label="add" onClick={()=>setIsVisible(true)} style={{position: 'fixed', bottom: 20, right: 20}} >
   <MdAdd size={20}/>
   </Fab>
    }

    <LogOutButton name="logOut" onClick={()=>signOut()}>
      <MdPowerSettingsNew size={40}/>
    </LogOutButton>
   </>
  )
}

export default Dashboard;
