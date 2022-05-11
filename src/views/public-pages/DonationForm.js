import './public-pages.scss'
import '@styles/react/libs/input-number/input-number.scss'

import React, {
  useEffect,
  useState
} from 'react'

import axios from 'axios'
import {
  Mail,
  User,
  Search,
  Lock,
  X
} from 'react-feather'
import {
  Button,
  Container,
  Input,
  InputGroup,
  InputGroupText,
  Label
} from 'reactstrap'

import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import defaultAvatar from '@src/assets/images/logo/fys-avatar-blank.png'
import CheckoutForm from './CheckoutForm'
import Footer from './Footer'
import NavBar from './NavBar'
import { useParams, useNavigate } from 'react-router-dom'
import Avatar from "@components/avatar"
import toast from 'react-hot-toast'
import { useForm, Controller } from "react-hook-form"


const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_TEST_PUBLIC_KEY)
const DonationForm = () => {
  const [isContinue, setIsContinue] = useState(false)
  const [customDonation, setCustomDonation] = useState(false)
  const [donationAmount, setDonationAmount] = useState(10)
  const [transactionFee, setTransactionFee] = useState(false)
  // const [donationCheckbox, setDonationCheckbox] = useState(false)
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
    showAnnonymous: false

  })
  const { control, handleSubmit, formState: { errors } } = useForm()
  

  const ToastError = ({ t }) => {
    return (
      <div className='d-flex'>
        <div className='me-1'>
          <Avatar size='sm' color='danger' icon={<Lock size={12} />} />
        </div>
        <div className='d-flex flex-column'>
          <div className='d-flex justify-content-between'>
            <h6></h6>
            <X size={12} className='cursor-pointer' onClick={() => toast.dismiss(t?.id)} />
          </div>
          <span>Your submission failed. Please check your form fields and try again.</span>
        </div>
      </div>
    )
  }

  // eslint-disable-next-line no-unused-vars
  const { fundraiser_slug, campaign_slug, team_slug } = useParams()
  const navigate = useNavigate()

  const campaign_slug_query = new URLSearchParams(window.location.search).get(
    "campaign_slug"
  )
  const organization_slug_query = new URLSearchParams(window.location.search).get(
    "organization_slug"
  )

  const [campaign, setCampaign] = useState()
  const [fundraiser, setFundraiser] = useState()
  const [organization, setOrganization] = useState()


  async function getCampaign() {
    const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/campaign/${campaign_slug || campaign_slug_query}`)
    if (res.data.hasError) {
      navigate('/misc/error')
    } else {
      setCampaign(res.data.data)
    }

  }
  async function getFundraiser() {
    const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/fundraiser/donate?url_slug=${fundraiser_slug}&ip_address=127.0.0.1`)
    if (res.data.hasError) {
      navigate('/misc/error')
    } else {
      setFundraiser(res.data.data)
    }
  }
  async function getOrganization() {
    const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/teams/${team_slug}/campaign/${campaign_slug || campaign_slug_query}`)
    if (res.data.hasError) {
      if ((!team_slug || team_slug === 'undefined') && (campaign_slug || campaign_slug_query)) {
        navigate(`/campaigns/${campaign_slug || campaign_slug_query}`)
      } else {
        navigate(`/misc/error`)
      }
    } else {
      setOrganization(res.data.data)
    }
  }
  useEffect(() => {
    if (campaign_slug) {
      getCampaign()
    }
  }, [campaign_slug])
  useEffect(() => {
    if (fundraiser_slug) {
      getFundraiser()
    }
  }, [fundraiser_slug])
  useEffect(() => {
    if (team_slug) {
      getOrganization()
    }
  }, [team_slug])

  const [clientSecret, setClientSecret] = useState("")
  //donation
  const [donation, setDonation] = useState("")

  useEffect(() => {

    if (clientSecret) {
      setIsContinue(!isContinue)
    }

  }, [clientSecret])

  const updateClientSecret = (value) => {
    setClientSecret(value)
  }
  function paymentIntent() {
    axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/stripe/pi`, {
      cardAmount: donationAmount * 100,
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      email: formValues.email,
      message: formValues.message,
      user: '',
      coverFees: (transactionFee) ? 1 : 0,
      showAnnonymous: (formValues.showAnnonymous) ? 1 : 0,
      campaign: campaign_slug || campaign_slug_query,
      organization: team_slug || organization_slug_query,
      fundraiser: fundraiser_slug
    })
      .then((data) => {
        console.log("success....success")
        setClientSecret(data.data.data.paymentIntent.client_secret)
        setDonation(data.data.data.donation)
      })
      .catch(error => {
        console.log("error....error")
        console.log(error)
        toast(t => (
          <ToastError t={t} />
        ))
      })
  }
  const onSubmit = data => {
    formValues.firstName = data.firstName
    formValues.lastName = data.lastName
    formValues.email = data.email
    formValues.message = data.message
    formValues.showAnnonymous = data.showAnnonymous

    paymentIntent()
  }
  const appearance = {
    theme: 'stripe'
  }

  const changeDonationAmount = (e) => {
    const ammount = parseInt(e.target.innerHTML.split('$')[1])
    setDonationAmount(ammount)
    setCustomDonation(false)
  }

  const addCustomDonationAmount = (e) => {
    const ammount = e.target.value
    setDonationAmount(ammount)
  }

  const ChangeFormValues = (e) => {
    const key = e.target.name
    const val = e.target.value
    setFormValues(preVal => {
      return {
        ...preVal,
        [key]: val
      }
    })
  }

  const options = {
    clientSecret,
    appearance
  }
  const PaymentMethod = ({ type, text, checked, idx }) => {
    return (
      <div className='col-md-4 paymentMethod' style={{ padding: "0rem 2rem" }}>
        <div className='row' style={{ background: "rgb(240, 240, 240)", padding: "1rem 0.5rem 1rem 0.5rem", borderRadius: "8px", height: "100%" }}>
          <div className='form-check myFlex'>
            <Label className='form-check-label myLeft' for={`paymentMethodRadio${idx}`} style={{ height: "100%" }}>
              <div className='row' style={{ height: "100%" }}>
                <div className='col-md-4 myFlex' htmlFor='paymentMethodRadio'>
                  <img src={require(`@src/assets/images/public_pages/${type}.png`).default} className='myCenter'></img>
                </div>
                <div className='col-md-8 myFlex' htmlFor='paymentMethodRadio'>
                  <h3 className='myLeft' style={{ fontWeight: "bold", color: "black" }}>{text}</h3>
                </div>
              </div>
            </Label>
            <Input type='radio' name='paymentMethodRadio' id={`paymentMethodRadio${idx}`} className="myRight" defaultChecked={checked} />
          </div>
        </div>
      </div>
    )
  }

  function formatNumber(formatValue) {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(formatValue)
    }

  return (
    <div>
      <NavBar></NavBar>
      <div id='donationform'>
        <div className='myComponent' style={{ background: "#f0f0f0" }}>
          {(team_slug && organization) && (
            <Container fluid="md" className='container'>
              <div className='row'>
                <div className='col-md-3 myFlex'>
                  <img src={organization?.organization?.logo || defaultAvatar} style={{ height: "250px", width: "300px", objectFit: "cover" }} className='myCenter'></img>
                </div>
                <div className='col-md-9 myFlex'>
                  <div className='myLeft' style={{ marginLeft: "2rem" }}>
                    <div className='myFlex' style={{ paddingBottom: "2rem" }}>
                      <p className="myLeft" style={{ fontSize: "2.5rem", fontWeight: "bold", color: "black" }}>{organization?.organization?.name}</p>
                    </div>
                    <div className='myFlex' style={{ paddingBottom: "2.5rem" }}>
                      <h5 className="myLeft" style={{ fontWeight: "bold", color: "black" }}>
                        {campaign?.title}</h5>
                    </div>
                    <div className='myFlex' style={{ paddingBottom: "2rem" }}>
                      <h3 className="myLeft" style={{ fontWeight: "bold", color: "blue" }}>
                        {/* ${team?.campaign?.fundRaisingGoal} */}
                        {formatNumber(organization?.currentDonations.toFixed(0))} raised towards my goal of {formatNumber(organization?.fundRaisingGoal.toFixed(0))}
                        {/* Raised for */}
                      </h3>
                    </div>
                    <div className='myFlex' style={{ paddingBottom: "0rem" }}>
                      <h5 className="myLeft" style={{ fontWeight: "bold", color: "black" }}>{campaign?.shortDescription}</h5>
                    </div>
                  </div>
                </div>
              </div>
            </Container>
          )}
          {(campaign_slug && campaign) && (<Container fluid="md" className='container'>
            <div className='row'>
              <div className='col-md-3 myFlex'>
                <img src={campaign?.logoImage} className='myCenter' style={{ maxWidth: "100%" }}></img>
              </div>
              <div className='col-md-9 myFlex'>
                <div className='myLeft' style={{ marginLeft: "2rem" }}>
                  <div className='myFlex' style={{ paddingBottom: "2rem" }}>
                    <p className="myLeft" style={{ fontSize: "2.5rem", lineHeight: "2.5rem", fontWeight: "bold", color: "black" }}>
                      {campaign?.title}
                    </p>
                  </div>
                  <div className='myFlex' style={{ paddingBottom: "2.5rem" }}>
                    <h5 className="myLeft" style={{ fontWeight: "bold", color: "black" }}>
                      {campaign?.organization?.name}</h5>
                  </div>
                  <div className='myFlex' style={{ paddingBottom: "0rem" }}>
                    <h5 className="myLeft" style={{ fontWeight: "bold", color: "black", lineHeight: "1.5rem" }}>
                      {campaign?.shortDescription}</h5>
                  </div>
                </div>
              </div>
            </div>
          </Container>)}
          {(fundraiser_slug && fundraiser) && (<Container fluid="md" className='container'>
            <div className='row'>
              <div className='col-md-3 myFlex'>
                <img src={fundraiser?.avatar} style={{ height: "250px", width: "300px", objectFit: "cover" }} className='myCenter'></img>
              </div>
              <div className='col-md-9 myFlex'>
                <div className='myLeft' style={{ marginLeft: "2rem" }}>
                  <div className='myFlex' style={{ paddingBottom: "2rem" }}>
                    <p className="myLeft" style={{ fontSize: "2.5rem", fontWeight: "bold", color: "black" }}>{fundraiser?.firstName} {fundraiser?.lastName}</p>
                  </div>
                  <div className='myFlex' style={{ paddingBottom: "2.5rem" }}>
                    <h5 className="myLeft" style={{ fontWeight: "bold", color: "black" }}>{fundraiser?.organization?.name}</h5>
                  </div>
                  <div className='myFlex' style={{ paddingBottom: "2rem" }}>
                    <h3 className="myLeft" style={{ fontWeight: "bold", color: "blue" }}>
                      {/* ${fundraiser?.campaign?.fundRaisingGoal} */}
                      {formatNumber(fundraiser?.donationTotals?.currentDonations.toFixed(0))} raised towards my goal of ${fundraiser?.donationTotals?.fundRaisingGoal}
                      {/* Raised for */}
                    </h3>
                  </div>
                  <div className='myFlex' style={{ paddingBottom: "0rem" }}>
                    <h5 className="myLeft" style={{ fontWeight: "bold", color: "black" }}>{fundraiser?.campaign?.shortDescription}</h5>
                  </div>
                </div>
              </div>
            </div>
          </Container>)}

        </div>
        <div className='myComponent' style={{ background: "white" }}>

          {!isContinue && (<Container fluid="md" className='container'>
            <div className="myFlex" style={{ paddingBottom: "3rem" }}>
              <h1 className='myCenter' style={{ color: "black", fontWeight: "bold" }}>Choose Your Donation Amount</h1>
            </div>
            <div className='row' style={{ paddingBottom: "2rem" }}>
              <div className='col-md-1'></div>
              <div className='col-md-4' style={{ padding: "1rem" }}>
                <Input type='text' id='readonlyInput' readOnly={!customDonation} value={`${donationAmount}`} style={{ textAlign: "center", marginBottom: "2rem", height: "4rem", fontSize: "1.5rem" }} onChange={addCustomDonationAmount} />
              </div>
              <div className='col-md-6'>
                <div className='row'>
                  <div className="col-4 myFlex" style={{ padding: ".5rem" }}>
                    <Button.Ripple color='primary' className="myCenter donation_btn " onClick={changeDonationAmount}>$10</Button.Ripple>
                  </div>
                  <div className="col-4 myFlex" style={{ padding: ".5rem" }}>
                    <Button.Ripple color='primary' className="myCenter donation_btn" onClick={changeDonationAmount}>$20</Button.Ripple>
                  </div>
                  <div className="col-4 myFlex" style={{ padding: ".5rem" }}>
                    <Button.Ripple color='primary' className="myCenter donation_btn" onClick={changeDonationAmount}>$50</Button.Ripple>
                  </div>
                </div>
                <div className='row'>
                  <div className="col-4 myFlex" style={{ padding: ".5rem" }}>
                    <Button.Ripple color='primary' className="myCenter donation_btn" onClick={changeDonationAmount}>$75</Button.Ripple>
                  </div>
                  <div className="col-4 myFlex" style={{ padding: ".5rem" }}>
                    <Button.Ripple color='primary' className="myCenter donation_btn" onClick={changeDonationAmount}>$100</Button.Ripple>
                  </div>
                  <div className="col-4 myFlex" style={{ padding: ".5rem" }}>
                    <Button.Ripple color='primary' className="myCenter donation_btn" onClick={() => { setCustomDonation(true) }}>CUSTOM</Button.Ripple>
                  </div>
                </div>
              </div>
              <div className='col-md-1'></div>
            </div>
            <div className='row' style={{ paddingBottom: "3rem" }}>
              <div className='col-md-2'></div>
              <div className="col-md-8" style={{ textAlign: "center" }}>
                <div className='form-check form-check-primary'>
                  <Input type='checkbox' id='checkbox' checked={transactionFee} style={{ border: "1px solid #000000" }} onChange={() => { setTransactionFee(!transactionFee) }} />
                  <Label className='form-check-label label' for='checkbox' >
                    I'd like to make my donation go further and cover the transaction fees associated with this donation. <br /><span style={{ fontWeight: "normal", fontSize: ".9rem" }}>(2.9% + $0.30 per transaction as charged by our credit card processor)</span>
                  </Label>
                </div>
              </div>
              <div className='col-md-2'></div>
            </div>
            <div style={{ borderBottom: "solid 1px rgb(200, 200, 200)", marginBottom: "4rem" }}></div>
            <div className="myFlex" style={{ paddingBottom: "2rem" }}>
              <h1 className='myCenter' style={{ color: "black", fontWeight: "bold" }}>Donor Information</h1>
            </div>
            

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='row' style={{ paddingBottom: "2rem" }}>
                <div className='col-md-2'></div>
                <div className='col-md-4'>
                  <Label className='form-label label' for='firstname'>
                    First name
                  </Label>
                  <InputGroup className='input-group-merge mb-2'>
                    <InputGroupText>
                      <User size={14} />
                    </InputGroupText>
                    <Controller
                      name='firstName'
                      rules={{ required: true }}
                      control={control}
                      render={({ field }) => (
                        <Input id='firstName' placeholder='First name' invalid={errors.firstName && true} {...field} />
                      )}
                    />

                  </InputGroup>
                  {errors.firstName && <span className='text-danger'>First name is required</span>}
                </div>
                <div className='col-md-4'>
                  <Label className='form-label label' for='lastname'>
                    Last name
                  </Label>
                  <InputGroup className='input-group-merge mb-2'>
                    <InputGroupText>
                      <User size={14} />
                    </InputGroupText>
                    <Controller
                      name='lastName'
                      rules={{ required: true }}
                      control={control}
                      render={({ field }) => (
                        <Input id='lastName' placeholder='Last name' invalid={errors.lastName && true} {...field} />
                      )}
                    />
                    {/* <Input type='text' id='lastname' placeholder='Last name'  {...register("lastName", { required: true })} /> */}
                  </InputGroup>
                  {errors.lastName && <span className='text-danger'>Last name is required</span>}
                </div>
                <div className='col-md-2'></div>
              </div>
              <div className='row' style={{ paddingBottom: "2rem" }}>
                <div className='col-md-2'></div>
                <div className='col-md-8'>
                  <Label className='form-label label' for='email'>
                    Email
                  </Label>
                  <InputGroup className='input-group-merge mb-2'>
                    <InputGroupText>
                      <Mail size={14} />
                    </InputGroupText>
                    {/* <Input type='email' id='email' placeholder='Enter your email' name="email" value={formValues.email} onChange={ChangeFormValues} /> */}
                    {/* <Input type='email' id='email' placeholder='Enter your email' {...register("email", { required: true })} /> */}
                    <Controller
                      name='email'
                      error={errors.email?.message}
                      rules={{ required: 'Email is required',
                        pattern: {
                          value: /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                          message: 'Please enter a valid Email'
                        } }}
                      control={control}
                      render={({ field }) => (
                        <Input id='email' placeholder='Enter your email' invalid={errors.email && true} {...field} />
                      )}
                    />
                  </InputGroup>
                  {errors.email && <span className='text-danger'>{errors.email?.message}</span>}
                </div>
                <div className='col-md-2'></div>
              </div>
              <div className='row' style={{ paddingBottom: "2rem" }}>
                <div className='col-md-2'></div>
                <div className='col-md-8'>
                  <Label className='form-label label' for='message'>
                    Please enter a private message (optional) that will be delivered to this fundraiser.
                  </Label>
                  <InputGroup className='input-group-merge mb-2'>
                    <InputGroupText style={{}}>
                      <Mail size={14} />
                    </InputGroupText>
                    {/* <Input type='textarea' id='message' rows='3' placeholder='Enter your message' name="message" value={formValues.message} onChange={ChangeFormValues} /> */}
                    {/* <Input type='textarea' id='message' rows='3' placeholder='Enter your message' {...register("message", {})} /> */}
                    <Controller
                      name='message'
                      control={control}
                      render={({ field }) => (
                        <Input  type='textarea' id='message' rows='3' placeholder='Enter your message' {...field} />
                      )}
                    />
                  </InputGroup>

                </div>
                <div className='col-md-2'></div>
              </div>

              <div className='row' style={{ paddingBottom: "2rem" }}>
                <div className='col-md-2'></div>
                <div className='col-md-8'>
                  <div className='form-check form-check-primary'>
                    <Controller
                      name='showAnnonymous'
                      control={control}
                      render={({ field }) => (
                        <Input  type='checkbox' id='showAnnonymous' {...field} />
                      )}
                    />
                    <Label className='form-check-label label' for='checkbox1'>
                      Make this an anonymous donation
                    </Label>
                  </div>
                </div>
                <div className='col-md-2'></div>
              </div>
              <div className='row' style={{ paddingBottom: "1rem" }}>
              <div className='col-md-12 myFlex'>
                {/* <a onClick={setActiveTab} className="myCenter donate_btn" href="thankyou">Continue to Payment Information</a> */}
                <input  className="myCenter donate_btn" type="submit" value = "Continue to Payment Information" />

              </div>
            </div>
            </form>


          </Container>)}
          {isContinue && (<Container fluid="md" className='container'>
            <div className="myFlex" style={{ paddingBottom: "3rem" }}>
              <h1 className='myCenter' style={{ color: "black", fontWeight: "bold" }}>Payments Method</h1>
            </div>
            {(
              <Elements options={options} stripe={stripePromise}>
                <CheckoutForm formData={formValues} donation={donation} donationAmount={donationAmount} updateClientSecret={updateClientSecret} />
              </Elements>
            )}
            <div className='row' style={{ paddingBottom: "0rem" }}>
              <div className='col-md-2 myFlex'>
                {/* <a className="myLeft donate_btn" href="thankyou">Donate Now</a> */}
              </div>
            </div>
          </Container>)}

        </div>
      </div>
      <Footer></Footer>
    </div>
  )
}

export default DonationForm