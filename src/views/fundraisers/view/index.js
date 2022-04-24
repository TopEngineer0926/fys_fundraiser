// ** React Imports
import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

// ** Store & Actions
import { getFundraiser } from '../store'
import { useSelector, useDispatch } from 'react-redux'

// ** Reactstrap Imports
import { Row, Col, Alert } from 'reactstrap'

// ** User View Components
import UserTabs from './Tabs'
import UserInfoCard from './UserInfoCard'

// ** Styles
import '@styles/react/apps/app-users.scss'

const FundraiserView = () => {
  // ** Store Vars
  const store = useSelector(state => state.fundraisers)
  const dispatch = useDispatch()

  // ** Hooks
  const { id } = useParams()

  // ** Get suer on mount
  useEffect(() => {
    dispatch(getFundraiser(id))
  }, [dispatch])
  useEffect(() => {
    if (!store.selectedUser) {
      dispatch(getFundraiser(id))
    }
   
  }, [store.selectedUser])

  const [active, setActive] = useState('1')

  const toggleTab = tab => {
    if (active !== tab) {
      setActive(tab)
    }
  }

  return store.selectedUser !== null && store.selectedUser !== undefined ? (
    <div className='app-user-view'>
      <Row>
        <Col xl='4' lg='5' xs={{ order: 1 }} md={{ order: 0, size: 5 }}>
          <UserInfoCard selectedUser={store.selectedUser} />
        </Col>
        <Col xl='8' lg='7' xs={{ order: 0 }} md={{ order: 1, size: 7 }}>
          <UserTabs fundraiser={store.selectedUser} active={active} toggleTab={toggleTab} />
        </Col>
      </Row>
    </div>
  ) : (
    <Alert color='danger'>
      <h4 className='alert-heading'>Fundraiser not found</h4>
      <div className='alert-body'>
        Fundraiser with id: {id} doesn't exist. Check list of all Fundraisers: <Link to='/fundraisers/list'>Fundraisers List</Link>
      </div>
    </Alert>
  )
}
export default FundraiserView
