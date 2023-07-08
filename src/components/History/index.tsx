
const index: React.FC<any> = ({ history }) => {


    return (
        <table className="table w-100 h-100 my-0 mx-auto table-secondary text-center table-striped table-hover caption-top">
            <caption>History</caption>
            <thead className="bg-dark text-light bg-gradient">
                <tr>
                    <th scope="col">Amount</th>
                    <th scope="col">Description</th>
                    <th scope="col">Date</th>
                </tr>
            </thead>
            <tbody className="table-group-divider">
                {
                    history.map((item: any, index: number) =>
                    (
                        <tr key={index} className={`p-5 ${item.action === 'add' ? 'table-success' : 'table-danger'}`}>
                            <td>{item.action === 'add' ? '+' : '-'}${item.amount}</td>
                            <td>{item.description}</td>
                            <td>{item.createdAt}</td>
                        </tr>
                    )
                    )
                }
            </tbody>
        </table>
    )
}

export default index
