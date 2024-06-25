import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {
    appointmentsList: [
      /*  {
        id: 1,
        title: 'Lecturer',
        date: new Date(),
        isStared: false,
      },
      {
        id: 111,
        title: 'Lecturer',
        date: new Date(),
        isStared: false,
      },
      {
        id: 11,
        title: 'Lecturer',
        date: new Date(),
        isStared: false,
      },
      {
        id: 4,
        title: 'Lecturer',
        date: new Date(),
        isStared: false,
      },  */
    ],
    isStarFilterSelected: false,
    title: '',
    date: '',
  }

  onTitleChange = event => {
    this.setState({title: event.target.value})
  }

  onDateChange = event => {
    this.setState({date: event.target.value})
  }

  onAdd = event => {
    event.preventDefault()
    const {title, date} = this.state
    if (title.trim().length > 0 && date.trim().length > 0) {
      const newAppointment = {
        id: uuidv4(),
        title,
        date: new Date(date),
        isStared: false,
      }

      this.setState(prevState => ({
        appointmentsList: [...prevState.appointmentsList, newAppointment],
        title: '',
        date: '',
      }))
    }
  }

  onClickStarBtn = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachAppointment =>
        eachAppointment.id === id
          ? {...eachAppointment, isStared: !eachAppointment.isStared}
          : eachAppointment,
      ),
    }))
  }

  starFilter = () => {
    this.setState(prevState => ({
      isStarFilterSelected: !prevState.isStarFilterSelected,
    }))
  }

  render() {
    const {title, date} = this.state
    const {appointmentsList, isStarFilterSelected} = this.state
    const staredAndUnstaredAppointmentList = isStarFilterSelected
      ? appointmentsList.filter(eachAppointment => eachAppointment.isStared)
      : appointmentsList
    const d = new Date().toLocaleDateString()
    console.log(d)
    return (
      <div className="bg-container">
        <div className="appointment-container">
          <div className="add-appointment-form-card">
            <form onSubmit={this.onAdd}>
              <h1 className="add-appointment-heading">Add Appointment</h1>
              <label className="title-label">
                TITLE
                <input
                  value={title}
                  onChange={this.onTitleChange}
                  type="text"
                  placeholder="Title"
                  required
                />
              </label>

              <label>
                DATE
                <input
                  min={new Date().toJSON().slice(0, 10)}
                  value={date}
                  onChange={this.onDateChange}
                  type="date"
                />
              </label>

              <button className="add-btn" type="submit">
                {' '}
                Add{' '}
              </button>
            </form>

            <img
              className="appointments-img"
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
            />
          </div>

          <hr />

          <div className="appointment-and-star-btn-container">
            <h1 className="stared-appointments-heading">Appointments</h1>
            <button
              onClick={this.starFilter}
              type="button"
              className={`unselected-star-filter-btn  ${
                isStarFilterSelected && 'selected-star-filter-btn'
              }`}
            >
              Starred
            </button>
          </div>

          <ul className="appointments-list">
            {staredAndUnstaredAppointmentList.map(eachAppointment => (
              <AppointmentItem
                onClickStarBtn={this.onClickStarBtn}
                appointmentDetails={eachAppointment}
                key={eachAppointment.id}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
