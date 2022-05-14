import {
  useEffect,
  useState
} from 'react'

// ** Third Party Components
import {
  CheckSquare,
  CreditCard,
  HelpCircle,
  Mail,
  MessageSquare,
  Power,
  Settings,
  User,
  ChevronRight
} from 'react-feather'
// ** Store & Actions
import { useDispatch } from 'react-redux'
import { useForm, Controller } from 'react-hook-form'
// ** React Imports
import { Link } from 'react-router-dom'
import Select from 'react-select'
import classnames from 'classnames'

// ** Reactstrap Imports
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown, 
  Button,
  Label,
  Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap'

// ** Custom Components
import Avatar from '@components/avatar'
// ** Default Avatar Image
import defaultAvatar from '@src/assets/images/avatars/avatar-blank.png'
import { handleLogout } from '@store/authentication'
// ** Utils
import { isUserLoggedIn } from '@utils'

const UserDropdown = () => {
  // ** Store Vars
  const dispatch = useDispatch()

    // ** Hook
    const {
      control,
      formState: {  }
    } = useForm({
  
    })

  // ** State
  const [userData, setUserData] = useState(null)
  const [orgOptions, setOrgOptions] = useState([])

  const getOrganizationOptions = () => {
    let orgList = []
    userData?.organizations.map(item => {
      const option = { id: item.id, label: `${item.name}` }
      console.log(option)
      orgList = [...orgList, option]
    })

    setOrgOptions(orgList)
  }

  //** ComponentDidMount
  useEffect(() => {
    if (isUserLoggedIn() !== null) {
      setUserData(JSON.parse(localStorage.getItem('userData')))
    }
    getOrganizationOptions()
  }, [])

  const [modal, setModal] = useState(null)

  const toggleModal = id => {
    if (modal !== id) {
      setModal(id)
    } else {
      setModal(null)
    }
  }

  //** Vars
  const userAvatar = (userData && userData.avatar) || defaultAvatar
  const upOrgs = (userData && userData.organizations.length) || 0
  const upFund = (userData && userData.fundraiser_profile.length) || 0
  const upDonor = (userData && userData.donor_profile.length) || 0
  const userProfiles = upOrgs + upFund + upDonor

  console.log(userData)

  const [userProfileType, setUserProfileType] = useState('userProfileApp')
  const handleContinue = () => {

    if (userProfileType === "fundraiser") {
      userData.role = "Fundraiser"
      localStorage.setItem('userData', JSON.stringify(userData))
    }

    toggleModal('user-profiles')
  }

  const setFundraiser = () => {
    setUserProfileType('fundraiser')
  }

  return (
    <div>
    <UncontrolledDropdown tag='li' className='dropdown-user nav-item'>
      <DropdownToggle href='/' tag='a' className='nav-link dropdown-user-link' onClick={e => e.preventDefault()}>
        <div className='user-nav d-sm-flex d-none'>
          <span className='user-name fw-bold'>{(userData && userData['firstName']) || 'John Doe'}</span>
          <span className='user-status'>{(userData && userData.role) || 'Admin'}</span>
        </div>
        <Avatar img={userAvatar} imgHeight='40' imgWidth='40' status='online' />
      </DropdownToggle>
      <DropdownMenu end>
        <DropdownItem onClick={() => toggleModal('user-profiles')} hidden={(userProfiles <= 1)}>
          <Settings size={14} className='me-75' />
          <span className='align-middle'>Switch Profile</span>
        </DropdownItem>
        <DropdownItem tag={Link} to='/pages/faq' >
          <HelpCircle size={14} className='me-75' />
          <span className='align-middle'>FAQ</span>
        </DropdownItem>
        <DropdownItem tag={Link} to='/login' onClick={() => dispatch(handleLogout())}>
          <Power size={14} className='me-75' />
          <span className='align-middle'>Logout</span>
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
      <Modal
          isOpen={modal === 'user-profiles'}
          toggle={() => toggleModal('user-profiles')}
          className={'modal-dialog-centered modal-lg'}
          key='user-profiles'
        >
          <ModalHeader toggle={() => toggleModal('user-profiles')}>
            
          </ModalHeader>
          <ModalBody>
            <h1 className='text-center mb-1'>Select User Profile</h1>
            <p className='text-center mb-3'>
              please choose a user profile
              <br />
              in order to have a more customized experience
            </p>
            <div className='custom-options-checkable'>
              <input
                type='radio'
                id='organization'
                name='userProfileType'
                checked={userProfileType === 'organization'}
                className='custom-option-item-check'
                onChange={() => setUserProfileType('organization')}
              />
              {
              (upOrgs > 0) ? <>
              <label
                htmlFor='organization'
                className='custom-option-item d-flex align-items-center flex-column flex-sm-row px-3 py-2 mb-2'
              >
                <span>
                  <MessageSquare className='font-large-2 me-sm-2 mb-2 mb-sm-0' />
                </span>
                <span>
                  <span className='custom-option-item-title d-block h3'>Organization</span>
                  <span className='mt-75'>Manage the data for an organization you have administrative rights to.</span>
                  
                  <Controller
                    control={control}
                    name='organizationId'
                    id='organizationId'
                    render={({ field }) => (
                      <Select
                        isClearable={false}
                        classNamePrefix="select"
                        options={orgOptions}
                        className={classnames('react-select')}
                        {...field}
                      />
                    )}
                  />
                </span>
              </label>
              </> : null
            }
              <input
                type='radio'
                id='fundraiser'
                name='userProfileType'
                checked={userProfileType === 'fundraiser'}
                className='custom-option-item-check'
                onChange={() => setFundraiser()}
              />
              {
                (upFund > 0) ? <>
              <label hidden={(upFund < 1)}
                htmlFor='fundraiser'
                className='custom-option-item d-flex align-items-center flex-column flex-sm-row px-3 py-2 mb-2'
              >
                <span>
                  <Settings className='font-large-2 me-sm-2 mb-2 mb-sm-0' />
                </span>
                <span>
                  <span className='custom-option-item-title d-block h3'>Fundraiser</span>
                  <span className='mt-75'>
                    Choose this profile to view your personal fundraising activities.
                  </span>
                </span>
              </label>
              </> : null
            }
              <input
                type='radio'
                id='donor'
                name='userProfileType'
                checked={userProfileType === 'donor'}
                className='custom-option-item-check'
                onChange={() => setUserProfileType('donor')}
              />
              {
              (upDonor > 0) ? <>
              <label 
                htmlFor='donor'
                className='custom-option-item d-flex align-items-center flex-column flex-sm-row px-3 py-2 mb-2'
              >
                <span>
                  <MessageSquare className='font-large-2 me-sm-2 mb-2 mb-sm-0' />
                </span>
                <span>
                  <span className='custom-option-item-title d-block h3'>Donor</span>
                  <span className='mt-75'>Choose this profile to manage the donations you have made within FYS.</span>
                </span>
              </label>
              </> : null
            }
            </div>
            
          </ModalBody>
          <ModalFooter>
          <Button color='primary' className='float-end' onClick={handleContinue}>
              <span className='me-50'>Continue</span>
              <ChevronRight className='rotate-rtl' size={14} />
            </Button>
          </ModalFooter>
        </Modal>
        </div>
    
  )
}

export default UserDropdown
