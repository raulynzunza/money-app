import { useEffect, useState } from 'react'
import './menu.css'
import { useNavigate } from 'react-router-dom'
import 'animate.css';
import axios from 'axios';
import Modal from '../../components/Modal'
import History from '../../components/History'
import Form from '../../components/Form'

const index = () => {

  const [addMoneyFlag, setAddMoneyFlag] = useState(false)
  const [subtractMoneyFlag, setSubtractMoneyFlag] = useState(false)
  const [money, setMoney] = useState({
    addMoney: '',
    addNote: ''
  })
  const [onDisplayMoney, setOnDisplayMoney] = useState()
  const [id, setId] = useState()
  const [isLoading, setLoading] = useState(false)
  const [modalFlag, setModalFlag] = useState(false)
  const [history, setHistory] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    if (!localStorage.getItem('userId')) {
      navigate('/')
    }
    chargeMoney()

  }, [])

  const chargeMoney = async () => {
    setLoading(true);
    const money = await axios({
      url: import.meta.env.VITE_REACT_APP_API_URL + '/accounts/' + localStorage.getItem('userId'),
      method: 'get',
    })

    localStorage.setItem('account_id', money.data[0].id)

    const res = await money
    setLoading(false);
    setId(res.data[0].id)
    setOnDisplayMoney(res.data[0].balance)
    chargeHistory()
  }

  const chargeHistory = async () => {
    const history = await axios.get(import.meta.env.VITE_REACT_APP_API_URL + '/history/' + localStorage.getItem('account_id'))
    const resp = await history
    resp.data.data.forEach((item: any) => {
      return item.createdAt = new Date(item.createdAt).toLocaleDateString("es-ES")
    })

    setHistory(resp.data.data.reverse())

  }

  const onInputChange = ({ target }: any) => {
    const { name, value } = target
    setMoney({
      ...money,
      [name]: value
    })
  }

  const addMoneySection = () => {
    addMoneyFlag ? setAddMoneyFlag(false) : setAddMoneyFlag(true)
  }

  const subtractMoneySection = () => {
    subtractMoneyFlag ? setSubtractMoneyFlag(false) : setSubtractMoneyFlag(true)
  }

  const addMoney = async (event: any, operation: any) => {
    event.preventDefault();

    if (operation === 'add') {
      await axios.post(import.meta.env.VITE_REACT_APP_API_URL + '/accounts/add/' + id, {
        balance: money.addMoney
      })
      await axios.post(import.meta.env.VITE_REACT_APP_API_URL + '/history', {
        "amount": money.addMoney,
        "description": money.addNote,
        "account_id": localStorage.getItem('account_id'),
        "action": "add"
      })
      await chargeHistory()
    } else {
      await axios.post(import.meta.env.VITE_REACT_APP_API_URL + '/accounts/substract/' + id, {
        balance: money.addMoney
      })
      await axios.post(import.meta.env.VITE_REACT_APP_API_URL + '/history', {
        "amount": money.addMoney,
        "description": money.addNote,
        "account_id": localStorage.getItem('account_id'),
        "action": "subtract"
      })
      await chargeHistory()
    }
    chargeMoney()
  }

  const logout = () => {
    localStorage.clear()
    navigate('/')
  }

  return (
    <>
      <i className="fa-solid fa-right-from-bracket out-icon" onClick={() => {
        setModalFlag(true)
        document.body.classList.add('no-scroll');
      }}></i>
      {
        modalFlag && <Modal title='Log out' text='Are you sure you want to log out?' method={logout} setModalFlag={setModalFlag} />
      }
      {
        isLoading
          ?
          <header className='money-container d-flex align-items-center justify-content-center'>
            <div className="spinner-border text-primary spin align-self-center" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </header>
          :
          <header className='money-container d-flex align-items-center justify-content-center'>
            <h2 className='text-center text-white money-digits'>${onDisplayMoney}.00</h2>
          </header>
      }

      <main className='options'>
        <button className='add-money-button' onClick={addMoneySection}>Add money</button>
        {
          addMoneyFlag
          &&
          <Form btn='primary' submit={addMoney} change={onInputChange} operation='add' />
        }

        <button className='add-money-button' onClick={subtractMoneySection}>Subtract money</button>
        {
          subtractMoneyFlag
          &&
          <Form btn='danger' submit={addMoney} change={onInputChange} operation='subtract' />
        }
      </main>
      <section className='table-responsive table-container mt-5 h-75'>
        <History history={history} />
      </section>
    </>
  )
}

export default index
