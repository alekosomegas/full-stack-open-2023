const Notification = ({ text, error }) => {
    if (!text) return
    return (
        <div className={`message ${error && "error"}`}>
            {text}
        </div>
    )
}

export default Notification