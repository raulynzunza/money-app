import { useEffect, useState } from 'react'
import './menu.css'
import { useNavigate } from 'react-router-dom'
import 'animate.css';
import { postMoney, getMoney, updateMoney } from '../../api/rest'

const index = () => {

  const [addMoneyFlag, setAddMoneyFlag] = useState(false)
  const [subtractMoneyFlag, setSubtractMoneyFlag] = useState(false)
  const [money, setMoney] = useState()
  const [onDisplayMoney, setOnDisplayMoney] = useState()
  const [id, setId] = useState()
  const [isLoading, setLoading] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/')
    }

    chargeMoney()

  }, [])

  const chargeMoney = async () => {
    setLoading(true);
    const money = await getMoney(localStorage.getItem('token'));
    setLoading(false);
    // @ts-ignore
    setId(money.docs[0].id)
    setOnDisplayMoney(money.docs[0].data().money)
  }

  const onInputChange = ({ target }: any) => {
    const { value } = target
    setMoney(value)
  }

  const addMoneySection = () => {
    addMoneyFlag ? setAddMoneyFlag(false) : setAddMoneyFlag(true)
  }

  const subtractMoneySection = () => {
    subtractMoneyFlag ? setSubtractMoneyFlag(false) : setSubtractMoneyFlag(true)
  }

  const refreshMoney = async (event: any, operation: any) => {
    event.preventDefault();
    // await postMoney(money, localStorage.getItem('token'))
    await updateMoney(id, money, onDisplayMoney, localStorage.getItem('token'), operation);
    await chargeMoney();
  }

  const logout = () => {
    localStorage.removeItem('token')
    navigate('/')
  }

  return (
    <>
      <i className="fa-solid fa-right-from-bracket out-icon" onClick={logout}></i>
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
          <form className='add-form d-block animate__animated animate__fadeIn' onSubmit={(e) => refreshMoney(e, 'add')}>
            <input type="number" className='money-input form-control' name='addMoney' onChange={onInputChange} placeholder='e.g. 150' />
            <button className='w-100 btn btn-primary mt-2'>Add</button>
          </form>
        }

        <button className='add-money-button' onClick={subtractMoneySection}>Subtract money</button>
        {
          subtractMoneyFlag
          &&
          <form className='add-form d-block animate__animated animate__fadeIn' onSubmit={(e) => refreshMoney(e, 'subtract')}>
            <input type="number" className='money-input form-control' name='addMoney' onChange={onInputChange} placeholder='e.g. 150' />
            <button className='w-100 btn btn-danger mt-2'>Substract</button>
          </form>
        }
      </main>

    </>
  )
}

export default index
