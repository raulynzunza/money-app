

const index = (prop: any) => {
    return (
        <div className={`${prop.alert}`} role="alert">
            {prop.message}
        </div>
    )
}

export default index
