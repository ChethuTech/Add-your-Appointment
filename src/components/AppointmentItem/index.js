import {format} from 'date-fns'
import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, onClickStarBtn} = props

  const {id, title, date, isStared} = appointmentDetails
  const formatedDate = format(date, 'dd MMMM yyyy, EEEE')
  const starTheBtn = () => {
    onClickStarBtn(id)
  }

  return (
    <li className="list-card">
      <div className="title-btn-container">
        <p className="title">{title}</p>
        <button
          type="button"
          onClick={starTheBtn}
          className="star-btn"
        >
          {' '}
          <img
            src={
              isStared
                ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
                : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
            }
            alt="star"
          />
        </button>
      </div>
      <p className="date"> Date: {formatedDate}</p>
    </li>
  )
}

export default AppointmentItem
