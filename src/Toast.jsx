import React from 'react'

const Toast = ({alert}) => {
    return (
        alert && <div className={`toast position-absolute end-0 ${alert.type}`} role="alert" aria-live="assertive" aria-atomic="true">
            <div className="toast-header">
                <strong className="me-auto">Bootstrap</strong>
                <small>11 mins ago</small>
                <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close" />
            </div>
            <div className="toast-body">
                {alert.msg}
            </div>
        </div>
    )
}

export default Toast
