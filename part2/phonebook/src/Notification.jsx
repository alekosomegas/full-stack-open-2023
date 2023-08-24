const Notification = ({ text }) => {
    if (!text) return
    return (
        <div className="message">
            {text}
        </div>
    )
}

export default Notification