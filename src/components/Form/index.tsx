import React from "react"

interface IProps {
    btn: string
    submit: (event: any, operation: any) => Promise<void>
    change: (event: any) => void
    operation: string
}

const index: React.FC<IProps> = ({ btn, submit, change, operation }) => {
    return (
        <div>
            <form className='add-form d-block animate__animated animate__fadeIn' onSubmit={(e) => submit(e, operation)}>
                <input type="number" className='money-input form-control' name='addMoney' onChange={change} placeholder='e.g. 150' />
                <textarea className="form-control mt-2" name="addNote" onChange={change} placeholder="Add a description"></textarea>
                <button className={`w-100 btn btn-${btn} mt-2`}>{operation}</button>
            </form>
        </div>
    )
}

export default index
